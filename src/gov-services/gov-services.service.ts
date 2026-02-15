import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GovPricingModel, UserRole } from '../generated/prisma';
import { PrismaService } from '../prisma.service';
import { TransactionsService } from '../transactions.service';
import { TransactionType } from '../billing.enums';
import { CreateGovServiceDto } from './dto/create-gov-service.dto';
import { UpdateGovServiceDto } from './dto/update-gov-service.dto';

@Injectable()
export class GovServicesService {
  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
  ) {}

  async createService(dto: CreateGovServiceDto) {
    this.ensurePricing(dto.pricingModel, dto.unitPrice);

    return this.prisma.govService.create({
      data: {
        name: dto.name,
        category: dto.category,
        officialUrl: dto.officialUrl,
        description: dto.description,
        pricingModel: dto.pricingModel,
        unitPrice: dto.pricingModel === GovPricingModel.FREE ? null : dto.unitPrice,
        icon: dto.icon,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateService(id: string, dto: UpdateGovServiceDto) {
    const existing = await this.prisma.govService.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Government service not found');
    }

    const pricingModel = dto.pricingModel ?? existing.pricingModel;
    const unitPrice = dto.unitPrice ?? existing.unitPrice ?? undefined;
    this.ensurePricing(pricingModel, unitPrice);

    return this.prisma.govService.update({
      where: { id },
      data: {
        name: dto.name,
        category: dto.category,
        officialUrl: dto.officialUrl,
        description: dto.description === null ? null : dto.description,
        pricingModel: dto.pricingModel,
        unitPrice:
          pricingModel === GovPricingModel.FREE
            ? null
            : dto.unitPrice ?? undefined,
        icon: dto.icon === null ? null : dto.icon,
        isActive: dto.isActive,
      },
    });
  }

  async listServices(role: UserRole) {
    const isAdmin = role === UserRole.ADMIN;
    return this.prisma.govService.findMany({
      where: isAdmin ? undefined : { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async startUsage(serviceId: string, staffId: string) {
    const service = await this.prisma.govService.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException('Government service not found');
    }
    if (!service.isActive) {
      throw new BadRequestException('Service is inactive');
    }

    const usage = await this.prisma.govServiceUsage.create({
      data: {
        govServiceId: service.id,
        staffId,
      },
    });

    let transactionId: string | undefined;

    if (service.pricingModel === GovPricingModel.FLAT) {
      this.ensurePricing(service.pricingModel, service.unitPrice ?? undefined);
      const transaction = await this.transactionsService.createManualTransaction({
        description: `Government service: ${service.name}`,
        amount: service.unitPrice as number,
        type: TransactionType.SERVICE,
        referenceId: usage.id,
        createdById: staffId,
      });

      await this.prisma.govServiceUsage.update({
        where: { id: usage.id },
        data: { transactionId: transaction.id },
      });
      transactionId = transaction.id;
    }

    return {
      usageId: usage.id,
      startedAt: usage.startedAt,
      officialUrl: service.officialUrl,
      pricingModel: service.pricingModel,
      unitPrice: service.unitPrice,
      transactionId,
    };
  }

  async endUsage(usageId: string, staffId: string) {
    const usage = await this.prisma.govServiceUsage.findUnique({
      where: { id: usageId },
      include: { govService: true },
    });

    if (!usage) {
      throw new NotFoundException('Usage not found');
    }
    if (usage.endedAt) {
      throw new BadRequestException('Usage already ended');
    }
    if (usage.staffId !== staffId) {
      throw new ForbiddenException('Not allowed to end this usage');
    }

    if (usage.govService.pricingModel !== GovPricingModel.PER_MINUTE) {
      throw new BadRequestException('Usage is not per-minute');
    }

    this.ensurePricing(usage.govService.pricingModel, usage.govService.unitPrice ?? undefined);

    const now = new Date();
    const durationMs = now.getTime() - usage.startedAt.getTime();
    const minutes = Math.max(1, Math.ceil(durationMs / 60000));
    const amount = minutes * (usage.govService.unitPrice as number);

    const transaction = await this.transactionsService.createManualTransaction({
      description: `Government service: ${usage.govService.name}`,
      amount,
      type: TransactionType.SERVICE,
      referenceId: usage.id,
      createdById: staffId,
    });

    await this.prisma.govServiceUsage.update({
      where: { id: usage.id },
      data: {
        endedAt: now,
        transactionId: transaction.id,
      },
    });

    return {
      usageId: usage.id,
      minutes,
      amount,
      transactionId: transaction.id,
    };
  }

  async getActiveUsage(staffId: string) {
    return this.prisma.govServiceUsage.findMany({
      where: { staffId, endedAt: null },
      include: { govService: true },
      orderBy: { startedAt: 'desc' },
    });
  }

  private ensurePricing(pricingModel: GovPricingModel, unitPrice?: number) {
    if (pricingModel === GovPricingModel.FREE) {
      return;
    }

    if (unitPrice === undefined || unitPrice === null) {
      throw new BadRequestException('unitPrice is required for paid services');
    }

    if (unitPrice <= 0) {
      throw new BadRequestException('unitPrice must be greater than zero');
    }
  }
}
