import { Module } from '@nestjs/common';
import { ShortcutsController } from './shortcuts.controller';
import { ShortcutsService } from './shortcuts.service';
import { PrismaService } from '../prisma.service';
import { RolesGuard } from '../auth/roles.guard';
import { TransactionsService } from '../transactions.service';

@Module({
  controllers: [ShortcutsController],
  providers: [ShortcutsService, PrismaService, RolesGuard, TransactionsService],
})
export class ShortcutsModule {}
