import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaymentMethod, TransactionStatus } from './billing.enums';

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService) {}

  async createReceipt(data: { transactionIds: string[]; paymentMethod: PaymentMethod; issuedBy?: string }) {
    const transactions = await this.prisma.transaction.findMany({
      where: { id: { in: data.transactionIds } },
    });

    if (transactions.length !== data.transactionIds.length) {
      throw new NotFoundException('One or more transactions not found');
    }

    const hasNonPending = transactions.some((t) => t.status !== TransactionStatus.PENDING);
    if (hasNonPending) {
      throw new ConflictException('Only pending transactions can be receipted');
    }

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    const prismaClient = this.prisma.prisma as any;

    return prismaClient.$transaction(async (tx: any) => {
      const receipt = await tx.receipt.create({
        data: {
          totalAmount,
          paymentMethod: data.paymentMethod,
          issuedBy: data.issuedBy,
        },
      });

      await tx.transaction.updateMany({
        where: { id: { in: data.transactionIds } },
        data: {
          status: TransactionStatus.PAID,
          receiptId: receipt.id,
        },
      });

      return tx.receipt.findUnique({
        where: { id: receipt.id },
        include: { transactions: true },
      });
    });
  }

  async listReceipts() {
    return this.prisma.receipt.findMany({
      orderBy: { issuedAt: 'desc' },
      include: { transactions: true },
    });
  }

  async getReceiptById(id: string) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
      include: { transactions: true },
    });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }
    return receipt;
  }

  async getDailyTotals(date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    const receipts = await this.prisma.receipt.findMany({
      where: {
        issuedAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const totalAmount = receipts.reduce((sum, receipt) => sum + receipt.totalAmount, 0);

    return { date: start.toISOString().slice(0, 10), totalAmount, count: receipts.length };
  }
}
