import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async listRecords(filters: { type?: string; createdById?: string; linkedTransactionId?: string }) {
    return this.prisma.record.findMany({
      where: {
        type: filters.type as any,
        createdById: filters.createdById,
        linkedTransactionId: filters.linkedTransactionId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecord(id: string) {
    const record = await this.prisma.record.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Record not found');
    return record;
  }
}
