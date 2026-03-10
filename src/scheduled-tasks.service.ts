import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ComputersService } from './computers.service';
import { PrismaService } from './prisma.service';
import { SessionsService } from './sessions.service';
import { SessionStatus } from './generated/prisma';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private computersService: ComputersService,
    private prisma: PrismaService,
    private sessionsService: SessionsService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkOfflineComputers() {
    const offlineCount = await this.computersService.checkOfflineComputers();
    if (offlineCount > 0) {
      console.log(`Marked ${offlineCount} computers as offline`);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async endExpiredPrepaidSessions() {
    const now = new Date();
    const activePrepaid = await this.prisma.session.findMany({
      where: {
        status: { in: [SessionStatus.ACTIVE, SessionStatus.PAUSED] },
        prepaidMinutes: { not: null },
        startedAt: { not: null },
      },
      select: {
        id: true,
        startedAt: true,
        pausedAt: true,
        pausedMillis: true,
        prepaidMinutes: true,
      },
    });

    for (const session of activePrepaid) {
      if (!session.startedAt || !session.prepaidMinutes) {
        continue;
      }
      const extraPaused = session.pausedAt
        ? Math.max(0, now.getTime() - session.pausedAt.getTime())
        : 0;
      const pausedMs = (session.pausedMillis || 0) + extraPaused;
      const elapsedMs = Math.max(0, now.getTime() - session.startedAt.getTime() - pausedMs);
      const targetMs = session.prepaidMinutes * 60000;
      if (elapsedMs >= targetMs) {
        try {
          await this.sessionsService.endSession(session.id);
        } catch (_) {
          // best-effort; avoid failing the cron
        }
      }
    }
  }
}