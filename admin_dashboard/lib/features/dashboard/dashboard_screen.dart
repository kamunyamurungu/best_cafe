import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../core/models.dart';
import '../../core/bloc/computers_bloc.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_view.dart';
import '../ai/ai_screen.dart';
import '../shortcuts/quick_links_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final api = ApiService();

    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard - Nairobi Main Branch')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Stats Row
            FutureBuilder<Map<String, dynamic>>(
              future: api.getTodayStats(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final stats = snapshot.data ?? {};
                // We'll compute active/available from bloc state below using BlocSelector
                return BlocBuilder<ComputersBloc, ComputersState>(
                  builder: (context, state) {
                    final items = state is ComputersLoaded
                        ? state.items
                        : <Computer>[];
                    return Row(
                      children: [
                        _buildStatCard(
                          'Active PCs',
                          '${_countActiveComputers(items)}',
                          Colors.green,
                        ),
                        const SizedBox(width: 16),
                        _buildStatCard(
                          'Available PCs',
                          '${_countAvailableComputers(items)}',
                          Colors.grey,
                        ),
                        const SizedBox(width: 16),
                        _buildStatCard(
                          'Revenue Today',
                          'KES ${stats['totalRevenue'] ?? 0}',
                          Colors.blue,
                        ),
                      ],
                    );
                  },
                );
              },
            ),
            const SizedBox(height: 16),
            const Text(
              'Overview',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            const Text(
              'Use the Computers tab for full controls and live view.',
            ),
            const SizedBox(height: 24),
            const Text(
              'Quick Access',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            FutureBuilder<List<dynamic>>(
              future: api.getShortcuts(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const LinearProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final items = (snapshot.data ?? [])
                    .map((e) => ShortcutItem.fromJson(e))
                    .where((s) => s.isActive)
                    .take(8)
                    .toList();
                if (items.isEmpty) {
                  return const Text('No shortcuts configured.');
                }
                return Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: items
                      .map(
                        (shortcut) => SizedBox(
                          width: 180,
                          child: OutlinedButton.icon(
                            onPressed: () =>
                                _handleShortcutTap(context, api, shortcut),
                            icon: const Icon(Icons.flash_on),
                            label: Text(shortcut.name),
                          ),
                        ),
                      )
                      .toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleShortcutTap(
    BuildContext context,
    ApiService api,
    ShortcutItem shortcut,
  ) async {
    try {
      final usage = await api.useShortcut(shortcut.id);
      final resolvedTarget =
          usage['resolvedTarget']?.toString() ?? shortcut.target;
      final transactionId = usage['transactionId']?.toString();
      if (transactionId != null && transactionId.isNotEmpty && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Transaction created.')),
        );
      }

      switch (shortcut.type) {
        case 'URL':
          if (resolvedTarget.isEmpty) {
            if (!context.mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Shortcut URL is missing.')),
            );
            return;
          }
          await launchUrl(
            Uri.parse(resolvedTarget),
            mode: LaunchMode.externalApplication,
          );
          break;
        case 'GOV_SERVICE':
          if (resolvedTarget.isNotEmpty) {
            await launchUrl(
              Uri.parse(resolvedTarget),
              mode: LaunchMode.externalApplication,
            );
            return;
          }
          if (!context.mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Government service URL missing.')),
          );
          break;
        case 'AI_SERVICE':
          if (!context.mounted) return;
          Navigator.of(
            context,
          ).push(MaterialPageRoute(builder: (_) => const AiScreen()));
          break;
        case 'INTERNAL':
          if (!context.mounted) return;
          if (shortcut.target == 'QUICK_LINKS') {
            Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const QuickLinksScreen()),
            );
          } else if (shortcut.target == 'GOV_SERVICES') {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => const QuickLinksScreen(),
              ),
            );
          } else if (shortcut.target == 'AI') {
            Navigator.of(
              context,
            ).push(MaterialPageRoute(builder: (_) => const AiScreen()));
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Shortcut target not configured.')),
            );
          }
          break;
        default:
          if (!context.mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Unsupported shortcut type.')),
          );
      }
    } catch (error) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to open shortcut: $error')),
      );
    }
  }

  Widget _buildStatCard(String title, String value, Color color) {
    return Expanded(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Text(
                title,
                style: const TextStyle(fontSize: 16, color: Colors.grey),
              ),
              const SizedBox(height: 8),
              Text(
                value,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  int _countActiveComputers(List<Computer> computers) {
    return computers.where((c) => c.status == 'IN_USE').length;
  }

  int _countAvailableComputers(List<Computer> computers) {
    return computers.where((c) => c.status == 'AVAILABLE').length;
  }
}
