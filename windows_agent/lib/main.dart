import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'package:window_manager/window_manager.dart';
import 'dart:convert';
import 'dart:async';
import 'core/config/config.dart';
import 'core/socket/socket_service.dart';
import 'core/state/agent_state.dart';
import 'features/lock_screen/lock_screen.dart';
import 'core/log/logger.dart';
import 'core/state/session_summary.dart';

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

    await Logger.log('Starting socket connection');
    socketService.connect();
  }, (error, stack) async {
    await Logger.log('Uncaught error: $error');
    await Logger.log('Stack: $stack');
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Windows Agent',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Consumer<AgentStateNotifier>(
        builder: (context, stateNotifier, child) {
          if (stateNotifier.state == AgentState.unlocked) {
            return const UnlockedScreen();
          }
          // Default to lock screen for all other states
          return const LockScreen();
        },
      ),
    );
  }
}

class UnlockedScreen extends StatefulWidget {
  const UnlockedScreen({super.key});

  @override
  State<UnlockedScreen> createState() => _UnlockedScreenState();
}

class _UnlockedScreenState extends State<UnlockedScreen> {
  Map<String, dynamic>? _session;
  bool _loading = true;
  bool _miniOverlay = false;
  DateTime? _sessionStart;
  Duration _elapsed = Duration.zero;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _exitFullscreen();
    WidgetsBinding.instance.addPostFrameCallback((_) => _fetchSession());
    _miniOverlay = true;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted && _sessionStart != null) {
        setState(() {
          _elapsed = DateTime.now().difference(_sessionStart!);
        });
      }
    });
  }

  void _exitFullscreen() async {
    await windowManager.setFullScreen(false);
    await windowManager.setAlwaysOnTop(false);
    await windowManager.setSkipTaskbar(false);
  }

  void _fetchSession() async {
    final socketService = Provider.of<SocketService>(context, listen: false);
    final stateNotifier = Provider.of<AgentStateNotifier>(context, listen: false);
    if (socketService.computerId != null) {
      try {
        final response = await http.get(
          Uri.parse('${await Config.serverUrl}/sessions/active/${socketService.computerId}'),
        );
        if (response.statusCode == 200) {
          setState(() {
            _session = jsonDecode(response.body);
            _loading = false;
            if (_session != null && _session!['startedAt'] != null) {
              _sessionStart = DateTime.tryParse(_session!['startedAt']);
              _showMiniOverlay();
            }
          });
          stateNotifier.setState(AgentState.unlocked);
        } else {
          setState(() {
            _loading = false;
          });
          stateNotifier.setState(AgentState.locked);
        }
      } catch (e) {
        setState(() {
          _loading = false;
        });
        stateNotifier.setState(AgentState.locked);
      }
    } else {
      setState(() {
        _loading = false;
      });
      stateNotifier.setState(AgentState.locked);
    }
  }

  void _showMiniOverlay() async {
    setState(() {
      _miniOverlay = true;
      _elapsed = DateTime.now().difference(_sessionStart ?? DateTime.now());
    });
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted && _miniOverlay && _sessionStart != null) {
        setState(() {
          _elapsed = DateTime.now().difference(_sessionStart!);
        });
      }
    });
    await windowManager.waitUntilReadyToShow(
      const WindowOptions(
        size: Size(320, 80),
        alwaysOnTop: true,
        skipTaskbar: false,
      ),
      () async {
        await windowManager.setMinimizable(true);
        await windowManager.setMaximizable(false);
        await windowManager.setResizable(false);
        await windowManager.setClosable(false);
        await windowManager.setPosition(const Offset(16, 16));
        await windowManager.show();
        await windowManager.focus();
      },
    );
  }

  Future<void> _restoreWindow() async {
    await windowManager.waitUntilReadyToShow(
      const WindowOptions(
        size: Size(800, 600),
        alwaysOnTop: false,
        skipTaskbar: false,
        fullScreen: false,
      ),
      () async {
        await windowManager.center();
        await windowManager.show();
        await windowManager.focus();
      },
    );
    setState(() {
      _miniOverlay = false;
    });
    _timer?.cancel();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _endSession() async {
    if (_session == null) {
      // Try to fetch active session first
      final socketService = Provider.of<SocketService>(context, listen: false);
      if (socketService.computerId != null) {
        try {
          final response = await http.get(
            Uri.parse('${await Config.serverUrl}/sessions/active/${socketService.computerId}'),
          );
          if (response.statusCode == 200 && response.body.trim().isNotEmpty && response.body.trim() != 'null') {
            _session = jsonDecode(response.body);
          }
        } catch (_) {}
      }
      if (_session == null) {
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
      if (response.statusCode == 200) {
        final endedSession = jsonDecode(response.body);
        final dynamic totalCostRaw = endedSession['totalCost'];
        final double? totalCost = totalCostRaw is num
            ? totalCostRaw.toDouble()
            : double.tryParse(totalCostRaw?.toString() ?? '');
        // Compute minutes: prefer backend value, else derive
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
          await SessionSummaryStore.save(SessionSummary(minutes: minutes, cost: totalCost));
        }
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Session Ended'),
            content: Text(
              totalCost == null
                  ? 'Session ended successfully.'
                  : 'Total cost: \$${totalCost.toStringAsFixed(2)}',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('OK'),
              ),
            ],
          ),
        );
        // Do not resize/restore. Wait for backend to send LOCK command.
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error ending session: ${response.body}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: Align(
        alignment: Alignment.topLeft,
        child: Container(
            width: 320,
            height: 80,
          margin: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.85),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.blueAccent, width: 2),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                      const Text('Active', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      Text('Time: ${_elapsed.inMinutes}:${(_elapsed.inSeconds % 60).toString().padLeft(2, '0')}', style: const TextStyle(color: Colors.white70)),
                  ],
                ),
              ),
                Row(
                  children: [
                    IconButton(
                      tooltip: 'End Session',
                      onPressed: _endSession,
                      icon: const Icon(Icons.stop_circle, color: Colors.redAccent),
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
    );
  }
}
