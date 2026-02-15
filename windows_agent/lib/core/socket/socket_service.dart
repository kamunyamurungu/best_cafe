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
import '../print/print_spooler_listener.dart';
import '../errors/app_error.dart';
import '../errors/error_mapper.dart';

class SocketService {
  late io.Socket socket;
  final AgentStateNotifier stateNotifier;
  final void Function(Object error)? onError;
  String? computerId;
  Timer? _heartbeatTimer;
  PrintSpoolerListener? _printListener;

  SocketService(this.stateNotifier, {this.onError});

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
      _printListener?.stop();
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
      _printListener ??= PrintSpoolerListener(
        getComputerId: () async => computerId,
        onError: onError,
      );
      _printListener?.start();
      await _reportPrinters();
    });

    socket.on('error', (data) {
      if (kDebugMode) {
        print('Error: ${data['message']}');
      }
      onError?.call(
        AppError(
          type: AppErrorType.network,
          message: 'Connection error. Please try again.',
        ),
      );
      stateNotifier.setState(AgentState.error);
    });

    socket.on('session_updated', (data) async {
      try {
        // Only react to updates for THIS computer
        final cid = data['computerId']?.toString() ?? data['session']?['computerId']?.toString();
        if (cid == null || cid != computerId) return;

        // Support nested payloads where session data is under 'session'
        final Map<String, dynamic> s =
            (data['session'] is Map<String, dynamic>) ? Map<String, dynamic>.from(data['session']) : Map<String, dynamic>.from(data as Map);

        final status = (s['status'] ?? data['status'])?.toString().toUpperCase();
        if (status == 'ENDED') {
          T? getFirst<T>(Map<String, dynamic> m, List<String> keys) {
            for (final k in keys) {
              final v = m[k];
              if (v != null) return v as T?;
            }
            return null;
          }

          double? parseDouble(dynamic v) {
            if (v == null) return null;
            if (v is num) return v.toDouble();
            return double.tryParse(v.toString());
          }

          int? parseInt(dynamic v) {
            if (v == null) return null;
            if (v is num) return v.toInt();
            return int.tryParse(v.toString());
          }

          // Extract values from nested or top-level
          final dynamic costRaw = getFirst(s, ['totalCost', 'cost', 'total_cost', 'amount', 'amountKsh', 'amountKES']) ??
              getFirst(data, ['totalCost', 'cost', 'total_cost', 'amount', 'amountKsh', 'amountKES']);
            final dynamic minutesRaw = getFirst(s, ['totalMinutes', 'durationMinutes', 'minutes', 'total_minutes', 'duration_minutes', 'billedMinutes', 'billingMinutes']) ??
              getFirst(data, ['totalMinutes', 'durationMinutes', 'minutes', 'total_minutes', 'duration_minutes', 'billedMinutes', 'billingMinutes']);
            final dynamic secondsRaw = getFirst(s, ['durationSeconds', 'seconds', 'totalSeconds']) ??
              getFirst(data, ['durationSeconds', 'seconds', 'totalSeconds']);
            final dynamic millisRaw = getFirst(s, ['durationMs', 'durationMillis', 'durationMilliseconds']) ??
              getFirst(data, ['durationMs', 'durationMillis', 'durationMilliseconds']);
          final String? startedAtStr = (getFirst(s, ['startedAt', 'started_at', 'startTime', 'start']))?.toString() ??
              (getFirst(data, ['startedAt', 'started_at', 'startTime', 'start']))?.toString();
          final String? endedAtStr = (getFirst(s, ['endedAt', 'ended_at', 'endTime', 'end']))?.toString() ??
              (getFirst(data, ['endedAt', 'ended_at', 'endTime', 'end']))?.toString();
          final String? sessionId = (getFirst(s, ['id', 'sessionId']))?.toString() ?? (getFirst(data, ['id', 'sessionId']))?.toString();

          double? totalCost = parseDouble(costRaw);
          int? minutes = parseInt(minutesRaw);
          int secondsForStore = 0;
          int? seconds = parseInt(secondsRaw);
          int? millis = parseInt(millisRaw);

          // If seconds/millis exist, compute ceil minutes
          if ((minutes == null || minutes <= 0)) {
            if (seconds != null && seconds > 0) {
              minutes = ((seconds + 59) / 60).floor();
              secondsForStore = seconds;
            } else if (millis != null && millis > 0) {
              final int secs = (millis / 1000).round();
              minutes = ((secs + 59) / 60).floor();
              secondsForStore = secs;
            }
          }

          // Fallback compute from timestamps if minutes missing
          if ((minutes == null || minutes <= 0) && startedAtStr != null && endedAtStr != null) {
            final startedAt = DateTime.tryParse(startedAtStr);
            final endedAt = DateTime.tryParse(endedAtStr);
            if (startedAt != null && endedAt != null) {
              final int secs = endedAt.difference(startedAt).inSeconds;
              minutes = ((secs + 59) / 60).floor();
              secondsForStore = secs;
            }
          }

          // Final fallback: fetch by session id if available
          if ((totalCost == null || minutes == null || minutes <= 0) && sessionId != null) {
            try {
              final url = '${await Config.serverUrl}/sessions/$sessionId';
              final resp = await http.get(Uri.parse(url));
              if (resp.statusCode == 200 && resp.body.isNotEmpty) {
                final m = jsonDecode(resp.body) as Map<String, dynamic>;
                totalCost = totalCost ?? parseDouble(getFirst(m, ['totalCost', 'cost', 'total_cost']));
                minutes = minutes ?? parseInt(getFirst(m, ['totalMinutes', 'durationMinutes', 'billedMinutes']));
                if (minutes == null || minutes <= 0) {
                  final sa = (getFirst(m, ['startedAt', 'started_at']))?.toString();
                  final ea = (getFirst(m, ['endedAt', 'ended_at']))?.toString();
                  final sdt = sa != null ? DateTime.tryParse(sa) : null;
                  final edt = ea != null ? DateTime.tryParse(ea) : null;
                  if (sdt != null && edt != null) {
                    final int secs = edt.difference(sdt).inSeconds;
                    minutes = ((secs + 59) / 60).floor();
                    secondsForStore = secs;
                  }
                }
              }
            } catch (_) {}
          }

          // If cost is positive but minutes == 0, coerce to at least 1 minute to reflect billed time
          if ((minutes == null || minutes <= 0) && (totalCost ?? 0) > 0) {
            minutes = 1;
          }

          if (totalCost != null && minutes != null) {
            if (secondsForStore <= 0 && minutes > 0) {
              secondsForStore = minutes * 60;
            }
            await SessionSummaryStore.save(SessionSummary(minutes: minutes, cost: totalCost, seconds: secondsForStore));
          }
          _lockComputer();
        }
      } catch (e) {
        if (kDebugMode) print('session_updated handling error: $e');
        onError?.call(ErrorMapper.fromException(e));
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
        onError?.call(ErrorMapper.fromException(e));
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
      case 'PRINT_RELEASE':
        _handlePrintRelease(data);
        break;
      case 'PRINT_CANCEL':
        _handlePrintCancel(data);
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
          size: Size(460, 140),
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

  void _handlePrintRelease(Map<String, dynamic> data) {
    try {
      final printerName = data['printerName']?.toString();
      final jobId = int.tryParse(data['printJobId']?.toString() ?? '');
      if (printerName == null || jobId == null) return;
      PrintSpoolerListener.resumeJob(printerName, jobId);
    } catch (_) {}
  }

  void _handlePrintCancel(Map<String, dynamic> data) {
    try {
      final printerName = data['printerName']?.toString();
      final jobId = int.tryParse(data['printJobId']?.toString() ?? '');
      if (printerName == null || jobId == null) return;
      PrintSpoolerListener.cancelJob(printerName, jobId);
    } catch (_) {}
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

  Future<void> _reportPrinters() async {
    try {
      final cid = computerId;
      if (cid == null) return;
      final printers = PrintSpoolerListener.listPrintersStatic();
      if (printers.isEmpty) return;
      final url = '${await Config.serverUrl}/printers/report';
      await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'computerId': cid,
          'printers': printers.map((p) => {'name': p}).toList(),
        }),
      );
    } catch (e) {
      onError?.call(ErrorMapper.fromException(e));
    }
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