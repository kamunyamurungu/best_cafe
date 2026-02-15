import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { UserRole, UserStatus } from './generated/prisma';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(
    @Body()
    body: {
      fullName: string;
      email?: string;
      phone?: string;
      password: string;
      role: UserRole;
      status?: UserStatus;
      cyberCenterId?: string;
      admissionNo?: string;
      studentBalance?: number;
      discountRate?: number | null;
    },
    @Req() req: { user: { id: string } },
  ) {
    return this.usersService.createUser(body, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.usersService.listUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: { user: { id: string } }) {
    return this.usersService.getMe(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @Req() req: { user: { id: string } },
    @Body()
    body: { fullName?: string; email?: string | null; phone?: string | null; password?: string },
  ) {
    return this.usersService.updateMe(req.user.id, body);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      fullName?: string;
      email?: string | null;
      phone?: string | null;
      password?: string;
      role?: UserRole;
      status?: UserStatus;
      cyberCenterId?: string | null;
      admissionNo?: string | null;
      studentBalance?: number;
      discountRate?: number | null;
    },
    @Req() req: { user: { id: string } },
  ) {
    return this.usersService.updateUser(id, body, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.usersService.deleteUser(id, req.user.id);
  }
}