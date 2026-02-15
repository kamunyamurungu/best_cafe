import { Module } from '@nestjs/common';
import { GovServicesController } from './gov-services.controller';
import { GovServicesService } from './gov-services.service';
import { PrismaService } from '../prisma.service';
import { TransactionsService } from '../transactions.service';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  controllers: [GovServicesController],
  providers: [GovServicesService, PrismaService, TransactionsService, RolesGuard],
})
export class GovServicesModule {}
