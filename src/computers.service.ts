import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComputerStatus } from './generated/prisma';
import { SocketsGateway } from './sockets.gateway';
import { v4 as uuidv4 } from 'uuid';
import { SessionsService } from './sessions.service';

@Injectable()
export class ComputersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SocketsGateway))
    private socketsGateway: SocketsGateway,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
  ) {}

  async registerComputer(name: string, providedDeviceToken?: string) {
    const existing = await this.prisma.computer.findFirst({
      where: { name },
      include: {
        sessions: {
          where: { status: { in: ['ACTIVE', 'PAUSED'] } },
          select: { status: true },
        },
      },
    });
    let result;
    // Prefer deviceToken identity if provided to avoid name collisions
    if (providedDeviceToken) {
      const byToken = await this.prisma.computer.findUnique({
        where: { deviceToken: providedDeviceToken },
        include: {
          sessions: {
            where: { status: { in: ['ACTIVE', 'PAUSED'] } },
            select: { status: true },
          },
        },
      });
      if (byToken) {
        const hasActive = byToken.sessions?.some((s: any) => s.status === 'ACTIVE') ?? false;
        const hasPaused = byToken.sessions?.some((s: any) => s.status === 'PAUSED') ?? false;
        result = await this.prisma.computer.update({
          where: { deviceToken: providedDeviceToken },
          data: {
            name, // keep display name updated
            lastSeenAt: new Date(),
            status: hasActive
              ? ComputerStatus.IN_USE
              : hasPaused
              ? ComputerStatus.LOCKED
              : ComputerStatus.AVAILABLE,
          },
        });
      } else {
        // If a computer exists by name, prefer updating it to use the new token
        if (existing) {
          const hasActive = existing.sessions?.some((s: any) => s.status === 'ACTIVE') ?? false;
          const hasPaused = existing.sessions?.some((s: any) => s.status === 'PAUSED') ?? false;
          result = await this.prisma.computer.update({
            where: { id: existing.id },
            data: {
              deviceToken: providedDeviceToken,
              name,
              lastSeenAt: new Date(),
              status: hasActive
                ? ComputerStatus.IN_USE
                : hasPaused
                ? ComputerStatus.LOCKED
                : ComputerStatus.AVAILABLE,
            },
          });
        } else {
          // No match by token or name; create new
          result = await this.prisma.computer.create({
            data: {
              deviceToken: providedDeviceToken,
              name,
              status: ComputerStatus.AVAILABLE,
              lastSeenAt: new Date(),
            },
          });
        }
      }
    } else {
      if (existing) {
        const hasActive = existing.sessions.some((s) => s.status === 'ACTIVE');
        const hasPaused = existing.sessions.some((s) => s.status === 'PAUSED');
        // Update last seen and status
        result = await this.prisma.computer.update({
          where: { id: existing.id },
          data: {
            lastSeenAt: new Date(),
            status: hasActive
              ? ComputerStatus.IN_USE
              : hasPaused
              ? ComputerStatus.LOCKED
              : ComputerStatus.AVAILABLE,
          },
        });
      } else {
        const deviceToken = uuidv4();
        result = await this.prisma.computer.create({
          data: {
            deviceToken,
            name,
            status: ComputerStatus.AVAILABLE,
            lastSeenAt: new Date(),
          },
        });
      }
    }

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'COMPUTER_CONNECTED',
        computerId: result.id,
        payload: { deviceToken: result.deviceToken },
      },
    });

    // Emit WebSocket event to admin dashboards only
    await this.socketsGateway.emitToAdmins('computer_status_changed', {
      computerId: result.id,
      status: result.status,
    });

    return result;
  }

  async handleHeartbeat(deviceToken: string) {
    const computer = await this.prisma.computer.findUnique({
      where: { deviceToken },
    });

    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    // Update lastSeenAt
    await this.prisma.computer.update({
      where: { deviceToken },
      data: { lastSeenAt: new Date() },
    });

    // Check if computer should be marked as offline
    // This will be handled by a scheduled task, but for now, just update

    return { status: 'OK' };
  }

  async updateStatus(computerId: string, status: ComputerStatus) {
    const computer = await this.prisma.computer.update({
      where: { id: computerId },
      data: { status },
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'COMPUTER_STATUS_CHANGED',
        computerId,
        payload: { newStatus: status },
      },
    });

    return computer;
  }

  async resolveStateOnReconnect(deviceToken: string) {
    const computer = await this.prisma.computer.findUnique({
      where: { deviceToken },
      include: {
        sessions: {
          where: { status: { in: ['ACTIVE', 'PAUSED'] } },
          orderBy: { startedAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    // Update lastSeenAt and status
    await this.prisma.computer.update({
      where: { deviceToken },
      data: {
        lastSeenAt: new Date(),
        status: computer.sessions.some((s) => s.status === 'ACTIVE')
          ? ComputerStatus.IN_USE
          : computer.sessions.some((s) => s.status === 'PAUSED')
          ? ComputerStatus.LOCKED
          : ComputerStatus.AVAILABLE,
      },
    });

    // Return the command for the PC
    const hasActive = computer.sessions.some((s) => s.status === 'ACTIVE');
    const hasPaused = computer.sessions.some((s) => s.status === 'PAUSED');
    const command = hasPaused ? 'LOCK' : hasActive ? 'UNLOCK' : 'LOCK';
    const session = computer.sessions.length > 0 ? computer.sessions[0] : null;

    return { command, computerId: computer.id, session };
  }

  async checkOfflineComputers() {
    const thirtySecondsAgo = new Date(Date.now() - 30000); // 30 seconds

    const offlineComputers = await this.prisma.computer.findMany({
      where: {
        lastSeenAt: {
          lt: thirtySecondsAgo,
        },
        status: {
          not: ComputerStatus.OFFLINE,
        },
      },
    });

    for (const computer of offlineComputers) {
      await this.updateStatus(computer.id, ComputerStatus.OFFLINE);
      // Pause any active session and lock the computer
      await this.sessionsService.pauseActiveSessionForComputer(computer.id);
    }

    return offlineComputers.length;
  }

  async getComputerById(id: string) {
    return this.prisma.computer.findUnique({
      where: { id },
    });
  }

  async updateComputer(id: string, name?: string) {
    return this.prisma.computer.update({
      where: { id },
      data: { name },
    });
  }

  async getComputerByDeviceToken(deviceToken: string) {
    return this.prisma.computer.findUnique({
      where: { deviceToken },
    });
  }

  async getAllComputers() {
    return this.prisma.computer.findMany({
      include: {
        sessions: {
          where: { status: { in: ['ACTIVE', 'ENDED'] } },
          select: {
            startedAt: true,
            endedAt: true,
            pricePerMinute: true,
            totalCost: true,
            status: true,
          },
          orderBy: { endedAt: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}