part of 'computers_bloc.dart';

abstract class ComputersEvent extends Equatable {
  const ComputersEvent();
  @override
  List<Object?> get props => [];
}

class ComputersRequested extends ComputersEvent {
  const ComputersRequested();
}

class ComputerStatusChanged extends ComputersEvent {
  final String id;
  final String status;
  const ComputerStatusChanged(this.id, this.status);
  @override
  List<Object?> get props => [id, status];
}

class ComputerPendingCommandSet extends ComputersEvent {
  final String id;
  final String? command;
  const ComputerPendingCommandSet(this.id, this.command);
  @override
  List<Object?> get props => [id, command];
}

class ComputerLastEndedCostSet extends ComputersEvent {
  final String id;
  final int cost;
  const ComputerLastEndedCostSet(this.id, this.cost);
  @override
  List<Object?> get props => [id, cost];
}

class ComputerStartRequested extends ComputersEvent {
  final String id;
  const ComputerStartRequested(this.id);
  @override
  List<Object?> get props => [id];
}

class ComputerUnlockRequested extends ComputersEvent {
  final String id;
  const ComputerUnlockRequested(this.id);
  @override
  List<Object?> get props => [id];
}

class ComputerStopRequested extends ComputersEvent {
  final String id;
  const ComputerStopRequested(this.id);
  @override
  List<Object?> get props => [id];
}

class ComputerClearUiState extends ComputersEvent {
  final String id;
  const ComputerClearUiState(this.id);
  @override
  List<Object?> get props => [id];
}

class ComputerActiveSessionSet extends ComputersEvent {
  final String id;
  final DateTime? startedAt;
  final int pricePerMinute;
  final String status; // ACTIVE | ENDED | PAUSED
  const ComputerActiveSessionSet({
    required this.id,
    required this.startedAt,
    required this.pricePerMinute,
    required this.status,
  });
  @override
  List<Object?> get props => [id, startedAt, pricePerMinute, status];
}

class ComputerUnlockCommandReceived extends ComputersEvent {
  final String id;
  const ComputerUnlockCommandReceived(this.id);
  @override
  List<Object?> get props => [id];
}
