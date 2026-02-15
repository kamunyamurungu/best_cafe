import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { SnmpService } from './snmp.service';

@Controller('snmp')
export class SnmpController {
  constructor(private readonly snmpService: SnmpService) {}

  @Get('devices')
  async listDevices() {
    return this.snmpService.listDevices();
  }

  @Post('devices')
  async createDevice(
    @Body()
    body: { name: string; host: string; community?: string; scanOid: string; copyOid: string },
  ) {
    return this.snmpService.createDevice(body);
  }

  @Patch('devices')
  async updateDevice(
    @Body()
    body: {
      id: string;
      name?: string;
      host?: string;
      community?: string;
      scanOid?: string;
      copyOid?: string;
      enabled?: boolean;
    },
  ) {
    return this.snmpService.updateDevice(body.id, body);
  }

  @Get('daily-totals')
  async getDailyTotals(@Query('date') date?: string) {
    return this.snmpService.getDailyTotals(date);
  }
}
