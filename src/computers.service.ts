import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComputerStatus } from './generated/prisma';
import { SocketsGateway } from './sockets.gateway';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ComputersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SocketsGateway))
    private socketsGateway: SocketsGateway,
  ) {}

  async registerComputer(name: string) {
    let computer = await this.prisma.computer.findFirst({ where: { name } });

    if (computer) {
      // Update last seen and status
      computer = await this.prisma.computer.update({
        where: { id: computer.id },
        data: {
          lastSeenAt: new Date(),
          status: ComputerStatus.AVAILABLE,
        },
      });
    } else {
      const deviceToken = uuidv4();
      computer = await this.prisma.computer.create({
        data: {
          deviceToken,
          name,
          status: ComputerStatus.AVAILABLE,
          lastSeenAt: new Date(),
        },
      });
    }

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'COMPUTER_CONNECTED',
        computerId: computer.id,
        payload: { deviceToken: computer.deviceToken },
      },
    });

    // Emit WebSocket event
    this.socketsGateway.server?.emit('computer_status_changed', {
      computerId: computer.id,
      status: computer.status,
    });

    return computer;
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
          where: { status: 'ACTIVE' },
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
        status: computer.sessions.length > 0 ? ComputerStatus.IN_USE : ComputerStatus.AVAILABLE,
      },
    });

    // Return the command for the PC
    const command = computer.sessions.length > 0 ? 'UNLOCK' : 'LOCK';

    return { command, computerId: computer.id };
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
          where: { status: 'ACTIVE' },
          select: {
            startedAt: true,
            pricePerMinute: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}