import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(userId: string, action: string, entity: string, entityId?: string) {
    if (!userId) {
      return;
    }

    await this.prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
      },
    });
  }
}
