import { Injectable, ConflictException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SocketsGateway } from './sockets.gateway';
import { SessionStatus } from './generated/prisma';

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SocketsGateway))
    private socketsGateway: SocketsGateway,
  ) {}

  async createSession(computerId: string, userId?: string) {
    // Check if computer exists and is available
    const computer = await this.prisma.computer.findUnique({
      where: { id: computerId },
      include: { sessions: { where: { status: SessionStatus.ACTIVE } } },
    });

    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    if (computer.status !== 'AVAILABLE') {
      throw new ConflictException('Computer is not available');
    }

    if (computer.sessions.length > 0) {
      throw new ConflictException('Computer already has an active session');
    }

    // If user provided, check balance
    if (userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // For now, assume they have enough balance, deduct later when ending
    }

    // Get active pricing
    const pricing = await this.prisma.pricing.findFirst({
      where: { active: true },
    });

    if (!pricing) {
      throw new ConflictException('No active pricing found');
    }

    // Create session
    const session = await this.prisma.session.create({
      data: {
        computerId,
        userId,
        status: SessionStatus.CREATED,
        pricePerMinute: pricing.pricePerMinute,
      },
    });

    // Update computer status to LOCKED initially
    await this.prisma.computer.update({
      where: { id: computerId },
      data: { status: 'LOCKED' },
    });
    // Notify admin dashboards (admins only)
    await this.socketsGateway.emitToAdmins('computer_status_changed', {
      computerId,
      status: 'LOCKED',
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'SESSION_STARTED',
        computerId,
        userId,
        payload: { sessionId: session.id },
      },
    });

    return session;
  }

  async startSession(sessionId: string, userId?: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { computer: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status !== SessionStatus.CREATED) {
      throw new ConflictException('Session is not in CREATED state');
    }

    // Update session to ACTIVE and set startedAt
    const updatedSession = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.ACTIVE,
        startedAt: new Date(),
      },
    });

    // Update computer status to IN_USE
    await this.prisma.computer.update({
      where: { id: session.computerId },
      data: { status: 'IN_USE' },
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'SESSION_ACTIVATED',
        computerId: session.computerId,
        userId,
        payload: { sessionId },
      },
    });

    // Send UNLOCK command to PC
    await this.socketsGateway.unlockComputer(session.computerId);

    return updatedSession;
  }

  async endSession(sessionId: string, userId?: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { computer: true, user: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status !== SessionStatus.ACTIVE && session.status !== SessionStatus.PAUSED) {
      throw new ConflictException('Session is not active or paused');
    }

    const endedAt = new Date();
    const baseMs = endedAt.getTime() - (session.startedAt?.getTime() || endedAt.getTime());
    const pausedMs = session.pausedMillis || 0;
    const durationMs = Math.max(0, baseMs - pausedMs);
    const durationMinutes = Math.ceil(durationMs / 60000); // Round up to nearest minute
    const totalCost = durationMinutes * session.pricePerMinute;

    // If user is present, check and deduct balance
    if (session.userId) {
      const user = session.user!;
      if (user.balance < totalCost) {
        throw new ConflictException('Insufficient balance');
      }
      await this.prisma.user.update({
        where: { id: session.userId },
        data: {
          balance: {
            decrement: totalCost,
          },
        },
      });
    }

    // Update session
    const updatedSession = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.ENDED,
        endedAt,
        totalCost,
      },
    });

    // Update computer status to AVAILABLE
    await this.prisma.computer.update({
      where: { id: session.computerId },
      data: { status: 'AVAILABLE' },
    });

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'SESSION_ENDED',
        computerId: session.computerId,
        userId,
        payload: { sessionId, durationMinutes, totalCost },
      },
    });

    // Notify admins (admins only)
    await this.socketsGateway.emitToAdmins('session_updated', {
      sessionId,
      computerId: session.computerId,
      status: 'ENDED',
      totalCost,
      totalMinutes: durationMinutes,
      startedAt: session.startedAt,
      endedAt,
    });

    // Notify the specific computer as well so the agent can persist summary
    await this.socketsGateway.emitToComputer(session.computerId, 'session_updated', {
      sessionId,
      computerId: session.computerId,
      status: 'ENDED',
      totalCost,
      totalMinutes: durationMinutes,
      startedAt: session.startedAt,
      endedAt,
    });

    // Send LOCK command to PC
    await this.socketsGateway.lockComputer(session.computerId);

    return { updatedSession, totalCost };
  }

  async getActiveSession(computerId: string) {
    return this.prisma.session.findFirst({
      where: {
        computerId,
        status: SessionStatus.ACTIVE,
      },
    });
  }

  async calculateCost(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.startedAt) {
      throw new NotFoundException('Session not found or not started');
    }

    const now = new Date();
    const baseMs = now.getTime() - session.startedAt.getTime();
    const pausedMs = session.pausedMillis || 0;
    const durationMs = Math.max(0, baseMs - pausedMs);
    const durationMinutes = Math.ceil(durationMs / 60000);
    const totalCost = durationMinutes * session.pricePerMinute;

    return { durationMinutes, totalCost };
  }

  // New: get single session by id (includes timestamps and totals)
  async getSessionById(sessionId: string) {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        computer: true,
        user: true,
      },
    });
  }

  async getAllSessions() {
    return this.prisma.session.findMany({
      include: {
        computer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getActiveSessions() {
    return this.prisma.session.findMany({
      where: { status: SessionStatus.ACTIVE },
      include: {
        computer: true,
      },
    });
  }

  async getTodayStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sessions = await this.prisma.session.findMany({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        computer: true,
      },
    });

    const totalSessions = sessions.length;
    const totalRevenue = sessions.reduce((sum, session) => sum + (session.totalCost || 0), 0);
    const averageTime = totalSessions > 0 
      ? sessions.reduce((sum, session) => {
          if (session.startedAt && session.endedAt) {
            return sum + (session.endedAt.getTime() - session.startedAt.getTime()) / 60000;
          }
          return sum;
        }, 0) / totalSessions
      : 0;

    // Top PCs
    const pcStats = sessions.reduce((acc, session) => {
      const pcId = session.computer.name;
      if (!acc[pcId]) acc[pcId] = 0;
      if (session.startedAt && session.endedAt) {
        acc[pcId] += (session.endedAt.getTime() - session.startedAt.getTime()) / 60000;
      }
      return acc;
    }, {} as Record<string, number>);

    const topPcs = Object.entries(pcStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, minutes]) => ({ name, minutes }));

    return {
      totalSessions,
      totalRevenue,
      averageTime: Math.round(averageTime),
      topPcs,
    };
  }

  async pauseSession(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) throw new NotFoundException('Session not found');
    if (session.status !== SessionStatus.ACTIVE)
      throw new ConflictException('Only active sessions can be paused');

    const pausedAt = new Date();
    const updated = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.PAUSED,
        pausedAt,
      },
    });

    // Lock computer
    await this.prisma.computer.update({
      where: { id: session.computerId },
      data: { status: 'LOCKED' },
    });
    await this.socketsGateway.lockComputer(session.computerId);

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'SESSION_PAUSED',
        computerId: session.computerId,
        payload: { sessionId },
      },
    });

    // Notify admins (admins only)
    await this.socketsGateway.emitToAdmins('session_updated', {
      sessionId,
      computerId: session.computerId,
      status: 'PAUSED',
    });

    return updated;
  }

  async pauseActiveSessionForComputer(computerId: string) {
    const activeSession = await this.prisma.session.findFirst({
      where: { computerId, status: SessionStatus.ACTIVE },
    });
    if (activeSession) {
      await this.pauseSession(activeSession.id);
    }
  }

  async resumeSession(sessionId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Session not found');
    if (session.status !== SessionStatus.PAUSED)
      throw new ConflictException('Only paused sessions can be resumed');

    const now = new Date();
    const pausedAt = session.pausedAt ?? now;
    const additionalPaused = Math.max(0, now.getTime() - pausedAt.getTime());

    const updated = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.ACTIVE,
        pausedAt: null,
        pausedMillis: (session.pausedMillis || 0) + additionalPaused,
      },
    });

    // Unlock computer
    await this.prisma.computer.update({
      where: { id: session.computerId },
      data: { status: 'IN_USE' },
    });
    await this.socketsGateway.unlockComputer(session.computerId);

    // Log event
    await this.prisma.event.create({
      data: {
        type: 'SESSION_RESUMED',
        computerId: session.computerId,
        payload: { sessionId },
      },
    });

    // Notify admins (admins only)
    await this.socketsGateway.emitToAdmins('session_updated', {
      sessionId,
      computerId: session.computerId,
      status: 'ACTIVE',
    });

    return updated;
  }
}