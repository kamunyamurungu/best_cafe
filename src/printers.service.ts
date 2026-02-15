import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrintersService {
  constructor(private prisma: PrismaService) {}

  async reportPrinters(data: {
    computerId: string;
    printers: { name: string; isDefault?: boolean }[];
  }) {
    const computer = await this.prisma.computer.findUnique({
      where: { id: data.computerId },
    });
    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    const names = data.printers.map((p) => p.name);
    await this.prisma.printer.updateMany({
      where: { computerId: data.computerId },
      data: { isDefault: false },
    });

    for (const printer of data.printers) {
      await this.prisma.printer.upsert({
        where: {
          computerId_name: {
            computerId: data.computerId,
            name: printer.name,
          },
        },
        update: {
          isDefault: printer.isDefault ?? false,
        },
        create: {
          computerId: data.computerId,
          name: printer.name,
          isDefault: printer.isDefault ?? false,
        },
      });
    }

    // Remove printers no longer present
    await this.prisma.printer.deleteMany({
      where: {
        computerId: data.computerId,
        name: { notIn: names },
      },
    });

    return this.prisma.printer.findMany({
      where: { computerId: data.computerId },
      orderBy: { name: 'asc' },
    });
  }

  async listPrinters(computerId?: string) {
    return this.prisma.printer.findMany({
      where: { computerId },
      orderBy: [{ computerId: 'asc' }, { name: 'asc' }],
    });
  }

  async setDefault(computerId: string, printerName: string) {
    const printer = await this.prisma.printer.findFirst({
      where: { computerId, name: printerName },
    });
    if (!printer) {
      throw new NotFoundException('Printer not found');
    }

    await this.prisma.printer.updateMany({
      where: { computerId },
      data: { isDefault: false },
    });

    return this.prisma.printer.update({
      where: { id: printer.id },
      data: { isDefault: true },
    });
  }
}
