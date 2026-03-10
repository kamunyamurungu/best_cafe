import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { UserRole } from './generated/prisma';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getAllSessions() {
    return this.sessionsService.getAllSessions();
  }

  @Get('active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getActiveSessions() {
    return this.sessionsService.getActiveSessions();
  }

  @Get('active/:computerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getActiveSessionForComputer(@Param('computerId') computerId: string) {
    return this.sessionsService.getActiveSession(computerId);
  }

  @Get('today')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getTodayStats() {
    return this.sessionsService.getTodayStats();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async createSession(@Body() body: { computerId: string; userId?: string }, @Req() req: { user: { id: string } }) {
    return this.sessionsService.createSession(body.computerId, body.userId, req.user.id);
  }

  @Post('prepaid')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async startPrepaidSession(
    @Body() body: { computerId: string; amount: number; userId?: string },
    @Req() req: { user: { id: string } },
  ) {
    return this.sessionsService.startPrepaidSession(
      body.computerId,
      body.amount,
      body.userId,
      req.user.id,
    );
  }

  @Patch(':id/start')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async startSession(
    @Param('id') sessionId: string,
    @Body() body: { userId?: string },
    @Req() req: { user: { id: string } },
  ) {
    return this.sessionsService.startSession(sessionId, body.userId, req.user.id);
  }

  @Patch(':id/end')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async endSession(
    @Param('id') sessionId: string,
    @Body() body: { refundMethod?: 'CASH' | 'CREDIT'; phone?: string } = {},
    @Req() req: { user: { id: string } },
  ) {
    const result = await this.sessionsService.endSession(
      sessionId,
      req.user.id,
      body.refundMethod,
      body.phone,
    );
    return {
      updatedSession: result.updatedSession,
      totalCost: result.totalCost,
      payableAmount: result.payableAmount,
      refundDue: result.refundDue,
      refundApplied: result.refundApplied,
    };
  }

  @Post(':id/refund')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async refundPrepaidSession(
    @Param('id') sessionId: string,
    @Body() body: { refundMethod: 'CASH' | 'CREDIT'; phone?: string; email?: string },
    @Req() req: { user: { id: string } },
  ) {
    return this.sessionsService.refundPrepaidSession(
      sessionId,
      body.refundMethod,
      body.phone,
      body.email,
      req.user.id,
    );
  }

  @Patch(':id/pause')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async pauseSession(@Param('id') sessionId: string) {
    return this.sessionsService.pauseSession(sessionId);
  }

  @Patch(':id/resume')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async resumeSession(@Param('id') sessionId: string) {
    return this.sessionsService.resumeSession(sessionId);
  }

  @Post(':id/cost')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async calculateCost(@Param('id') sessionId: string) {
    return this.sessionsService.calculateCost(sessionId);
  }

  // New: fetch a single session by ID (used by agents after admin stop)
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getSessionById(@Param('id') sessionId: string) {
    return this.sessionsService.getSessionById(sessionId);
  }
}