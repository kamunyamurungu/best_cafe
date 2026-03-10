import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SocketsGateway } from './sockets.gateway';
import { SessionStatus, UserRole, UserStatus } from './generated/prisma';
import { TransactionStatus, TransactionType } from './billing.enums';
import { AuditService } from './audit/audit.service';

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SocketsGateway))
    private socketsGateway: SocketsGateway,
    private auditService: AuditService,
  ) {}

  async createSession(computerId: string, userId?: string, actorId?: string) {
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
      if (user.status !== UserStatus.ACTIVE) {
        throw new ConflictException('User is suspended');
      }
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

    if (actorId) {
      await this.auditService.logAction(actorId, 'SESSION_CREATED', 'Session', session.id);
    }

    return session;
  }

  async startSession(sessionId: string, userId?: string, actorId?: string) {
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

    if (actorId) {
      await this.auditService.logAction(actorId, 'SESSION_STARTED', 'Session', sessionId);
    }

    // Send UNLOCK command to PC (include session data for agent timer)
    await this.socketsGateway.unlockComputer(session.computerId, {
      session: updatedSession,
    });

    return updatedSession;
  }

  async startPrepaidSession(
    computerId: string,
    amount: number,
    userId?: string,
    actorId?: string,
  ) {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

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

    if (userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.status !== UserStatus.ACTIVE) {
        throw new ConflictException('User is suspended');
      }
    }

    const pricing = await this.prisma.pricing.findFirst({
      where: { active: true },
    });

    if (!pricing) {
      throw new ConflictException('No active pricing found');
    }

    if (amount < pricing.pricePerMinute) {
      throw new BadRequestException('Amount is below the minimum session cost');
    }

    if (amount % pricing.pricePerMinute !== 0) {
      throw new BadRequestException('Amount must be in whole-minute increments');
    }

    const prepaidMinutes = Math.floor(amount / pricing.pricePerMinute);

    const session = await this.prisma.session.create({
      data: {
        computerId,
        userId,
        status: SessionStatus.ACTIVE,
        startedAt: new Date(),
        pricePerMinute: pricing.pricePerMinute,
        prepaidAmount: amount,
        prepaidMinutes,
      },
    });

    await this.prisma.computer.update({
      where: { id: computerId },
      data: { status: 'IN_USE' },
    });
    await this.socketsGateway.emitToAdmins('computer_status_changed', {
      computerId,
      status: 'IN_USE',
    });

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.TIME,
        referenceId: session.id,
        computerId: session.computerId,
        sessionId: session.id,
        customerId: session.userId ?? undefined,
        createdById: actorId,
        description: `Prepaid session: ${prepaidMinutes} minute(s)`,
        amount,
        status: TransactionStatus.PAID,
      },
    });

    await this.prisma.event.create({
      data: {
        type: 'SESSION_STARTED',
        computerId,
        userId,
        payload: { sessionId: session.id, prepaidMinutes, prepaidAmount: amount },
      },
    });

    await this.prisma.event.create({
      data: {
        type: 'SESSION_ACTIVATED',
        computerId,
        userId,
        payload: { sessionId: session.id },
      },
    });

    if (actorId) {
      await this.auditService.logAction(actorId, 'SESSION_PREPAID_STARTED', 'Session', session.id);
    }

    await this.socketsGateway.emitToAdmins('session_updated', {
      sessionId: session.id,
      computerId,
      status: 'ACTIVE',
      startedAt: session.startedAt,
      pricePerMinute: session.pricePerMinute,
    });

    await this.socketsGateway.unlockComputer(computerId, {
      session,
    });

    return session;
  }

  async endSession(
    sessionId: string,
    actorId?: string,
    refundMethod?: 'CASH' | 'CREDIT',
    phone?: string,
  ) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { computer: true, user: { include: { studentProfile: true } } },
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
    let durationMinutes = Math.ceil(durationMs / 60000); // Round up to nearest minute
    let totalCost = durationMinutes * session.pricePerMinute;

    let discountedCost = totalCost;
    let payableAmount = totalCost;
    let refundDue = 0;
    let refundApplied = false;

    if (session.prepaidMinutes != null) {
      const capMinutes = Math.max(0, session.prepaidMinutes);
      durationMinutes = Math.min(durationMinutes, capMinutes);
      totalCost = durationMinutes * session.pricePerMinute;
      discountedCost = totalCost;
      payableAmount = 0;
      const prepaidAmount = session.prepaidAmount ?? capMinutes * session.pricePerMinute;
      refundDue = Math.max(0, prepaidAmount - totalCost);

      if (refundDue > 0 && refundMethod) {
        await this.applyRefund(refundMethod, refundDue, phone, undefined, actorId, session.id);
        refundApplied = true;
      }
    } else if (session.user && session.user.role === UserRole.STUDENT) {
      const profile = session.user.studentProfile;
      const discountRate = profile?.discountRate ?? 0;
      discountedCost = Math.max(0, Math.ceil(totalCost * (1 - discountRate)));
      const balance = profile?.balance ?? 0;
      const deduct = Math.min(balance, discountedCost);
      payableAmount = discountedCost - deduct;

      if (profile && deduct > 0) {
        await this.prisma.studentProfile.update({
          where: { userId: session.userId! },
          data: {
            balance: { decrement: deduct },
          },
        });
      }
    } else if (session.user && (session.user.role === UserRole.CUSTOMER || session.user.role === UserRole.USER)) {
      const balance = session.user.balance ?? 0;
      const deduct = Math.min(balance, totalCost);
      payableAmount = totalCost - deduct;

      if (deduct > 0) {
        await this.prisma.user.update({
          where: { id: session.userId! },
          data: {
            balance: { decrement: deduct },
          },
        });
      }
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

    const existingTransaction = await this.prisma.transaction.findFirst({
      where: {
        sessionId,
        type: TransactionType.TIME,
      },
    });

    if (!existingTransaction && session.prepaidMinutes == null) {
      const amount = session.user?.role === UserRole.STUDENT ? payableAmount : totalCost;
      if (amount > 0) {
        await this.prisma.transaction.create({
          data: {
            type: TransactionType.TIME,
            referenceId: sessionId,
            computerId: session.computerId,
            sessionId,
            customerId: session.userId ?? undefined,
            createdById: actorId,
            description: `Computer usage: ${durationMinutes} minute(s)`,
            amount,
            status: TransactionStatus.PENDING,
          },
        });
      }
    }

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
        userId: session.userId ?? undefined,
        payload: { sessionId, durationMinutes, totalCost: discountedCost },
      },
    });

    if (actorId) {
      await this.auditService.logAction(actorId, 'SESSION_ENDED', 'Session', sessionId);
    }

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

    return {
      updatedSession,
      totalCost: discountedCost,
      payableAmount,
      refundDue,
      refundApplied,
    };
  }

  async refundPrepaidSession(
    sessionId: string,
    refundMethod: 'CASH' | 'CREDIT',
    phone: string | undefined,
    email: string | undefined,
    actorId?: string,
  ) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: { include: { studentProfile: true } } },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.prepaidMinutes == null) {
      throw new BadRequestException('Session is not prepaid');
    }

    if (!session.endedAt || !session.startedAt) {
      throw new BadRequestException('Session must be ended before refund');
    }

    const durationMs = Math.max(
      0,
      session.endedAt.getTime() - session.startedAt.getTime() - (session.pausedMillis || 0),
    );
    const durationMinutes = Math.ceil(durationMs / 60000);
    const capMinutes = Math.max(0, session.prepaidMinutes);
    const usedMinutes = Math.min(durationMinutes, capMinutes);
    const usedCost = usedMinutes * session.pricePerMinute;
    const prepaidAmount = session.prepaidAmount ?? capMinutes * session.pricePerMinute;
    const refundDue = Math.max(0, prepaidAmount - usedCost);

    if (refundDue <= 0) {
      throw new BadRequestException('No refund due for this session');
    }

    const existingRefund = await this.getRefundTransaction(sessionId);
    if (existingRefund) {
      throw new ConflictException('Refund already applied for this session');
    }

    await this.applyRefund(refundMethod, refundDue, phone, email, actorId, session.id);

    return { sessionId, refundDue, refundApplied: true };
  }

  private async getRefundTransaction(sessionId: string) {
    return this.prisma.transaction.findFirst({
      where: {
        sessionId,
        type: TransactionType.TIME,
        status: TransactionStatus.PAID,
        amount: { lt: 0 },
        description: { startsWith: 'Prepaid refund' },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private withRefundInfo(session: {
    transactions?: { amount: number }[];
  }) {
    const refundTx = session.transactions?.[0];
    const { transactions, ...rest } = session as Record<string, unknown>;
    return {
      ...rest,
      refundApplied: Boolean(refundTx),
      refundAmount: refundTx ? Math.abs(refundTx.amount) : null,
    };
  }

  private async applyRefund(
    refundMethod: 'CASH' | 'CREDIT',
    amount: number,
    phone: string | undefined,
    email: string | undefined,
    actorId: string | undefined,
    sessionId: string,
  ) {
    if (refundMethod === 'CREDIT') {
      if (!phone && !email) {
        throw new BadRequestException('Phone or email is required for credit refunds');
      }
      const orFilters = [
        ...(phone ? [{ phone }] : []),
        ...(email ? [{ email }] : []),
      ];
      const user = await this.prisma.user.findFirst({
        where: { OR: orFilters },
        include: { studentProfile: true },
      });
      if (!user) {
        throw new NotFoundException('User not found for the provided phone or email');
      }
      const identifier = phone ?? email ?? 'unknown';

      if (user.role === UserRole.STUDENT) {
        await this.prisma.studentProfile.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            balance: amount,
            admissionNo: user.studentProfile?.admissionNo ?? undefined,
            discountRate: user.studentProfile?.discountRate ?? null,
          },
          update: {
            balance: { increment: amount },
          },
        });
      } else {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            balance: { increment: amount },
          },
        });
      }

      await this.prisma.transaction.create({
        data: {
          type: TransactionType.TIME,
          referenceId: sessionId,
          sessionId,
          customerId: user.id,
          createdById: actorId,
          description: `Prepaid refund credited to ${identifier}`,
          amount: -amount,
          status: TransactionStatus.PAID,
        },
      });
    } else {
      await this.prisma.transaction.create({
        data: {
          type: TransactionType.TIME,
          referenceId: sessionId,
          sessionId,
          createdById: actorId,
          description: 'Prepaid refund issued (cash)',
          amount: -amount,
          status: TransactionStatus.PAID,
        },
      });
    }

    if (actorId) {
      await this.auditService.logAction(actorId, 'SESSION_PREPAID_REFUND', 'Session', sessionId);
    }
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
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        computer: true,
        user: true,
        transactions: {
          where: {
            type: TransactionType.TIME,
            status: TransactionStatus.PAID,
            amount: { lt: 0 },
            description: { startsWith: 'Prepaid refund' },
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    if (!session) return session;
    return this.withRefundInfo(session);
  }

  async getAllSessions() {
    const sessions = await this.prisma.session.findMany({
      include: {
        computer: true,
        transactions: {
          where: {
            type: TransactionType.TIME,
            status: TransactionStatus.PAID,
            amount: { lt: 0 },
            description: { startsWith: 'Prepaid refund' },
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return sessions.map((session) => this.withRefundInfo(session));
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
    await this.socketsGateway.unlockComputer(session.computerId, {
      session: updated,
    });

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

    // Notify computer (agent) with session details
    await this.socketsGateway.emitToComputer(session.computerId, 'session_updated', {
      sessionId,
      computerId: session.computerId,
      status: 'ACTIVE',
      startedAt: updated.startedAt,
      pausedMillis: updated.pausedMillis,
    });

    return updated;
  }
}