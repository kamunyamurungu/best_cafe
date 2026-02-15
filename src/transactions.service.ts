import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TransactionStatus, TransactionType } from './billing.enums';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async listTransactions(filters: {
    status?: TransactionStatus;
    computerId?: string;
    sessionId?: string;
    type?: TransactionType;
  }) {
    return this.prisma.transaction.findMany({
      where: {
        status: filters.status,
        computerId: filters.computerId,
        sessionId: filters.sessionId,
        type: filters.type,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createManualTransaction(data: {
    description: string;
    amount: number;
    type?: TransactionType;
    computerId?: string;
    sessionId?: string;
    referenceId?: string;
    customerId?: string;
    createdById?: string;
  }) {
    return this.prisma.transaction.create({
      data: {
        type: data.type ?? TransactionType.SERVICE,
        description: data.description,
        amount: data.amount,
        computerId: data.computerId,
        sessionId: data.sessionId,
        referenceId: data.referenceId,
        customerId: data.customerId,
        createdById: data.createdById,
        status: TransactionStatus.PENDING,
      },
    });
  }

  async getTransactionById(id: string) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id } });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }
}
