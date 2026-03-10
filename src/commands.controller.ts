import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { SocketsGateway } from './sockets.gateway';

@Controller('commands')
export class CommandsController {
  constructor(
    private readonly commandsService: CommandsService,
    private readonly socketsGateway: SocketsGateway,
  ) {}

  @Post()
  async createCommand(@Body() body: { computerId: string; type: string }) {
    return this.commandsService.createCommand(
      body.computerId,
      body.type as 'LOCK' | 'UNLOCK' | 'POWER_OFF',
    );
  }

  @Post('power-off')
  async powerOffComputer(@Body() body: { computerId: string }) {
    return this.socketsGateway.powerOffComputer(body.computerId);
  }

  @Post('power-off-all')
  async powerOffAllComputers() {
    return this.socketsGateway.powerOffAllComputers();
  }

  @Post('admin-unlock')
  async adminUnlock(@Body() body: { computerId: string; password: string }) {
    return this.commandsService.adminUnlock(body.computerId, body.password);
  }

  @Get('pending/:computerId')
  async getPendingCommands(@Param('computerId') computerId: string) {
    return this.commandsService.getPendingCommands(computerId);
  }

  @Post(':id/sent')
  async markSent(@Param('id') id: string) {
    return this.commandsService.markCommandSent(id);
  }

  @Post(':id/acked')
  async markAcked(@Param('id') id: string) {
    return this.commandsService.markCommandAcked(id);
  }
}