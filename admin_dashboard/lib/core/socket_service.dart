import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:flutter/foundation.dart';
import 'config_service.dart';

class AdminSocketService {
  late io.Socket socket;
  final Function onComputerUpdate;
  final Function onSessionUpdate;

  AdminSocketService({
    required this.onComputerUpdate,
    required this.onSessionUpdate,
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
      onComputerUpdate();
    });

    socket.on('computer_command_sent', (data) {
      if (kDebugMode) {
        print('Command sent to computer: $data');
      }
      onComputerUpdate();
    });

    socket.on('session_updated', (data) {
      if (kDebugMode) {
        print('Session updated: $data');
      }
      onSessionUpdate();
    });

    socket.connect();
  }

  void disconnect() {
    socket.disconnect();
  }
}