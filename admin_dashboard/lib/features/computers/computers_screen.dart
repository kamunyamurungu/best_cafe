import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import 'computer_card.dart';

class ComputersScreen extends ConsumerWidget {
  const ComputersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final computersAsync = ref.watch(computersProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Computers'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.invalidate(computersProvider),
          ),
        ],
      ),
      body: computersAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(child: Text('Error: $error')),
        data: (computers) => GridView.builder(
          padding: const EdgeInsets.all(16.0),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 5,
            crossAxisSpacing: 8.0,
            mainAxisSpacing: 8.0,
            childAspectRatio: 1.0,
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
                      const SnackBar(content: Text('Computer started')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error starting computer: $error')),
                    );
                  }
                }
              },
              onUnlock: () async {
                try {
                  await ref.read(computersProvider.notifier).unlockComputer(computer.id);
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Computer unlocked')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error unlocking computer: $error')),
                    );
                  }
                }
              },
              onStop: () async {
                try {
                  await ref.read(computersProvider.notifier).stopComputer(computer.id);
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Computer stopped')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error stopping computer: $error')),
                    );
                  }
                }
              },
            );
          },
        ),
      ),
    );
  }
}