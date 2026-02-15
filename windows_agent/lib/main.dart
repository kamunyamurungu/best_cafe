import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'package:window_manager/window_manager.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'core/log/logger.dart';
import 'core/config/config.dart';
import 'core/errors/error_mapper.dart';
import 'core/ui/error_handler.dart';
import 'core/socket/socket_service.dart';
import 'core/state/agent_state.dart';
import 'core/state/session_summary.dart';
import 'features/lock_screen/lock_screen.dart';

final GlobalKey<NavigatorState> appNavigatorKey = GlobalKey<NavigatorState>();

void main() {
  runZonedGuarded(
    () async {
      WidgetsFlutterBinding.ensureInitialized();
      await Logger.init();
      await windowManager.ensureInitialized();

      final stateNotifier = AgentStateNotifier();
      final socketService = SocketService(
        stateNotifier,
        onError: (error) {
          final ctx = appNavigatorKey.currentContext;
          if (ctx != null) {
            ErrorHandler.show(ctx, error);
          }
        },
      );

      FlutterError.onError = (FlutterErrorDetails details) async {
        FlutterError.dumpErrorToConsole(details);
        await Logger.log('FlutterError: ${details.exceptionAsString()}');
        await Logger.log('Stack: ${details.stack}');
      };

      runApp(
        MultiProvider(
          providers: [
            ChangeNotifierProvider.value(value: stateNotifier),
            Provider.value(value: socketService),
          ],
          child: const MyApp(),
        ),
      );

      socketService.connect();

      // Optional window setup can go here if needed
    },
    (error, stack) async {
      FlutterError.dumpErrorToConsole(
        FlutterErrorDetails(exception: error, stack: stack),
      );
      await Logger.log('Zone error: $error');
      await Logger.log('Stack: $stack');
    },
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      navigatorKey: appNavigatorKey,
      home: Consumer<AgentStateNotifier>(
        builder: (context, notifier, _) {
          final state = notifier.state;
          if (state == AgentState.locked) {
            return const LockScreen();
          }
          return const MiniOverlay();
        },
      ),
    );
  }
}

class MiniOverlay extends StatefulWidget {
  const MiniOverlay({super.key});

  @override
  State<MiniOverlay> createState() => _MiniOverlayState();
}

class _MiniOverlayState extends State<MiniOverlay> {
  Map<String, dynamic>? _session;
  DateTime? _sessionStart;
  DateTime? _fallbackStart;
  Duration _elapsed = Duration.zero;
  Timer? _timer;
  Timer? _sessionPollTimer;
  SocketService? _socketService;
  bool _socketListenersRegistered = false;
  String _debugLastEvent = '';
  String _debugLastFetch = '';

  @override
  void initState() {
    super.initState();
    _socketService = Provider.of<SocketService>(context, listen: false);
    _initSession();
    _registerSocketListeners();
    _startSessionPolling();
    _configureWindow();
  }

  void _registerSocketListeners() {
    if (_socketListenersRegistered) return;
    final socket = _socketService?.socket;
    if (socket == null) return;
    socket.on('auth_ok', _handleAuthOk);
    socket.on('session_updated', _handleSessionUpdated);
    socket.on('command', _handleCommand);
    _socketListenersRegistered = true;
  }

  void _handleAuthOk(dynamic _) {
    _setDebugEvent('auth_ok');
    _initSession();
  }

  void _handleSessionUpdated(dynamic data) {
    _setDebugEvent('session_updated');
    try {
      final status = (data is Map<String, dynamic>)
          ? (data['status'] ?? data['session']?['status'])?.toString()
          : null;
      if (status != null && status.toUpperCase() == 'ENDED') {
        return;
      }
      if (status != null && status.toUpperCase() == 'ACTIVE') {
        if (data is Map<String, dynamic>) {
          _applySessionData(data);
          return;
        }
      }
    } catch (_) {}
    _initSession();
  }

  void _handleCommand(dynamic data) {
    _setDebugEvent('command');
    try {
      if (data is Map<String, dynamic>) {
        final command = data['command']?.toString().toUpperCase();
        if (command == 'UNLOCK') {
          _applySessionData(data);
          if (_sessionStart == null) {
            if (!mounted) return;
            setState(() {
              _fallbackStart = DateTime.now();
              _elapsed = Duration.zero;
            });
            _startTimer();
            _initSession();
          }
        } else if (command == 'LOCK') {
          if (!mounted) return;
          setState(() {
            _session = null;
            _sessionStart = null;
            _fallbackStart = null;
            _elapsed = Duration.zero;
          });
        }
      }
    } catch (_) {}
  }

  void _applySessionData(Map<String, dynamic> data) {
    final dynamic sessionRaw = data['session'];
    final Map<String, dynamic> session = sessionRaw is Map<String, dynamic>
        ? Map<String, dynamic>.from(sessionRaw)
        : data;
    final String? startedAtStr = (session['startedAt'] ?? data['startedAt'])?.toString();
    final int pausedMillis = (session['pausedMillis'] ?? data['pausedMillis']) is num
        ? (session['pausedMillis'] ?? data['pausedMillis']) as int
        : int.tryParse((session['pausedMillis'] ?? data['pausedMillis'])?.toString() ?? '') ?? 0;
    final startedAt = startedAtStr != null ? DateTime.tryParse(startedAtStr) : null;
    if (startedAt == null) return;
    if (!mounted) return;
    setState(() {
      _session = session;
      _sessionStart = startedAt;
      _fallbackStart = null;
      final rawElapsed = DateTime.now().difference(startedAt);
      final adjusted = rawElapsed - Duration(milliseconds: pausedMillis);
      _elapsed = adjusted.isNegative ? Duration.zero : adjusted;
    });
    _startTimer();
  }

  void _setDebugEvent(String label) {
    if (!mounted) return;
    setState(() {
      _debugLastEvent = '${DateTime.now().toIso8601String().substring(11, 19)} $label';
    });
  }

  void _startSessionPolling() {
    _sessionPollTimer?.cancel();
    _sessionPollTimer = Timer.periodic(const Duration(seconds: 5), (_) {
      if (!mounted) return;
      _registerSocketListeners();
      if (_sessionStart == null) {
        _initSession();
      } else {
        _sessionPollTimer?.cancel();
      }
    });
  }

  Future<void> _configureWindow() async {
    await windowManager.waitUntilReadyToShow(
      const WindowOptions(
        size: Size(460, 160),
        alwaysOnTop: true,
        skipTaskbar: false,
        fullScreen: false,
        titleBarStyle: TitleBarStyle.hidden,
      ),
      () async {
        await windowManager.setMinimizable(true);
        await windowManager.setMaximizable(false);
        await windowManager.setResizable(false);
        await windowManager.setClosable(false);
        await windowManager.setPosition(const Offset(16, 16));
        await windowManager.show();
        await windowManager.focus();
        // Hide window buttons if supported
        try {
          await windowManager.setTitleBarStyle(
            TitleBarStyle.hidden,
            windowButtonVisibility: false,
          );
        } catch (_) {}
      },
    );
  }

  Future<void> _initSession() async {
    final cid = _socketService?.computerId;
    if (cid == null) return;
    try {
      final url = '${await Config.serverUrl}/sessions/active/$cid';
      final response = await http.get(Uri.parse(url));
      if (mounted) {
        setState(() {
          _debugLastFetch = 'GET active: ${response.statusCode}';
        });
      }
      if (response.statusCode == 200) {
        final body = response.body.trim();
        if (body.isNotEmpty && body != 'null') {
          Map<String, dynamic>? json;
          try {
            final decoded = jsonDecode(body);
            if (decoded is Map<String, dynamic>) {
              json = decoded;
            }
          } catch (e) {
            await Logger.log('Init session JSON decode error: $e');
          }
          final session = json;
          if (session == null) {
            return;
          }
          setState(() {
            _session = session;
            final startedAt = session['startedAt']?.toString();
            _sessionStart = startedAt != null
                ? DateTime.tryParse(startedAt)
                : null;
            _elapsed = _sessionStart != null
                ? DateTime.now().difference(_sessionStart!)
                : Duration.zero;
          });
          if (_sessionStart != null) {
            _sessionPollTimer?.cancel();
          }
          _startTimer();
        }
      }
    } catch (_) {}
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      final start = _sessionStart ?? _fallbackStart;
      if (start != null) {
        setState(() {
          _elapsed = DateTime.now().difference(start);
        });
      }
    });
  }

  @override
  void dispose() {
    final socket = _socketService?.socket;
    if (socket != null) {
      socket.off('auth_ok', _handleAuthOk);
      socket.off('session_updated', _handleSessionUpdated);
      socket.off('command', _handleCommand);
    }
    _socketListenersRegistered = false;
    _timer?.cancel();
    _sessionPollTimer?.cancel();
    super.dispose();
  }

  Future<void> _endSession() async {
    if (_session == null) {
      final socketService = Provider.of<SocketService>(context, listen: false);
      final cid = socketService.computerId;
      if (cid != null) {
        try {
          final response = await http.get(
            Uri.parse('${await Config.serverUrl}/sessions/active/$cid'),
          );
          if (response.statusCode == 200 &&
              response.body.trim().isNotEmpty &&
              response.body.trim() != 'null') {
            setState(() {
              _session = jsonDecode(response.body);
              final s = _session!['startedAt']?.toString();
              _sessionStart = s != null ? DateTime.tryParse(s) : null;
            });
          }
        } catch (_) {}
      }
      if (_session == null) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('No active session found.')),
        );
        return;
      }
    }

    try {
      final serverUrl = await Config.serverUrl;
      final response = await http.patch(
        Uri.parse('$serverUrl/sessions/${_session!['id']}/end'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({}),
      );
      await Logger.log(
        'End session response: ${response.statusCode} bodyLength=${response.body.length}',
      );
      if (!mounted) return;
      if (response.statusCode >= 200 && response.statusCode < 300) {
        double? totalCost;
        int minutes = _elapsed.inMinutes;
        int secs = _elapsed.inSeconds;

        final body = response.body.trim();
        if (body.isNotEmpty && body != 'null') {
          try {
            final decoded = jsonDecode(body);
            if (decoded is Map<String, dynamic>) {
              final sessionMap =
                  (decoded['updatedSession'] is Map<String, dynamic>)
                  ? Map<String, dynamic>.from(decoded['updatedSession'])
                  : decoded;
              final dynamic totalCostRaw =
                  decoded['totalCost'] ?? sessionMap['totalCost'];
              totalCost = totalCostRaw is num
                  ? totalCostRaw.toDouble()
                  : double.tryParse(totalCostRaw?.toString() ?? '');
              final dynamic totalMinutesRaw =
                  sessionMap['totalMinutes'] ??
                  sessionMap['durationMinutes'] ??
                  decoded['totalMinutes'];
              if (totalMinutesRaw is num) {
                minutes = totalMinutesRaw.toInt();
              } else {
                final String? startedAtStr = sessionMap['startedAt']
                    ?.toString();
                final String? endedAtStr = sessionMap['endedAt']?.toString();
                final startedAt = startedAtStr != null
                    ? DateTime.tryParse(startedAtStr)
                    : null;
                final endedAt = endedAtStr != null
                    ? DateTime.tryParse(endedAtStr)
                    : null;
                if (startedAt != null && endedAt != null) {
                  minutes = endedAt.difference(startedAt).inMinutes;
                  secs = endedAt.difference(startedAt).inSeconds;
                }
              }
            }
          } catch (e) {
            await Logger.log('End session JSON decode error: $e');
          }
        }

        if (totalCost != null) {
          if (secs <= 0) {
            secs = minutes * 60;
          }
          await SessionSummaryStore.save(
            SessionSummary(minutes: minutes, cost: totalCost, seconds: secs),
          );
        }

        final navContext = appNavigatorKey.currentContext;
        if (navContext != null) {
          showDialog(
            context: navContext,
            useRootNavigator: true,
            builder: (context) => AlertDialog(
              title: const Text('Session Ended'),
              content: Text(
                totalCost == null
                    ? 'Session ended successfully. Time: ${minutes} min.'
                    : 'Time: ${minutes} min. Total cost: Ksh ${totalCost.toStringAsFixed(2)}',
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('OK'),
                ),
              ],
            ),
          );
        } else {
          await Logger.log(
            'End session popup skipped: navigator context unavailable',
          );
        }
        // Auto-close after 10 seconds
        Future.delayed(const Duration(seconds: 10), () {
          if (!mounted) return;
          if (Navigator.of(context, rootNavigator: true).canPop()) {
            Navigator.of(context, rootNavigator: true).pop();
          }
        });
      } else {
        ErrorHandler.show(context, ErrorMapper.fromResponse(response));
      }
    } catch (e) {
      if (!mounted) return;
      ErrorHandler.show(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    final agentState = Provider.of<AgentStateNotifier>(context).state;
    final bool isConnected =
        agentState == AgentState.connected ||
        agentState == AgentState.unlocked ||
        agentState == AgentState.locked;
    final String elapsedStr =
        '${_elapsed.inHours > 0 ? _elapsed.inHours.toString().padLeft(2, '0') + ':' : ''}${(_elapsed.inMinutes % 60).toString().padLeft(2, '0')}:${(_elapsed.inSeconds % 60).toString().padLeft(2, '0')}';

    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
        children: [
          WindowTitleBarBox(child: SizedBox(height: 1)),
          Expanded(
            child: SafeArea(
              child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  width: 460,
                  height: 160,
                  margin: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF111214),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: isConnected
                          ? Colors.greenAccent
                          : Colors.redAccent,
                      width: 3,
                    ),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black87,
                        blurRadius: 14,
                        spreadRadius: 2,
                        offset: Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _sessionStart != null
                                  ? 'Active'
                                  : (isConnected ? 'Connected' : 'Offline'),
                              style: TextStyle(
                                color: isConnected
                                    ? Colors.greenAccent
                                    : Colors.redAccent,
                                fontWeight: FontWeight.w700,
                                fontSize: 20,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Time: $elapsedStr',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 28,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'dbg: $_debugLastEvent | $_debugLastFetch',
                              style: const TextStyle(
                                color: Colors.white38,
                                fontSize: 11,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 8.0),
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.redAccent,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 12,
                                ),
                              ),
                              onPressed: _session == null ? null : _endSession,
                              icon: const Icon(Icons.stop_circle, size: 24),
                              label: const Text(
                                'Stop Session',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                          IconButton(
                            tooltip: 'Run in background',
                            onPressed: () async {
                              await windowManager.hide();
                            },
                            icon: const Icon(
                              Icons.minimize,
                              color: Colors.white70,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
