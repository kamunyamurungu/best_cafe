import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from '../generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(params: {
    fullName: string;
    email?: string;
    phone?: string;
    password: string;
    role?: UserRole;
  }) {
    // Check if user exists
    if (params.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: params.email },
      });

      if (existingUser) {
        throw new ConflictException('User already exists');
      }
    }

    if (params.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: params.phone },
      });

      if (existingPhone) {
        throw new ConflictException('Phone already exists');
      }
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(params.password, saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName: params.fullName,
        email: params.email,
        phone: params.phone,
        passwordHash,
        role: params.role ?? UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
      },
    });

    // Generate JWT
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        balance: user.balance,
      },
    };
  }

  async bootstrapAdmin(params: {
    fullName: string;
    email?: string;
    phone?: string;
    password: string;
  }) {
    const existingCount = await this.prisma.user.count();
    if (existingCount > 0) {
      throw new ForbiddenException('Bootstrap already completed');
    }

    return this.register({
      ...params,
      role: UserRole.ADMIN,
    });
  }

  async login(identifier: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException('Account is suspended');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        balance: user.balance,
      },
    };
  }

  async topUp(userId: string, amount: number) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return {
      id: user.id,
      email: user.email,
      balance: user.balance,
    };
  }
}