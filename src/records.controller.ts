import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async listRecords(
    @Query('type') type?: string,
    @Query('createdById') createdById?: string,
    @Query('linkedTransactionId') linkedTransactionId?: string,
  ) {
    return this.recordsService.listRecords({ type, createdById, linkedTransactionId });
  }

  @Get(':id')
  async getRecord(@Param('id') id: string) {
    return this.recordsService.getRecord(id);
  }
}
