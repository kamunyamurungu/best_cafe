import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SessionsService } from '../sessions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../generated/prisma';

@Controller('computer-sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComputerSessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('start')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async start(
    @Body() body: { userId?: string; computerId: string },
    @Req() req: { user: { id: string } },
  ) {
    const session = await this.sessionsService.createSession(
      body.computerId,
      body.userId,
      req.user.id,
    );
    return this.sessionsService.startSession(session.id, body.userId, req.user.id);
  }

  @Post(':id/end')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async end(@Param('id') sessionId: string, @Req() req: { user: { id: string } }) {
    return this.sessionsService.endSession(sessionId, req.user.id);
  }
}
