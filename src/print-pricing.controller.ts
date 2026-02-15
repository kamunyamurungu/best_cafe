import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrintPricingType } from './billing.enums';

@Controller('print-pricing')
export class PrintPricingController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() body: { type: PrintPricingType; pricePerPage: number }) {
    return this.prisma.printPricing.create({
      data: {
        type: body.type,
        pricePerPage: body.pricePerPage,
      },
    });
  }

  @Get()
  async findAll(@Query('type') type?: PrintPricingType) {
    return this.prisma.printPricing.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('latest/:type')
  async getLatest(@Param('type') type: PrintPricingType) {
    return this.prisma.printPricing.findFirst({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { pricePerPage?: number }) {
    return this.prisma.printPricing.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.printPricing.delete({
      where: { id },
    });
  }
}
