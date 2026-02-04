import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'package:window_manager/window_manager.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'core/log/logger.dart';
import 'core/config/config.dart';
import 'core/socket/socket_service.dart';
import 'core/state/agent_state.dart';
import 'core/state/session_summary.dart';
import 'features/lock_screen/lock_screen.dart';

void main() {
  runZonedGuarded(() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Logger.init();
    await windowManager.ensureInitialized();

    final stateNotifier = AgentStateNotifier();
    final socketService = SocketService(stateNotifier);

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
  }, (error, stack) async {
    FlutterError.dumpErrorToConsole(FlutterErrorDetails(exception: error, stack: stack));
    await Logger.log('Zone error: $error');
    await Logger.log('Stack: $stack');
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
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
  Duration _elapsed = Duration.zero;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _initSession();
    _configureWindow();
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
          await windowManager.setTitleBarStyle(TitleBarStyle.hidden, windowButtonVisibility: false);
        } catch (_) {}
      },
    );
  }

  Future<void> _initSession() async {
    final socketService = Provider.of<SocketService>(context, listen: false);
    final cid = socketService.computerId;
    if (cid == null) return;
    try {
      final url = '${await Config.serverUrl}/sessions/active/$cid';
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final body = response.body.trim();
        if (body.isNotEmpty && body != 'null') {
          final json = jsonDecode(body);
          setState(() {
            _session = json;
            final startedAt = json['startedAt']?.toString();
            _sessionStart = startedAt != null ? DateTime.tryParse(startedAt) : null;
            _elapsed = _sessionStart != null ? DateTime.now().difference(_sessionStart!) : Duration.zero;
          });
          _startTimer();
        }
      }
    } catch (_) {}
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      if (_sessionStart != null) {
        setState(() {
          _elapsed = DateTime.now().difference(_sessionStart!);
        });
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
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
          if (response.statusCode == 200 && response.body.trim().isNotEmpty && response.body.trim() != 'null') {
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
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No active session found.')));
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
      if (!mounted) return;
      if (response.statusCode == 200) {
        final endedSession = jsonDecode(response.body);
        final dynamic totalCostRaw = endedSession['totalCost'];
            final double? totalCost = totalCostRaw is num ? totalCostRaw.toDouble() : double.tryParse(totalCostRaw?.toString() ?? '');
        int minutes = _elapsed.inMinutes;
        final dynamic totalMinutesRaw = endedSession['totalMinutes'];
        if (totalMinutesRaw is num) {
          minutes = totalMinutesRaw.toInt();
        } else {
          final String? startedAtStr = endedSession['startedAt']?.toString();
          final String? endedAtStr = endedSession['endedAt']?.toString();
          final startedAt = startedAtStr != null ? DateTime.tryParse(startedAtStr) : null;
          final endedAt = endedAtStr != null ? DateTime.tryParse(endedAtStr) : null;
          if (startedAt != null && endedAt != null) {
            minutes = endedAt.difference(startedAt).inMinutes;
          }
        }
        if (totalCost != null) {
          int secs = 0;
          final String? startedAtStr = endedSession['startedAt']?.toString();
          final String? endedAtStr = endedSession['endedAt']?.toString();
          final startedAt = startedAtStr != null ? DateTime.tryParse(startedAtStr) : null;
          final endedAt = endedAtStr != null ? DateTime.tryParse(endedAtStr) : null;
          if (startedAt != null && endedAt != null) {
            secs = endedAt.difference(startedAt).inSeconds;
          } else {
            secs = minutes * 60;
          }
          await SessionSummaryStore.save(SessionSummary(minutes: minutes, cost: totalCost, seconds: secs));
        }
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Session Ended'),
                content: Text(totalCost == null ? 'Session ended successfully.' : 'Total cost: Ksh ${totalCost.toStringAsFixed(2)}'),
            actions: [
              TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('OK')),
            ],
          ),
        );
        // Auto-close after 10 seconds
        Future.delayed(const Duration(seconds: 10), () {
          if (!mounted) return;
          if (Navigator.of(context, rootNavigator: true).canPop()) {
            Navigator.of(context, rootNavigator: true).pop();
          }
        });
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error ending session: ${response.body}')));
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final agentState = Provider.of<AgentStateNotifier>(context).state;
    final bool isConnected = agentState == AgentState.connected || agentState == AgentState.unlocked || agentState == AgentState.locked;
    final String elapsedStr = '${_elapsed.inHours > 0 ? _elapsed.inHours.toString().padLeft(2, '0') + ':' : ''}${(_elapsed.inMinutes % 60).toString().padLeft(2, '0')}:${(_elapsed.inSeconds % 60).toString().padLeft(2, '0')}';

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
                    border: Border.all(color: isConnected ? Colors.greenAccent : Colors.redAccent, width: 3),
                    boxShadow: const [
                      BoxShadow(color: Colors.black87, blurRadius: 14, spreadRadius: 2, offset: Offset(0, 6)),
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
                              _sessionStart != null ? 'Active' : (isConnected ? 'Connected' : 'Offline'),
                              style: TextStyle(
                                color: isConnected ? Colors.greenAccent : Colors.redAccent,
                                fontWeight: FontWeight.w700,
                                fontSize: 20,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Time: $elapsedStr',
                              style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold),
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
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                              ),
                              onPressed: _session == null ? null : _endSession,
                              icon: const Icon(Icons.stop_circle, size: 24),
                              label: const Text('Stop Session', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                            ),
                          ),
                          IconButton(
                            tooltip: 'Run in background',
                            onPressed: () async {
                              await windowManager.hide();
                            },
                            icon: const Icon(Icons.minimize, color: Colors.white70),
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
