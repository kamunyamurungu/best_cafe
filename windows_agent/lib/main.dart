import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:window_manager/window_manager.dart';
import 'core/state/agent_state.dart';
import 'core/socket/socket_service.dart';
import 'features/lock_screen/lock_screen.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'core/config/config.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await windowManager.ensureInitialized();

  WindowOptions windowOptions = const WindowOptions(
    size: Size(800, 600),
    center: true,
    backgroundColor: Colors.transparent,
    skipTaskbar: false,
    titleBarStyle: TitleBarStyle.normal,
  );
  windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.show();
    await windowManager.focus();
  });

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AgentStateNotifier()),
        Provider(create: (_) => SocketService(AgentStateNotifier())), // But this creates new instance
      ],
      child: MaterialApp(
        title: 'Windows Agent',
        theme: ThemeData.dark(),
        home: const AgentHome(),
      ),
    );
  }
}

class AgentHome extends StatefulWidget {
  const AgentHome({super.key});

  @override
  State<AgentHome> createState() => _AgentHomeState();
}

class _AgentHomeState extends State<AgentHome> {
  late SocketService _socketService;
  late AgentStateNotifier _stateNotifier;

  @override
  void initState() {
    super.initState();
    _stateNotifier = Provider.of<AgentStateNotifier>(context, listen: false);
    _socketService = SocketService(_stateNotifier);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkConfiguration();
    });

    // Start heartbeat timer
    _startHeartbeat();
  }

  void _checkConfiguration() async {
    final currentUrl = await Config.serverUrl;
    if (currentUrl == Config._defaultServerUrl) {
      _showServerConfigDialog();
    } else {
      _socketService.connect();
    }
  }

  void _showServerConfigDialog() {
    final controller = TextEditingController(text: Config._defaultServerUrl);
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Configure Server'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(labelText: 'Server URL'),
        ),
        actions: [
          ElevatedButton(
            onPressed: () async {
              await Config.setServerUrl(controller.text);
              if (context.mounted) {
                Navigator.of(context).pop();
                _socketService.connect();
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _startHeartbeat() {
    Future.delayed(const Duration(seconds: 10), () {
      if (mounted) {
        _socketService.sendHeartbeat();
        _startHeartbeat();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: _stateNotifier),
        Provider.value(value: _socketService),
      ],
      child: Consumer<AgentStateNotifier>(
        builder: (context, stateNotifier, child) {
          switch (stateNotifier.state) {
            case AgentState.locked:
            case AgentState.connected:
              return const LockScreen();
            case AgentState.unlocked:
              return const UnlockedScreen();
            default:
              return const LoadingScreen();
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    _socketService.disconnect();
    super.dispose();
  }
}

class LoadingScreen extends StatelessWidget {
  const LoadingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
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

  @override
  void initState() {
    super.initState();
    _exitFullscreen();
    _fetchSession();
  }

  void _exitFullscreen() async {
    await windowManager.setFullScreen(false);
    await windowManager.setAlwaysOnTop(false);
    await windowManager.setSkipTaskbar(false);
  }

  void _fetchSession() async {
    final socketService = Provider.of<SocketService>(context, listen: false);
    if (socketService.computerId != null) {
      try {
        final response = await http.get(
          Uri.parse('${Config.serverUrl}/sessions/active/${socketService.computerId}'),
        );
        if (response.statusCode == 200) {
          setState(() {
            _session = jsonDecode(response.body);
            _loading = false;
          });
        } else {
          setState(() {
            _loading = false;
          });
        }
      } catch (e) {
        setState(() {
          _loading = false;
        });
      }
    } else {
      setState(() {
        _loading = false;
      });
    }
  }

  void _endSession() async {
    if (_session == null) return;
    try {
      final response = await http.patch(
        Uri.parse('${Config.serverUrl}/sessions/${_session!['id']}/end'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({}),
      );
      if (response.statusCode == 200) {
        final endedSession = jsonDecode(response.body);
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Session Ended'),
            content: Text('Total cost: \$${endedSession['totalCost']}'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('OK'),
              ),
            ],
          ),
        );
        // The backend will send LOCK command
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
    if (_loading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Computer Unlocked'),
        actions: [
          if (_session != null)
            ElevatedButton(
              onPressed: _endSession,
              child: const Text('End Session'),
            ),
        ],
      ),
      body: Center(
        child: _session != null
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Session started at: ${_session!['startedAt']}'),
                  const SizedBox(height: 20),
                  Text('Price per minute: \$${_session!['pricePerMinute']}'),
                  const SizedBox(height: 20),
                  const Text('You can use the computer now.'),
                ],
              )
            : const Text('No active session.'),
      ),
    );
  }
}
