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
import { CyberCentersController } from './cyber-centers.controller';
import { UsersController } from './users.controller';
import { SocketsGateway } from './sockets.gateway';
import { AuthModule } from './auth/auth.module';
import { ScheduledTasksService } from './scheduled-tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule],
  controllers: [AppController, SessionsController, ComputersController, CommandsController, PricingController, CyberCentersController, UsersController],
  providers: [
    AppService,
    PrismaService,
    SessionsService,
    ComputersService,
    CommandsService,
    SocketsGateway,
    ScheduledTasksService,
  ],
})
export class AppModule {}
