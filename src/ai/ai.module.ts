import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SettingsModule } from '../settings/settings.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  imports: [SettingsModule],
  controllers: [AiController],
  providers: [AiService, PrismaService],
  exports: [AiService],
})
export class AiModule {}
