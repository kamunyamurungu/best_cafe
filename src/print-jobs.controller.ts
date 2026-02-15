import { Controller, Post, Body, Get, Query, Patch, Param } from '@nestjs/common';
import { PrintJobsService } from './print-jobs.service';
import { PrintJobStatus } from './billing.enums';

@Controller('print-jobs')
export class PrintJobsController {
  constructor(private readonly printJobsService: PrintJobsService) {}

  @Post('report')
  async reportJob(
    @Body()
    body: {
      computerId: string;
      sessionId?: string;
      externalJobId?: string;
      spoolJobId?: number;
      printerName: string;
      pages: number;
      isColor: boolean;
      paperSize: string;
    },
  ) {
    return this.printJobsService.reportJob(body);
  }

  @Get()
  async listJobs(
    @Query('status') status?: PrintJobStatus,
    @Query('computerId') computerId?: string,
    @Query('sessionId') sessionId?: string,
  ) {
    return this.printJobsService.listJobs({ status, computerId, sessionId });
  }

  @Get('pending')
  async listPendingJobs() {
    return this.printJobsService.listJobs({ status: PrintJobStatus.PENDING });
  }

  @Patch(':id/approve')
  async approveJob(@Param('id') id: string) {
    return this.printJobsService.approveJob(id);
  }

  @Patch(':id/reject')
  async rejectJob(@Param('id') id: string) {
    return this.printJobsService.rejectJob(id);
  }

  @Patch(':id/printed')
  async markPrinted(@Param('id') id: string) {
    return this.printJobsService.markPrinted(id);
  }
}
