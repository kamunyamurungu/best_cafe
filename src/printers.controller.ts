import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { PrintersService } from './printers.service';

@Controller('printers')
export class PrintersController {
  constructor(private readonly printersService: PrintersService) {}

  @Post('report')
  async reportPrinters(
    @Body()
    body: { computerId: string; printers: { name: string; isDefault?: boolean }[] },
  ) {
    return this.printersService.reportPrinters(body);
  }

  @Get()
  async listPrinters(@Query('computerId') computerId?: string) {
    return this.printersService.listPrinters(computerId);
  }

  @Patch('default')
  async setDefault(@Body() body: { computerId: string; printerName: string }) {
    return this.printersService.setDefault(body.computerId, body.printerName);
  }
}
