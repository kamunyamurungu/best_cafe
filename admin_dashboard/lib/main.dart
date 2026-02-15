import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/dashboard/dashboard_screen.dart';
import 'features/computers/computers_screen.dart';
import 'features/sessions/sessions_screen.dart';
import 'features/reports/reports_screen.dart';
import 'features/settings/settings_screen.dart';
import 'features/printing/printing_screen.dart';
import 'features/billing/billing_screen.dart';
import 'features/ai/ai_screen.dart';
import 'features/shortcuts/quick_links_screen.dart';
import 'features/users/users_screen.dart';
import 'features/auth/login_screen.dart';
import 'core/socket_service.dart';
import 'core/api_service.dart';
import 'core/bloc/computers_bloc.dart';
import 'core/bloc/sessions_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final ApiService _api;

  @override
  void initState() {
    super.initState();
    _api = ApiService();
  }

  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      child: MaterialApp(
        title: 'Best Cafe Admin',
        theme: ThemeData(primarySwatch: Colors.blue, useMaterial3: true),
        home: AuthGate(api: _api),
      ),
    );
  }
}

class AuthGate extends StatefulWidget {
  final ApiService api;

  const AuthGate({super.key, required this.api});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  bool _loading = true;
  bool _authenticated = false;

  @override
  void initState() {
    super.initState();
    ApiService.onUnauthorized = _handleLoggedOut;
    _init();
  }

  Future<void> _init() async {
    try {
      final hasToken = await widget.api.hasToken();
      if (!hasToken) {
        setState(() {
          _authenticated = false;
          _loading = false;
        });
        return;
      }
      await widget.api.getProfile();
      setState(() {
        _authenticated = true;
        _loading = false;
      });
    } catch (_) {
      await widget.api.clearToken();
      setState(() {
        _authenticated = false;
        _loading = false;
      });
    }
  }

  void _handleLoggedIn() {
    setState(() {
      _authenticated = true;
    });
  }

  void _handleLoggedOut() async {
    await widget.api.clearToken();
    setState(() {
      _authenticated = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (!_authenticated) {
      return LoginScreen(onLoggedIn: _handleLoggedIn);
    }

    return AdminShell(api: widget.api, onLogout: _handleLoggedOut);
  }
}

class AdminShell extends StatefulWidget {
  final ApiService api;
  final VoidCallback onLogout;

  const AdminShell({super.key, required this.api, required this.onLogout});

  @override
  State<AdminShell> createState() => _AdminShellState();
}

class _AdminShellState extends State<AdminShell> {
  late AdminSocketService _socketService;

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) =>
              ComputersBloc(widget.api)..add(const ComputersRequested()),
        ),
        BlocProvider(
          create: (ctx) => SessionsBloc(
            api: widget.api,
            computers: ctx.read<ComputersBloc>(),
          )..add(const SessionsRequested()),
        ),
      ],
      child: Builder(
        builder: (context) {
          _socketService = AdminSocketService(
            onComputerStatusChange: (id, status, data) => context
                .read<ComputersBloc>()
                .add(ComputerStatusChanged(id, status)),
            onSessionUpdated: (data) =>
                context.read<SessionsBloc>().add(SessionUpdateApplied(data)),
            onComputerCommand: (id, command, data) {
              context.read<ComputersBloc>().add(
                ComputerPendingCommandSet(id, command),
              );
              if (command.toUpperCase() == 'UNLOCK') {
                context.read<ComputersBloc>().add(
                  ComputerUnlockCommandReceived(id),
                );
              }
            },
          );
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _socketService.connect();
          });

          return AdminHome(onLogout: widget.onLogout);
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

class AdminHome extends StatefulWidget {
  final VoidCallback onLogout;

  const AdminHome({super.key, required this.onLogout});

  @override
  State<AdminHome> createState() => _AdminHomeState();
}

class _AdminHomeState extends State<AdminHome> {
  int _selectedIndex = 0;

  static const List<Widget> _screens = [
    DashboardScreen(),
    ComputersScreen(),
    SessionsScreen(),
    PrintingScreen(),
    AiScreen(),
    QuickLinksScreen(),
    UsersScreen(),
    BillingScreen(),
    ReportsScreen(),
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedIndex,
            onDestinationSelected: _onItemTapped,
            labelType: NavigationRailLabelType.all,
            destinations: const [
              NavigationRailDestination(
                icon: Icon(Icons.dashboard),
                label: Text('Dashboard'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.computer),
                label: Text('Computers'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.schedule),
                label: Text('Sessions'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.print),
                label: Text('Printing'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.auto_awesome),
                label: Text('AI Services'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.public),
                label: Text('Quick Links'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.people),
                label: Text('Users'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.receipt_long),
                label: Text('Billing'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.bar_chart),
                label: Text('Reports'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.settings),
                label: Text('Settings'),
              ),
            ],
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: Stack(
              children: [
                _screens[_selectedIndex],
                Positioned(
                  right: 16,
                  top: 16,
                  child: IconButton(
                    tooltip: 'Logout',
                    onPressed: widget.onLogout,
                    icon: const Icon(Icons.logout),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
