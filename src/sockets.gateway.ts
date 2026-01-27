import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Inject, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ComputersService } from './computers.service';
import { SessionsService } from './sessions.service';
import { CommandsService } from './commands.service';

@WebSocketGateway({ cors: true })
export class SocketsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private computersService: ComputersService,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
    private commandsService: CommandsService,
  ) {}

  @SubscribeMessage('hello')
  async handleHello(
    @MessageBody() data: { deviceToken: string; name?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const computer = await this.computersService.registerComputer(
        data.deviceToken,
        data.name,
      );

      // Store computer ID in socket for later use
      client.data.computerId = computer.id;

      client.emit('auth_ok', { computerId: computer.id });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('heartbeat') // Ensure this handles session updates

  async handleHeartbeat(
    @MessageBody() data: { deviceToken: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.computersService.handleHeartbeat(data.deviceToken);
      client.emit('heartbeat_ack');
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('reconnect')
  async handleReconnect(
    @MessageBody() data: { deviceToken: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.computersService.resolveStateOnReconnect(
        data.deviceToken,
      );

      client.data.computerId = result.computerId;
      client.emit('command', { command: result.command });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('command_ack')
  async handleCommandAck(
    @MessageBody() data: { commandId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.commandsService.markCommandAcked(data.commandId);
      client.emit('command_ack_ok');
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('admin_unlock')
  async handleAdminUnlock(
    @MessageBody() data: { password: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const computerId = client.data.computerId;
      if (!computerId) {
        throw new Error('Computer not authenticated');
      }
      const command = await this.commandsService.adminUnlock(computerId, data.password);
      client.emit('command', { command: 'UNLOCK', commandId: command.id });
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }

  // Methods to send commands to specific computers
  async sendCommandToComputer(computerId: string, command: string, data?: any) {
    const sockets = await this.server.fetchSockets();
    const computerSocket = sockets.find(
      (socket) => socket.data.computerId === computerId,
    );

    if (computerSocket) {
      computerSocket.emit('command', { command, ...data });
    }

    // Emit to all admin clients
    this.server.emit('computer_command_sent', { computerId, command, ...data });
  }

  async unlockComputer(computerId: string) {
    // Create command record
    const cmd = await this.commandsService.createCommand(computerId, 'UNLOCK');
    await this.sendCommandToComputer(computerId, 'UNLOCK', { commandId: cmd.id });
  }

  async lockComputer(computerId: string) {
    // Create command record
    const cmd = await this.commandsService.createCommand(computerId, 'LOCK');
    await this.sendCommandToComputer(computerId, 'LOCK', { commandId: cmd.id });
  }
}