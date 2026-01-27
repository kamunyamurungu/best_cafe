import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('cyber-centers')
export class CyberCentersController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { name: string; location?: string; organizationId: string }) {
    return this.prisma.cyberCenter.create({
      data: body,
    });
  }

  @Get()
  async findAll() {
    return this.prisma.cyberCenter.findMany({
      include: { organization: true },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.cyberCenter.findUnique({
      where: { id },
      include: { organization: true },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string; location?: string }) {
    return this.prisma.cyberCenter.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.cyberCenter.delete({
      where: { id },
    });
  }
}