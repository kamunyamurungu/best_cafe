import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/models.dart';
import '../../core/bloc/computers_bloc.dart';
import '../../core/api_service.dart';

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
                  return Text('Error: ${snapshot.error}');
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
