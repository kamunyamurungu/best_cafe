import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:flutter/foundation.dart';
import 'package:window_manager/window_manager.dart';
import '../config/config.dart';
import '../state/agent_state.dart';

class SocketService {
  late io.Socket socket;
  final AgentStateNotifier stateNotifier;
  String? computerId;

  SocketService(this.stateNotifier);

  void connect() async {
    final serverUrl = await Config.serverUrl;
    socket = io.io(serverUrl, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.onConnect((_) {
      if (kDebugMode) {
        print('Connected to server');
      }
      stateNotifier.setState(AgentState.connected);
      _authenticate();
    });

    socket.onDisconnect((_) {
      if (kDebugMode) {
        print('Disconnected from server');
      }
      stateNotifier.setState(AgentState.disconnected);
    });

    socket.on('command', (data) {
      _handleCommand(data);
    });

    socket.on('auth_ok', (data) {
      if (kDebugMode) {
        print('Authenticated');
      }
      computerId = data['computerId'];
    });

    socket.on('error', (data) {
      if (kDebugMode) {
        print('Error: ${data['message']}');
      }
      stateNotifier.setState(AgentState.error);
    });

    socket.connect();
  }

  void _authenticate() {
    socket.emit('hello', {'deviceToken': Config.deviceToken});
  }

  void sendHeartbeat() {
    socket.emit('heartbeat', {'deviceToken': Config.deviceToken});
  }

  void _handleCommand(Map<String, dynamic> data) {
    String command = data['command'];
    switch (command) {
      case 'LOCK':
        _lockComputer();
        break;
      case 'UNLOCK':
        _unlockComputer();
        break;
      default:
        if (kDebugMode) {
          print('Unknown command: $command');
        }
    }
  }

  void _lockComputer() async {
    await windowManager.setFullScreen(true);
    await windowManager.setAlwaysOnTop(true);
    await windowManager.setSkipTaskbar(true);
    stateNotifier.setState(AgentState.locked);
  }

  void _unlockComputer() async {
    await windowManager.setFullScreen(false);
    await windowManager.setAlwaysOnTop(false);
    await windowManager.setSkipTaskbar(false);
    stateNotifier.setState(AgentState.unlocked);
  }

  void reconnect() {
    socket.emit('reconnect', {'deviceToken': Config.deviceToken});
  }

  void sendAdminUnlock(String password) {
    socket.emit('admin_unlock', {'password': password});
  }

  void disconnect() {
    socket.disconnect();
  }
}