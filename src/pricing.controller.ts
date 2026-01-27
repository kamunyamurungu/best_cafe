import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { pricePerMinute: number; active?: boolean }) {
    return this.prisma.pricing.create({
      data: {
        pricePerMinute: body.pricePerMinute,
        active: body.active ?? false,
      },
    });
  }

  @Get()
  async findAll() {
    return this.prisma.pricing.findMany();
  }

  @Get('active')
  async findActive() {
    return this.prisma.pricing.findFirst({
      where: { active: true },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { pricePerMinute?: number; active?: boolean }) {
    return this.prisma.pricing.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.pricing.delete({
      where: { id },
    });
  }
}