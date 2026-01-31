import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/bloc/computers_bloc.dart';
import 'computer_card.dart';

class ComputersScreen extends StatelessWidget {
  const ComputersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ComputersBloc, ComputersState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Computers'),
            actions: [
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () => context.read<ComputersBloc>().add(const ComputersRequested()),
              ),
            ],
          ),
          body: switch (state) {
            ComputersLoading() => const Center(child: CircularProgressIndicator()),
            ComputersFailure(:final message) => Center(child: Text('Error: $message')),
            ComputersLoaded(:final items) => GridView.builder(
                padding: const EdgeInsets.all(16.0),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 5,
                  crossAxisSpacing: 8.0,
                  mainAxisSpacing: 8.0,
                  childAspectRatio: 1.0,
                ),
                itemCount: items.length,
                itemBuilder: (context, index) {
                  final computer = items[index];
                  return ComputerCard(
                    computer: computer,
                    onStart: () => context.read<ComputersBloc>().add(ComputerStartRequested(computer.id)),
                    onUnlock: () => context.read<ComputersBloc>().add(ComputerUnlockRequested(computer.id)),
                    onStop: () => context.read<ComputersBloc>().add(ComputerStopRequested(computer.id)),
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