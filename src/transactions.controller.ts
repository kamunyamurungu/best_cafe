import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionStatus, TransactionType } from './billing.enums';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async listTransactions(
    @Query('status') status?: TransactionStatus,
    @Query('computerId') computerId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('type') type?: TransactionType,
  ) {
    return this.transactionsService.listTransactions({ status, computerId, sessionId, type });
  }

  @Get('pending')
  async listPending() {
    return this.transactionsService.listTransactions({ status: TransactionStatus.PENDING });
  }

  @Post('manual')
  async createManual(
    @Body()
    body: {
      description: string;
      amount: number;
      type?: TransactionType;
      computerId?: string;
      sessionId?: string;
      referenceId?: string;
      customerId?: string;
      createdById?: string;
    },
  ) {
    return this.transactionsService.createManualTransaction(body);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }
}
