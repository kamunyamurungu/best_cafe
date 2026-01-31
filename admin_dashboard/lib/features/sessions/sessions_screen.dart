import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/bloc/sessions_bloc.dart';
import '../../core/api_service.dart';

class SessionsScreen extends StatelessWidget {
  const SessionsScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return BlocBuilder<SessionsBloc, SessionsState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('All Sessions'),
            actions: [
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () => context.read<SessionsBloc>().add(const SessionsRequested()),
              ),
            ],
          ),
          body: switch (state) {
            SessionsLoading() => const Center(child: CircularProgressIndicator()),
            SessionsFailure(:final message) => Center(child: Text('Error: $message')),
            SessionsLoaded(:final items) => ListView.builder(
                padding: const EdgeInsets.all(16.0),
                itemCount: items.length,
                itemBuilder: (context, index) {
                  final session = items[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 8.0),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Session ${session.id}', style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: 4),
                          Text('Computer: ${session.computerId} | Status: ${session.status}'),
                          const SizedBox(height: 8),
                          if (session.status == 'PAUSED')
                            Row(
                              children: [
                                ElevatedButton.icon(
                                  onPressed: () async {
                                    try {
                                      await ApiService().resumeSession(session.id);
                                      // socket event will update state; optionally reload
                                    } catch (e) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(content: Text('Failed to resume: $e')),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.play_arrow),
                                  label: const Text('Reopen Computer'),
                                ),
                                const SizedBox(width: 12),
                                OutlinedButton.icon(
                                  onPressed: () async {
                                    try {
                                      await ApiService().endSession(session.id);
                                    } catch (e) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(content: Text('Failed to close: $e')),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.stop),
                                  label: const Text('Close Session'),
                                ),
                              ],
                            )
                          else
                            Align(
                              alignment: Alignment.centerRight,
                              child: Text('Cost: KES ${session.cost}'),
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            _ => const SizedBox.shrink(),
          },
        );
      },
    );
  }
}