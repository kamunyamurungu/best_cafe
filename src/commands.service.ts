import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from './generated/prisma';

type CommandType = 'LOCK' | 'UNLOCK';

@Injectable()
export class CommandsService {
  constructor(private prisma: PrismaService) {}

  async createCommand(computerId: string, type: CommandType) {
    // Check if computer exists
    const computer = await this.prisma.computer.findUnique({
      where: { id: computerId },
    });

    if (!computer) {
      throw new Error('Computer not found');
    }

    // Create command
    const command = await this.prisma.command.create({
      data: {
        computerId,
        type,
        status: 'PENDING',
        createdAt: new Date(),
      },
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'COMMAND_CREATED',
        computerId,
        payload: { commandId: command.id, commandType: type },
      },
    });

    return command;
  }

  async getPendingCommands(computerId: string) {
    return this.prisma.command.findMany({
      where: {
        computerId,
        status: 'PENDING',
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async markCommandSent(commandId: string) {
    return this.prisma.command.update({
      where: { id: commandId },
      data: {
        status: 'SENT',
        sentAt: new Date(),
      },
    });
  }

  async markCommandAcked(commandId: string) {
    const command = await this.prisma.command.update({
      where: { id: commandId },
      data: {
        status: 'ACKED',
        ackedAt: new Date(),
      },
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'COMMAND_ACKED',
        computerId: command.computerId,
        payload: { commandId, commandType: command.type },
      },
    });

    return command;
  }

  async adminUnlock(computerId: string, password: string) {
    // Simple password check - in production, use proper auth
    if (password !== 'admin123') {
      throw new Error('Invalid admin password');
    }

    // Create unlock command
    return this.createCommand(computerId, 'UNLOCK');
  }
}