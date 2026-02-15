import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async register(
    @Body()
    body: {
      fullName: string;
      email?: string;
      phone?: string;
      password: string;
      role?: UserRole;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('bootstrap')
  async bootstrap(
    @Body()
    body: {
      fullName: string;
      email?: string;
      phone?: string;
      password: string;
    },
  ) {
    return this.authService.bootstrapAdmin(body);
  }

  @Post('login')
  async login(@Body() body: { email?: string; identifier?: string; password: string }) {
    const identifier = body.identifier ?? body.email ?? '';
    return this.authService.login(identifier, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('top-up')
  async topUp(@Request() req, @Body() body: { amount: number }) {
    return this.authService.topUp(req.user.id, body.amount);
  }
}