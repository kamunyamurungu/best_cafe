part of 'computers_bloc.dart';

enum ComputersStatus { initial, loading, loaded, failure }

abstract class ComputersState extends Equatable {
  const ComputersState();
  @override
  List<Object?> get props => [];
}

class ComputersLoading extends ComputersState {
  const ComputersLoading();
}

class ComputersLoaded extends ComputersState {
  final List<Computer> items;
  const ComputersLoaded(this.items);
  @override
  List<Object?> get props => [items];
}

class ComputersFailure extends ComputersState {
  final String message;
  const ComputersFailure(this.message);
  @override
  List<Object?> get props => [message];
}

extension ComputersStateX on ComputersState {
  static ComputersState loading() => const ComputersLoading();
  static ComputersState loaded(List<Computer> items) => ComputersLoaded(items);
  static ComputersState failure(String message) => ComputersFailure(message);
}
