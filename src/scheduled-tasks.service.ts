import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ComputersService } from './computers.service';

@Injectable()
export class ScheduledTasksService {
  constructor(private computersService: ComputersService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkOfflineComputers() {
    const offlineCount = await this.computersService.checkOfflineComputers();
    if (offlineCount > 0) {
      console.log(`Marked ${offlineCount} computers as offline`);
    }
  }
}