import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/dashboard/dashboard_screen.dart';
import 'features/computers/computers_screen.dart';
import 'features/sessions/sessions_screen.dart';
import 'features/reports/reports_screen.dart';
import 'features/settings/settings_screen.dart';
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
  late AdminSocketService _socketService;
  late final ApiService _api;

  @override
  void initState() {
    super.initState();
    _api = ApiService();
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => ComputersBloc(_api)..add(const ComputersRequested())),
        BlocProvider(create: (ctx) => SessionsBloc(api: _api, computers: ctx.read<ComputersBloc>())..add(const SessionsRequested())),
      ],
      child: Builder(
        builder: (context) {
          _socketService = AdminSocketService(
            onComputerStatusChange: (id, status, data) => context.read<ComputersBloc>().add(ComputerStatusChanged(id, status)),
            onSessionUpdated: (data) => context.read<SessionsBloc>().add(SessionUpdateApplied(data)),
            onComputerCommand: (id, command, data) {
              // Keep pending command for audit, but also react to UNLOCK immediately
              context.read<ComputersBloc>().add(ComputerPendingCommandSet(id, command));
              if (command.toUpperCase() == 'UNLOCK') {
                context.read<ComputersBloc>().add(ComputerUnlockCommandReceived(id));
              }
            },
          );
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _socketService.connect();
          });

          return const ProviderScope(child: _AppShell());
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

class _AppShell extends StatelessWidget {
  const _AppShell();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Best Cafe Admin',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const AdminHome(),
    );
  }
}

class AdminHome extends StatefulWidget {
  const AdminHome({super.key});

  @override
  State<AdminHome> createState() => _AdminHomeState();
}

class _AdminHomeState extends State<AdminHome> {
  int _selectedIndex = 0;

  static const List<Widget> _screens = [
    DashboardScreen(),
    ComputersScreen(),
    SessionsScreen(),
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
            child: _screens[_selectedIndex],
          ),
        ],
      ),
    );
  }
}
