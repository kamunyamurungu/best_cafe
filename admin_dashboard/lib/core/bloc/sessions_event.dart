part of 'sessions_bloc.dart';

abstract class SessionsEvent extends Equatable {
  const SessionsEvent();
  @override
  List<Object?> get props => [];
}

class SessionsRequested extends SessionsEvent {
  const SessionsRequested();
}

class SessionUpdateApplied extends SessionsEvent {
  final Map<String, dynamic> data;
  const SessionUpdateApplied(this.data);
  @override
  List<Object?> get props => [data];
}
