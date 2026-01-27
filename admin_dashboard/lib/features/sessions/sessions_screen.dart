import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';

class SessionsScreen extends ConsumerWidget {
  const SessionsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sessionsAsync = ref.watch(sessionsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('All Sessions'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.invalidate(sessionsProvider),
          ),
        ],
      ),
      body: sessionsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(child: Text('Error: $error')),
        data: (sessions) => ListView.builder(
          padding: const EdgeInsets.all(16.0),
          itemCount: sessions.length,
          itemBuilder: (context, index) {
            final session = sessions[index];
            return Card(
              margin: const EdgeInsets.only(bottom: 8.0),
              child: ListTile(
                title: Text('Session ${session.id}'),
                subtitle: Text('Computer: ${session.computerId} | Status: ${session.status}'),
                trailing: Text('Cost: KES ${session.cost}'),
              ),
            );
          },
        ),
      ),
    );
  }
}