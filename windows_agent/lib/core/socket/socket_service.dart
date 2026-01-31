import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:flutter/foundation.dart';
import 'package:window_manager/window_manager.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';
import 'dart:ui';
import '../config/config.dart';
import '../state/agent_state.dart';
import '../log/logger.dart';
import '../state/session_summary.dart';

class SocketService {
  late io.Socket socket;
  final AgentStateNotifier stateNotifier;
  String? computerId;
  Timer? _heartbeatTimer;

  SocketService(this.stateNotifier);

  void connect() async {
    final serverUrl = await Config.serverUrl;
    socket = io.io(serverUrl, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.onConnect((_) async {
      if (kDebugMode) {
        print('Connected to server');
      }
      await Logger.log('Socket connected');
      stateNotifier.setState(AgentState.connected);
      await _authenticate();
    });

    socket.onDisconnect((_) {
      if (kDebugMode) {
        print('Disconnected from server');
      }
       Logger.log('Socket disconnected');
      _heartbeatTimer?.cancel();
      stateNotifier.setState(AgentState.disconnected);
    });

    socket.on('command', (data) {
      _handleCommand(data);
    });

    socket.on('auth_ok', (data) async {
      if (kDebugMode) {
        print('Authenticated');
        print('Computer ID: ${data['computerId']}');
      }
      await Logger.log('Auth OK: $data');
      computerId = data['computerId'];
      final token = data['deviceToken'];
      await Config.setDeviceToken(token);
      await _fetchSession();
      _startHeartbeat();
    });

    socket.on('error', (data) {
      if (kDebugMode) {
        print('Error: ${data['message']}');
      }
      stateNotifier.setState(AgentState.error);
    });

    socket.on('session_updated', (data) async {
      try {
        // Only react to updates for THIS computer
        final cid = data['computerId']?.toString();
        if (cid == null || cid != computerId) return;

        final status = data['status']?.toString().toUpperCase();
        if (status == 'ENDED') {
          final dynamic totalCostRaw = data['totalCost'];
          final dynamic minutesRaw = data['durationMinutes'];
          final double? totalCost = totalCostRaw is num
              ? totalCostRaw.toDouble()
              : double.tryParse(totalCostRaw?.toString() ?? '');
          final int? minutes = minutesRaw is num
              ? minutesRaw.toInt()
              : int.tryParse(minutesRaw?.toString() ?? '');
          if (totalCost != null && minutes != null) {
            await SessionSummaryStore.save(SessionSummary(minutes: minutes, cost: totalCost));
          }
          _lockComputer();
        }
      } catch (e) {
        if (kDebugMode) print('session_updated handling error: $e');
      }
    });

    socket.connect();
  }

  Future<void> _authenticate() async {
    try {
      final token = await Config.deviceToken;
      if (token.isNotEmpty) {
        await Logger.log('Sending hello with deviceToken');
        final name = Config.computerName;
        socket.emit('hello', {
          'name': name,
          'deviceToken': token,
        });
        return;
      }
    } catch (_) {}
    final name = Config.computerName;
    await Logger.log('Sending hello for computer: $name');
    socket.emit('hello', {'name': name});
  }

  Future<void> _fetchSession() async {
    if (computerId != null) {
      try {
        final url = '${await Config.serverUrl}/sessions/active/$computerId';
        if (kDebugMode) print('Fetching session from: $url');
        await Logger.log('Fetching session from: $url');
        final response = await http.get(
          Uri.parse(url),
        );
        if (kDebugMode) print('Session response: ${response.statusCode} ${response.body}');
        await Logger.log('Session response: ${response.statusCode} bodyLength=${response.body.length}');
        if (response.statusCode == 200) {
          final body = response.body.trim();
          if (body.isEmpty || body == 'null') {
            stateNotifier.setState(AgentState.locked);
          } else {
            Map<String, dynamic> session;
            try {
              session = jsonDecode(body);
            } catch (e) {
              await Logger.log('JSON decode error: $e');
              stateNotifier.setState(AgentState.locked);
              return;
            }
            if (session['startedAt'] != null) {
              stateNotifier.setState(AgentState.unlocked);
            } else {
              stateNotifier.setState(AgentState.locked);
            }
          }
        } else {
          stateNotifier.setState(AgentState.locked);
        }
      } catch (e) {
        if (kDebugMode) print('Error fetching session: $e');
        await Logger.log('Error fetching session: $e');
        stateNotifier.setState(AgentState.locked);
      }
    } else {
      if (kDebugMode) print('Computer ID is null');
      await Logger.log('Computer ID is null during _fetchSession');
      stateNotifier.setState(AgentState.locked);
    }
  }

  void sendHeartbeat() async {
    final token = await Config.deviceToken;
    socket.emit('heartbeat', {'deviceToken': token});
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
    if (!kDebugMode) {
      await windowManager.waitUntilReadyToShow(
        const WindowOptions(
          fullScreen: true,
          alwaysOnTop: true,
          skipTaskbar: false,
        ),
        () async {
          await windowManager.setClosable(false);
          await windowManager.show();
          await windowManager.focus();
        },
      );
    }
    stateNotifier.setState(AgentState.locked);
  }

  void _unlockComputer() async {
    if (!kDebugMode) {
      await windowManager.waitUntilReadyToShow(
        const WindowOptions(
          size: Size(320, 80),
          alwaysOnTop: true,
          skipTaskbar: false,
          fullScreen: false,
        ),
        () async {
          await windowManager.setPosition(const Offset(20, 20));
          await windowManager.setClosable(false);
          await windowManager.show();
          await windowManager.focus();
        },
      );
    }
    stateNotifier.setState(AgentState.unlocked);
  }

  void reconnect() async {
    final token = await Config.deviceToken;
    socket.emit('reconnect', {'deviceToken': token});
  }

  void _startHeartbeat() async {
    _heartbeatTimer?.cancel();
    _heartbeatTimer = Timer.periodic(const Duration(seconds: 20), (_) async {
      try {
        await Logger.log('Sending heartbeat');
        sendHeartbeat();
      } catch (_) {}
    });
  }

  void sendAdminUnlock(String password) {
    socket.emit('admin_unlock', {'password': password});
  }

  void disconnect() {
    socket.disconnect();
  }

  Future<bool> applyServerUrl(String url) async {
    try {
      _heartbeatTimer?.cancel();
      try {
        socket.dispose();
      } catch (_) {
        try { socket.disconnect(); } catch (_) {}
      }
    } catch (_) {}

    await Config.setServerUrl(url);
    stateNotifier.setState(AgentState.disconnected);

    // Start a fresh connection
    connect();

    // Wait up to 6 seconds for a connection state
    const attempts = 12;
    for (int i = 0; i < attempts; i++) {
      await Future.delayed(const Duration(milliseconds: 500));
      final s = stateNotifier.state;
      if (s == AgentState.connected || s == AgentState.locked || s == AgentState.unlocked) {
        return true;
      }
      if (s == AgentState.error) return false;
    }
    return false;
  }
}