import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../core/models.dart';
import '../computers/computer_card.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final computersAsync = ref.watch(computersProvider);
    final statsAsync = ref.watch(statsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard - Nairobi Main Branch'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Stats Row
            statsAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => Text('Error: $error'),
              data: (stats) => Row(
                children: [
                  _buildStatCard('Active PCs', '${_countActiveComputers(computersAsync.valueOrNull ?? [])}', Colors.green),
                  const SizedBox(width: 16),
                  _buildStatCard('Available PCs', '${_countAvailableComputers(computersAsync.valueOrNull ?? [])}', Colors.grey),
                  const SizedBox(width: 16),
                  _buildStatCard('Revenue Today', 'KES ${stats['totalRevenue'] ?? 0}', Colors.blue),
                ],
              ),
            ),
            const SizedBox(height: 32),
            const Text(
              'Live Computers',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: computersAsync.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (error, stack) => Center(child: Text('Error: $error')),
                data: (computers) => GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 4,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                    childAspectRatio: 0.8,
                  ),
                  itemCount: computers.length,
                  itemBuilder: (context, index) {
                    final computer = computers[index];
                    return ComputerCard(
                      computer: computer,
                      onStart: () async {
                        try {
                          await ref.read(computersProvider.notifier).startComputer(computer.id);
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Started ${computer.name}')),
                            );
                          }
                        } catch (error) {
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Failed to start computer: $error')),
                            );
                          }
                        }
                      },
                      onUnlock: () async {
                        try {
                          await ref.read(computersProvider.notifier).unlockComputer(computer.id);
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Unlocked ${computer.name}')),
                            );
                          }
                        } catch (error) {
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Failed to unlock computer: $error')),
                            );
                          }
                        }
                      },
                      onStop: () async {
                        try {
                          await ref.read(computersProvider.notifier).stopComputer(computer.id);
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Stopped ${computer.name}')),
                            );
                          }
                        } catch (error) {
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Failed to stop computer: $error')),
                            );
                          }
                        }
                      },
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
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