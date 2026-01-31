import 'package:flutter/material.dart';
import 'dart:async';
import '../../core/models.dart';

class ComputerCard extends StatefulWidget {
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
  State<ComputerCard> createState() => _ComputerCardState();
}

class _ComputerCardState extends State<ComputerCard> {
  Timer? _tick;

  @override
  void initState() {
    super.initState();
    _tick = Timer.periodic(const Duration(seconds: 30), (_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _tick?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final hasTime = widget.computer.timeDisplay != null;
    final hasCost = widget.computer.costDisplay != null;
    final isActiveUI = widget.computer.status == 'IN_USE' && hasTime && hasCost;
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
            // Minimal header
            Text(
              widget.computer.name,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              widget.computer.displayStatus,
              style: TextStyle(
                color: _getStatusColor(),
                fontWeight: FontWeight.w500,
                fontSize: 8,
              ),
            ),
            // Active card only when both time and cost are available
            if (isActiveUI) ...[
              Text('Time: ${widget.computer.timeDisplay}', style: const TextStyle(fontSize: 10)),
              Text('Cost: ${widget.computer.costDisplay}', style: const TextStyle(fontSize: 10)),
            ] else ...[
              if (widget.computer.lastEndedCost != null)
                Text('Last Session: KES ${widget.computer.lastEndedCost}', style: const TextStyle(fontSize: 10)),
            ],
            const SizedBox(height: 4),
            ElevatedButton(
              onPressed: _getButtonAction(isActiveUI),
              style: ElevatedButton.styleFrom(
                backgroundColor: _getButtonColor(isActiveUI),
                padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                textStyle: const TextStyle(fontSize: 10),
                minimumSize: const Size(0, 24),
              ),
              child: Text(_getButtonText(isActiveUI)),
            ),
          ],
        ),
      ),
    );
  }

  Color _getStatusColor() {
    switch (widget.computer.status) {
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

  String _getButtonText(bool isActiveUI) {
    if (isActiveUI) return 'STOP';
    if (widget.computer.status == 'LOCKED') return 'UNLOCK';
    if (widget.computer.status == 'AVAILABLE') return 'START';
    return 'UNAVAILABLE';
  }

  VoidCallback _getButtonAction(bool isActiveUI) {
    if (isActiveUI) return widget.onStop;
    if (widget.computer.status == 'LOCKED') return widget.onUnlock;
    if (widget.computer.status == 'AVAILABLE') return widget.onStart;
    return () {};
  }

  Color _getButtonColor(bool isActiveUI) {
    if (isActiveUI) return Colors.green;
    if (widget.computer.status == 'LOCKED') return Colors.red;
    if (widget.computer.status == 'AVAILABLE') return Colors.grey;
    return Colors.grey.shade400;
  }
}
