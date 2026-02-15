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

  // Handle socket disconnects (computers)
  async handleDisconnect(client: Socket) {
    const computerId = client.data.computerId as string | undefined;
    if (!computerId) return;
    try {
      // Pause any active session and lock immediately
      await this.sessionsService.pauseActiveSessionForComputer(computerId);
      await this.computersService.updateStatus(computerId, 'OFFLINE' as any);
      // Notify admin dashboards only
      await this.emitToAdmins('computer_status_changed', {
        computerId,
        status: 'OFFLINE',
      });
    } catch (e) {
      // Swallow errors to avoid crashing on disconnect
    }
  }

  @SubscribeMessage('hello')
  async handleHello(
    @MessageBody() data: { name: string; deviceToken?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!data.name) throw new Error('Computer name is required');
      const computer = await this.computersService.registerComputer(data.name, data.deviceToken);
      if (!computer) {
        throw new Error('Computer registration failed');
      }

      // Store computer ID in socket for later use
      client.data.computerId = computer.id;

      client.emit('auth_ok', { computerId: computer.id, deviceToken: computer.deviceToken });

      // If a session is already active, notify the agent immediately
      try {
        const activeSession = await this.sessionsService.getActiveSession(computer.id);
        if (activeSession) {
          client.emit('session_updated', {
            sessionId: activeSession.id,
            computerId: computer.id,
            status: 'ACTIVE',
            session: activeSession,
            startedAt: activeSession.startedAt,
            pausedMillis: activeSession.pausedMillis,
          });
        }
      } catch (_) {
        // best-effort
      }
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
      client.emit('command', { command: result.command, session: result.session });
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
      // Also notify admin dashboards so they update immediately (admins only)
      this.emitToAdmins('computer_command_sent', { computerId, command: 'UNLOCK', commandId: command.id });
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

    // Emit to admin clients only (avoid computers reacting to broadcast)
    this.emitToAdmins('computer_command_sent', { computerId, command, ...data });
  }

  async unlockComputer(computerId: string, data?: any) {
    // Create command record
    const cmd = await this.commandsService.createCommand(computerId, 'UNLOCK');
    await this.sendCommandToComputer(computerId, 'UNLOCK', { commandId: cmd.id, ...data });
  }

  async lockComputer(computerId: string) {
    // Create command record
    const cmd = await this.commandsService.createCommand(computerId, 'LOCK');
    await this.sendCommandToComputer(computerId, 'LOCK', { commandId: cmd.id });
  }

  // Helper: emit events to admin dashboard sockets only
  async emitToAdmins(event: string, payload: any) {
    try {
      const sockets = await this.server.fetchSockets();
      for (const socket of sockets) {
        // Admin dashboards should not have computerId set on their socket
        if (!socket.data?.computerId) {
          socket.emit(event, payload);
        }
      }
    } catch (e) {
      // Best-effort; avoid throwing from broadcast helpers
    }
  }

  // Helper: emit a specific event to a single computer socket
  async emitToComputer(computerId: string, event: string, payload: any) {
    try {
      const sockets = await this.server.fetchSockets();
      const computerSocket = sockets.find((socket) => socket.data.computerId === computerId);
      if (computerSocket) {
        computerSocket.emit(event, payload);
      }
    } catch (e) {
      // best-effort
    }
  }
}