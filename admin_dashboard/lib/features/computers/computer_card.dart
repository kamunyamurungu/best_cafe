import 'package:flutter/material.dart';
import '../../core/models.dart';

class ComputerCard extends StatelessWidget {
  final Computer computer;
  final VoidCallback onStart;
  final VoidCallback onUnlock;
  final VoidCallback onStop;

  const ComputerCard({
    super.key,
    required this.computer,
    required this.onStart,
    required this.onUnlock,
    required this.onStop,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(4.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.computer,
              size: 24,
              color: _getStatusColor(),
            ),
            const SizedBox(height: 2),
            Text(
              computer.name,
              style: const TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              computer.displayStatus,
              style: TextStyle(
                color: _getStatusColor(),
                fontWeight: FontWeight.w500,
                fontSize: 8,
              ),
            ),
            if (computer.timeDisplay != null) ...[
              Text(
                'Time: ${computer.timeDisplay}',
                style: const TextStyle(fontSize: 8),
              ),
            ],
            if (computer.costDisplay != null) ...[
              Text(
                'Cost: ${computer.costDisplay}',
                style: const TextStyle(fontSize: 8),
              ),
            ],
            const SizedBox(height: 4),
            ElevatedButton(
              onPressed: _getButtonAction(),
              style: ElevatedButton.styleFrom(
                backgroundColor: _getStatusColor(),
                padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                textStyle: const TextStyle(fontSize: 10),
                minimumSize: const Size(0, 24),
              ),
              child: Text(_getButtonText()),
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor() {
    switch (computer.status) {
      case 'IN_USE':
        return Colors.green;
      case 'AVAILABLE':
        return Colors.grey;
      case 'LOCKED':
        return Colors.red;
      case 'OFFLINE':
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }

  String _getButtonText() {
    switch (computer.status) {
      case 'IN_USE':
        return 'STOP';
      case 'AVAILABLE':
        return 'START';
      case 'LOCKED':
        return 'UNLOCK';
      case 'OFFLINE':
        return 'LOCK';
      default:
        return 'ACTION';
    }
  }

  VoidCallback _getButtonAction() {
    switch (computer.status) {
      case 'IN_USE':
        return onStop;
      case 'AVAILABLE':
        return onStart;
      case 'LOCKED':
        return onUnlock;
      case 'OFFLINE':
        return () {}; // No action
      default:
        return () {};
    }
  }
}