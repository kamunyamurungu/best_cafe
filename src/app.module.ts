import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { PricingController } from './pricing.controller';
import { PrintPricingController } from './print-pricing.controller';
import { CyberCentersController } from './cyber-centers.controller';
import { UsersController } from './users.controller';
import { SocketsGateway } from './sockets.gateway';
import { AuthModule } from './auth/auth.module';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { PrintJobsController } from './print-jobs.controller';
import { PrintJobsService } from './print-jobs.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { PrintServerListenerService } from './print-server-listener.service';
import { PrintersController } from './printers.controller';
import { PrintersService } from './printers.service';
import { SnmpController } from './snmp.controller';
import { SnmpService } from './snmp.service';
import { AiModule } from './ai/ai.module';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { GovServicesModule } from './gov-services/gov-services.module';
import { ShortcutsModule } from './shortcuts/shortcuts.module';
import { AuditService } from './audit/audit.service';
import { UsersService } from './users/users.service';
import { ComputerSessionsController } from './computer-sessions/computer-sessions.controller';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule, AiModule, GovServicesModule, ShortcutsModule],
  controllers: [
    AppController,
    SessionsController,
    ComputersController,
    CommandsController,
    PricingController,
    PrintPricingController,
    PrintJobsController,
    TransactionsController,
    ReceiptsController,
    PrintersController,
    SnmpController,
    RecordsController,
    CyberCentersController,
    UsersController,
    ComputerSessionsController,
  ],
  providers: [
    AppService,
    PrismaService,
    SessionsService,
    ComputersService,
    CommandsService,
    SocketsGateway,
    ScheduledTasksService,
    PrintJobsService,
    TransactionsService,
    ReceiptsService,
    PrintServerListenerService,
    PrintersService,
    SnmpService,
    RecordsService,
    AuditService,
    UsersService,
  ],
})
export class AppModule {}
