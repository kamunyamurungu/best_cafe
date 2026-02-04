import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getAllSessions() {
    return this.sessionsService.getAllSessions();
  }

  @Get('active')
  async getActiveSessions() {
    return this.sessionsService.getActiveSessions();
  }

  @Get('active/:computerId')
  async getActiveSessionForComputer(@Param('computerId') computerId: string) {
    return this.sessionsService.getActiveSession(computerId);
  }

  @Get('today')
  async getTodayStats() {
    return this.sessionsService.getTodayStats();
  }

  @Post()
  async createSession(@Body() body: { computerId: string; userId?: string }) {
    return this.sessionsService.createSession(body.computerId, body.userId);
  }

  @Patch(':id/start')
  async startSession(@Param('id') sessionId: string, @Body() body: { userId?: string }) {
    return this.sessionsService.startSession(sessionId, body.userId);
  }

  @Patch(':id/end')
  async endSession(@Param('id') sessionId: string, @Body() body: { userId?: string }) {
    const result = await this.sessionsService.endSession(sessionId, body.userId);
    return { updatedSession: result.updatedSession, totalCost: result.totalCost };
  }

  @Patch(':id/pause')
  async pauseSession(@Param('id') sessionId: string) {
    return this.sessionsService.pauseSession(sessionId);
  }

  @Patch(':id/resume')
  async resumeSession(@Param('id') sessionId: string) {
    return this.sessionsService.resumeSession(sessionId);
  }

  @Post(':id/cost')
  async calculateCost(@Param('id') sessionId: string) {
    return this.sessionsService.calculateCost(sessionId);
  }

  // New: fetch a single session by ID (used by agents after admin stop)
  @Get(':id')
  async getSessionById(@Param('id') sessionId: string) {
    return this.sessionsService.getSessionById(sessionId);
  }
}