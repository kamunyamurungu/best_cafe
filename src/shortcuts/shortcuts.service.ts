import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ShortcutType, UserRole } from '../generated/prisma';
import { PrismaService } from '../prisma.service';
import { TransactionsService } from '../transactions.service';
import { TransactionType } from '../billing.enums';
import { CreateShortcutDto } from './dto/create-shortcut.dto';
import { UpdateShortcutDto } from './dto/update-shortcut.dto';

@Injectable()
export class ShortcutsService {
  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
  ) {}

  async listShortcuts(role: UserRole) {
    const isAdmin = role === UserRole.ADMIN;
    return this.prisma.shortcut.findMany({
      where: isAdmin ? undefined : { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createShortcut(dto: CreateShortcutDto) {
    this.ensurePrice(dto.price);

    return this.prisma.shortcut.create({
      data: {
        name: dto.name,
        type: dto.type,
        target: dto.target,
        icon: dto.icon,
        imageUrl: dto.imageUrl,
        price: dto.price ?? null,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateShortcut(id: string, dto: UpdateShortcutDto) {
    const existing = await this.prisma.shortcut.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Shortcut not found');
    }

    const price = dto.price === null ? null : dto.price ?? existing.price;
    this.ensurePrice(price);

    return this.prisma.shortcut.update({
      where: { id },
      data: {
        name: dto.name,
        type: dto.type,
        target: dto.target,
        icon: dto.icon === null ? null : dto.icon,
        imageUrl: dto.imageUrl === null ? null : dto.imageUrl,
        price: dto.price === undefined ? undefined : dto.price,
        isActive: dto.isActive,
      },
    });
  }

  async useShortcut(id: string, staffId: string) {
    const shortcut = await this.prisma.shortcut.findUnique({ where: { id } });
    if (!shortcut) {
      throw new NotFoundException('Shortcut not found');
    }
    if (!shortcut.isActive) {
      throw new BadRequestException('Shortcut is inactive');
    }

    let resolvedTarget = shortcut.target;

    if (shortcut.type === ShortcutType.GOV_SERVICE) {
      const service = await this.prisma.govService.findUnique({
        where: { id: shortcut.target },
      });
      if (!service) {
        throw new NotFoundException('Government service not found');
      }
      if (!service.isActive) {
        throw new BadRequestException('Government service is inactive');
      }
      resolvedTarget = service.officialUrl;
    }

    let transactionId: string | undefined;

    if (shortcut.price && shortcut.price > 0) {
      const transaction = await this.transactionsService.createManualTransaction({
        description: `Quick link: ${shortcut.name}`,
        amount: shortcut.price,
        type: TransactionType.SERVICE,
        referenceId: shortcut.id,
        createdById: staffId,
      });
      transactionId = transaction.id;
    }

    return {
      shortcutId: shortcut.id,
      type: shortcut.type,
      target: shortcut.target,
      resolvedTarget,
      price: shortcut.price,
      imageUrl: shortcut.imageUrl,
      transactionId,
    };
  }

  private ensurePrice(price?: number | null) {
    if (price === undefined || price === null) {
      return;
    }

    if (price < 0) {
      throw new BadRequestException('price must be zero or greater');
    }
  }
}
