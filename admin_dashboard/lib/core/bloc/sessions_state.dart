part of 'sessions_bloc.dart';

enum SessionsStatus { initial, loading, loaded, failure }

abstract class SessionsState extends Equatable {
  const SessionsState();
  @override
  List<Object?> get props => [];
}

class SessionsLoading extends SessionsState {
  const SessionsLoading();
}

class SessionsLoaded extends SessionsState {
  final List<Session> items;
  const SessionsLoaded(this.items);
  @override
  List<Object?> get props => [items];
}

class SessionsFailure extends SessionsState {
  final String message;
  const SessionsFailure(this.message);
  @override
  List<Object?> get props => [message];
}

extension SessionsStateX on SessionsState {
  static SessionsState loading() => const SessionsLoading();
  static SessionsState loaded(List<Session> items) => SessionsLoaded(items);
  static SessionsState failure(String message) => SessionsFailure(message);
}
