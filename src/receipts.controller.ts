import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { PaymentMethod } from './billing.enums';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async createReceipt(
    @Body() body: { transactionIds: string[]; paymentMethod: PaymentMethod; issuedBy?: string },
  ) {
    return this.receiptsService.createReceipt(body);
  }

  @Get()
  async listReceipts() {
    return this.receiptsService.listReceipts();
  }

  @Get('daily-totals')
  async getDailyTotals(@Query('date') date?: string) {
    return this.receiptsService.getDailyTotals(date);
  }

  @Get(':id')
  async getReceiptById(@Param('id') id: string) {
    return this.receiptsService.getReceiptById(id);
  }
}
