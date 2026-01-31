import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:flutter/foundation.dart';
import 'config_service.dart';

class AdminSocketService {
  late io.Socket socket;
  final void Function(
    String computerId,
    String status,
    Map<String, dynamic> data,
  )
  onComputerStatusChange;
  final void Function(Map<String, dynamic> data) onSessionUpdated;
  final void Function(
    String computerId,
    String command,
    Map<String, dynamic> data,
  )
  onComputerCommand;

  AdminSocketService({
    required this.onComputerStatusChange,
    required this.onSessionUpdated,
    required this.onComputerCommand,
  });

  Future<void> connect() async {
    final serverUrl = await ConfigService.getServerUrl();
    socket = io.io(serverUrl, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.onConnect((_) {
      if (kDebugMode) {
        print('Admin connected to server');
      }
    });

    socket.onDisconnect((_) {
      if (kDebugMode) {
        print('Admin disconnected from server');
      }
    });

    socket.on('computer_status_changed', (data) {
      if (kDebugMode) {
        print('Computer status changed: $data');
      }
      try {
        final id = data['computerId']?.toString() ?? '';
        final status = data['status']?.toString() ?? '';
        onComputerStatusChange(id, status, Map<String, dynamic>.from(data));
      } catch (_) {
        // Fallback to reload
        // ignore: deprecated_member_use
      }
    });

    socket.on('computer_command_sent', (data) {
      if (kDebugMode) {
        print('Command sent to computer: $data');
      }
      try {
        final id = data['computerId']?.toString() ?? '';
        final command = data['command']?.toString() ?? '';
        onComputerCommand(id, command, Map<String, dynamic>.from(data));
      } catch (_) {}
    });

    socket.on('session_updated', (data) {
      if (kDebugMode) {
        print('Session updated: $data');
      }
      try {
        onSessionUpdated(Map<String, dynamic>.from(data));
      } catch (_) {}
    });

    socket.connect();
  }

  void disconnect() {
    socket.disconnect();
  }
}
