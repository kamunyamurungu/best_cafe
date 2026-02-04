import 'package:flutter/material.dart';
import 'package:window_manager/window_manager.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:provider/provider.dart';
import 'package:flutter/foundation.dart';
import 'package:windows_agent/core/state/agent_state.dart';
import '../../core/config/config.dart';
import '../../core/socket/socket_service.dart';
import '../../core/state/session_summary.dart';

class LockScreen extends StatefulWidget {
  const LockScreen({super.key});

  @override
  State<LockScreen> createState() => _LockScreenState();
}

class _LockScreenState extends State<LockScreen> with WindowListener {
  late SocketService _socketService;
  SessionSummary? _lastSummary;
  bool _summaryPopupShown = false;
  @override
  void initState() {
    super.initState();
    windowManager.addListener(this);
    _socketService = Provider.of<SocketService>(context, listen: false);
    _makeFullscreen();
    _loadSummary();
  }

  @override
  void dispose() {
    windowManager.removeListener(this);
    super.dispose();
  }

  void _makeFullscreen() async {
    if (!kDebugMode) {
      await windowManager.waitUntilReadyToShow(
        const WindowOptions(
          fullScreen: true,
          alwaysOnTop: true,
          skipTaskbar: false,
        ),
        () async {
          await windowManager.setClosable(false);
          await windowManager.setMinimizable(false);
          await windowManager.setMaximizable(false);
          await windowManager.setResizable(false);
          await windowManager.show();
          await windowManager.focus();
        },
      );
    }
  }

  Future<void> _loadSummary() async {
    final summary = await SessionSummaryStore.load();
    if (mounted) {
      setState(() {
        _lastSummary = summary;
      });
      if (summary != null && !_summaryPopupShown) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          _showEndedPopup(summary);
          _summaryPopupShown = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
        children: [
          // Hide native title bar by providing an empty custom title bar box
          WindowTitleBarBox(child: SizedBox(height: 1)),
          Expanded(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
            Consumer<AgentStateNotifier>(
              builder: (context, state, _) {
                final color = _lockColorFor(state.state);
                return Icon(
                  Icons.lock,
                  size: 100,
                  color: color,
                );
              },
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Computer Locked',
                  style: TextStyle(
                    fontSize: 48,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 16),
              ],
            ),
            const SizedBox(height: 20),
            const Text(
              'Please pay at the counter',
              style: TextStyle(
                fontSize: 24,
                color: Colors.white70,
              ),
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: _startPayPerUseSession,
              child: const Text('Start Pay Per Use Session'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _showLogin,
              child: const Text('Login'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _showAdminMenu,
              child: const Text('Admin'),
            ),
            const SizedBox(height: 20),
            if (_lastSummary != null) ...[
              Text(
                'You used the computer for ${_formatHms(_lastSummary!.seconds)} (≈ ${_lastSummary!.minutes} min), pay Ksh ${_lastSummary!.cost.toStringAsFixed(0)}',
                style: const TextStyle(fontSize: 20, color: Colors.white70),
                textAlign: TextAlign.center,
              ),
            ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showEndedPopup(SessionSummary summary) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Session Ended'),
        content: Text('Total cost: Ksh ${summary.cost.toStringAsFixed(2)}'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
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
  }

  void _showAdminUnlock() {
    final TextEditingController passwordController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Admin Unlock'),
        content: TextField(
          controller: passwordController,
          obscureText: true,
          decoration: const InputDecoration(labelText: 'Password'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              _socketService.sendAdminUnlock(passwordController.text);
              Navigator.of(context).pop();
              // Assume it will unlock if password correct
            },
            child: const Text('Unlock'),
          ),
        ],
      ),
    );
  }

  void _showLogin() {
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Login'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: const InputDecoration(labelText: 'Password'),
            ),
            const SizedBox(height: 12),
            Align(
              alignment: Alignment.centerLeft,
              child: TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  _showCreateAccount();
                },
                child: const Text('Register new user'),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              try {
                final serverUrl = await Config.serverUrl;
                final response = await http.post(
                  Uri.parse('$serverUrl/auth/login'),
                  headers: {'Content-Type': 'application/json'},
                  body: jsonEncode({
                    'email': emailController.text,
                    'password': passwordController.text,
                  }),
                );
                if (response.statusCode == 200) {
                  final data = jsonDecode(response.body);
                  final token = data['access_token'];
                  final userId = data['user']['id'];
                  final balance = data['user']['balance'];
                  Navigator.of(context).pop();
                  if (balance > 0) {
                    // Auto start session
                    final startResponse = await http.post(
                      Uri.parse('$serverUrl/sessions'),
                      headers: {'Content-Type': 'application/json'},
                      body: jsonEncode({
                        'computerId': _socketService.computerId,
                        'userId': userId,
                      }),
                    );
                    if (startResponse.statusCode == 201) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Session started automatically')),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Failed to start session: ${startResponse.body}')),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Logged in, but insufficient balance')),
                    );
                  }
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Error: ${response.body}')),
                  );
                }
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Error: $e')),
                );
              }
            },
            child: const Text('Login'),
          ),
        ],
      ),
    );
  }

  void _showAdminMenu() {
    showDialog(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text('Admin'),
        children: [
          SimpleDialogOption(
            onPressed: () {
              Navigator.of(context).pop();
              _showAdminUnlock();
            },
            child: const Text('Admin Login'),
          ),
          SimpleDialogOption(
            onPressed: () {
              Navigator.of(context).pop();
              _configureServerImproved();
            },
            child: const Text('Configure Server'),
          ),
        ],
      ),
    );
  }

  void _showCreateAccount() {
    final TextEditingController emailController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Create Account'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: const InputDecoration(labelText: 'Password'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              try {
                final serverUrl = await Config.serverUrl;
                final response = await http.post(
                  Uri.parse('$serverUrl/auth/register'),
                  headers: {'Content-Type': 'application/json'},
                  body: jsonEncode({
                    'email': emailController.text,
                    'password': passwordController.text,
                  }),
                );
                if (response.statusCode == 201) {
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Account created successfully')),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Error: ${response.body}')),
                  );
                }
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Error: $e')),
                );
              }
            },
            child: const Text('Create'),
          ),
        ],
      ),
    );
  }

  void _startPayPerUseSession() async {
    try {
      final serverUrl = await Config.serverUrl;
      final response = await http.post(
        Uri.parse('$serverUrl/sessions'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'computerId': _socketService.computerId,
        }),
      );
      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Session started')),
        );
        // The backend will send UNLOCK
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${response.body}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  void _configureServerImproved() async {
    final current = await Config.serverUrl;
    final TextEditingController urlController = TextEditingController(text: current);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Configure Server URL'),
        content: TextField(
          controller: urlController,
          decoration: const InputDecoration(labelText: 'Server URL'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              final ok = await _socketService.applyServerUrl(urlController.text);
              if (context.mounted) {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(ok ? 'Connected to server' : 'Failed to connect')),
                );
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  @override
  void onWindowClose() {
    // Prevent closing
  }

  @override
  void onWindowMinimize() {
    // Prevent minimizing
  }
}

Color _lockColorFor(AgentState state) {
  switch (state) {
    case AgentState.connected:
    case AgentState.locked:
    case AgentState.unlocked:
      return Colors.green;
    case AgentState.disconnected:
    case AgentState.booting:
    case AgentState.error:
      return Colors.red;
  }
}

String _formatHms(int seconds) {
  final h = (seconds ~/ 3600);
  final m = (seconds % 3600) ~/ 60;
  final s = seconds % 60;
  if (h > 0) {
    return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }
  return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
}