import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { AuditService } from '../audit/audit.service';
import { UserRole, UserStatus } from '../generated/prisma';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async createUser(
    data: {
      fullName: string;
      email?: string;
      phone?: string;
      password: string;
      role: UserRole;
      status?: UserStatus;
      cyberCenterId?: string;
      admissionNo?: string;
      studentBalance?: number;
      discountRate?: number | null;
    },
    actorId: string,
  ) {
    if (data.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    if (data.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: data.phone },
      });
      if (existingPhone) {
        throw new ConflictException('Phone already exists');
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        passwordHash,
        role: data.role,
        status: data.status ?? UserStatus.ACTIVE,
        cyberCenterId: data.cyberCenterId,
        studentProfile:
          data.role === UserRole.STUDENT
            ? {
                create: {
                  admissionNo: data.admissionNo,
                  balance: data.studentBalance ?? 0,
                  discountRate: data.discountRate ?? null,
                },
              }
            : undefined,
      },
      include: { studentProfile: true },
    });

    await this.auditService.logAction(actorId, 'USER_CREATED', 'User', user.id);

    return this.sanitizeUser(user);
  }

  async listUsers() {
    const users = await this.prisma.user.findMany({
      include: { studentProfile: true },
      orderBy: { createdAt: 'desc' },
    });
    return users.map((user) => this.sanitizeUser(user));
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { studentProfile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  async updateUser(
    id: string,
    data: {
      fullName?: string;
      email?: string | null;
      phone?: string | null;
      password?: string;
      role?: UserRole;
      status?: UserStatus;
      cyberCenterId?: string | null;
      admissionNo?: string | null;
      studentBalance?: number;
      discountRate?: number | null;
    },
    actorId: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { studentProfile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordHash = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName,
        email: data.email === null ? null : data.email,
        phone: data.phone === null ? null : data.phone,
        passwordHash,
        role: data.role,
        status: data.status,
        cyberCenterId: data.cyberCenterId === null ? null : data.cyberCenterId,
        studentProfile:
          data.role === UserRole.STUDENT || user.role === UserRole.STUDENT
            ? {
                upsert: {
                  create: {
                    admissionNo: data.admissionNo ?? undefined,
                    balance: data.studentBalance ?? 0,
                    discountRate: data.discountRate ?? null,
                  },
                  update: {
                    admissionNo: data.admissionNo ?? undefined,
                    balance: data.studentBalance ?? undefined,
                    discountRate: data.discountRate ?? undefined,
                  },
                },
              }
            : undefined,
      },
      include: { studentProfile: true },
    });

    await this.auditService.logAction(actorId, 'USER_UPDATED', 'User', id);

    return this.sanitizeUser(updated);
  }

  async deleteUser(id: string, actorId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
    await this.auditService.logAction(actorId, 'USER_DELETED', 'User', id);

    return { id };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { studentProfile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
  }

  async updateMe(
    userId: string,
    data: {
      fullName?: string;
      email?: string | null;
      phone?: string | null;
      password?: string;
    },
  ) {
    const passwordHash = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        email: data.email === null ? null : data.email,
        phone: data.phone === null ? null : data.phone,
        passwordHash,
      },
      include: { studentProfile: true },
    });

    return this.sanitizeUser(updated);
  }

  sanitizeUser(user: any) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
}
