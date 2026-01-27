import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { email: string; password: string; role: string; cyberCenterId?: string }) {
    // Hash password, but for now, store plain (not secure)
    return this.prisma.user.create({
      data: {
        email: body.email,
        passwordHash: body.password, // TODO: hash
        role: body.role as any,
        cyberCenterId: body.cyberCenterId,
      },
    });
  }

  @Get()
  async findAll() {
    return this.prisma.user.findMany({
      include: { cyberCenter: true },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { cyberCenter: true },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { email?: string; password?: string; role?: string; balance?: number }) {
    const data: any = {};
    if (body.email) data.email = body.email;
    if (body.password) data.passwordHash = body.password; // TODO: hash
    if (body.role) data.role = body.role;
    if (body.balance !== undefined) data.balance = body.balance;
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}