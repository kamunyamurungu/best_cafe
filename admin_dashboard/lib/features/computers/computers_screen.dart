import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/bloc/computers_bloc.dart';
import '../../core/ui/error_view.dart';
import 'computer_card.dart';

class ComputersScreen extends StatelessWidget {
  const ComputersScreen({super.key});

  Future<void> _confirmPowerOff(
    BuildContext context,
    String computerId,
    String computerName,
  ) async {
    final bloc = context.read<ComputersBloc>();
    await showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Power off computer'),
        content: Text('Power off $computerName now?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(dialogContext).pop();
              bloc.add(ComputerPowerOffRequested(computerId));
            },
            child: const Text('Power off'),
          ),
        ],
      ),
    );
  }

  Future<void> _confirmPowerOffAll(BuildContext context) async {
    final bloc = context.read<ComputersBloc>();
    await showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Power off all computers'),
        content: const Text('Power off all agent computers now?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(dialogContext).pop();
              bloc.add(const ComputersPowerOffAllRequested());
            },
            child: const Text('Power off all'),
          ),
        ],
      ),
    );
  }

  Future<void> _showStartDialog(BuildContext context, String computerId) async {
    final bloc = context.read<ComputersBloc>();
    final amountController = TextEditingController();
    await showDialog(
      context: context,
      useRootNavigator: false,
      builder: (context) => AlertDialog(
        title: const Text('Start Session'),
        content: TextField(
          controller: amountController,
          decoration: const InputDecoration(
            labelText: 'Prepaid amount (optional)',
            hintText: 'KES',
          ),
          keyboardType: TextInputType.number,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              bloc.add(ComputerStartRequested(computerId));
            },
            child: const Text('Open Session'),
          ),
          ElevatedButton(
            onPressed: () {
              final amount = int.tryParse(amountController.text.trim());
              if (amount == null || amount <= 0) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Enter a valid prepaid amount.')),
                );
                return;
              }
              Navigator.of(context).pop();
              bloc.add(
                ComputerPrepaidStartRequested(computerId, amount),
              );
            },
            child: const Text('Start Prepaid'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ComputersBloc, ComputersState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Computers'),
            actions: [
              IconButton(
                icon: const Icon(Icons.power_settings_new),
                tooltip: 'Power off all',
                onPressed: () => _confirmPowerOffAll(context),
              ),
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () => context.read<ComputersBloc>().add(const ComputersRequested()),
              ),
            ],
          ),
          body: switch (state) {
            ComputersLoading() => const Center(child: CircularProgressIndicator()),
            ComputersFailure(:final message) => ErrorView(error: Exception(message)),
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
                    onStart: () => _showStartDialog(context, computer.id),
                    onUnlock: () => context.read<ComputersBloc>().add(ComputerUnlockRequested(computer.id)),
                    onStop: () => context.read<ComputersBloc>().add(ComputerStopRequested(computer.id)),
                    onPowerOff: () => _confirmPowerOff(context, computer.id, computer.name),
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