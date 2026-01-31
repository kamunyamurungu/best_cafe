import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../api_service.dart';
import '../models.dart';
import 'computers_bloc.dart';

part 'sessions_event.dart';
part 'sessions_state.dart';

class SessionsBloc extends Bloc<SessionsEvent, SessionsState> {
  final ApiService api;
  final ComputersBloc computers;

  SessionsBloc({required this.api, required this.computers}) : super(const SessionsLoading()) {
    on<SessionsRequested>(_onLoad);
    on<SessionUpdateApplied>(_onUpdateApplied);
  }

  Future<void> _onLoad(SessionsRequested event, Emitter<SessionsState> emit) async {
    emit(const SessionsLoading());
    try {
      final data = await api.getSessions();
      final items = data.map<Session>((j) => Session.fromJson(j)).toList();
      emit(SessionsLoaded(items));
    } catch (e) {
      emit(SessionsFailure(e.toString()));
    }
  }

  void _onUpdateApplied(SessionUpdateApplied event, Emitter<SessionsState> emit) {
    final list = (state is SessionsLoaded) ? (state as SessionsLoaded).items : <Session>[];
    final sid = event.data['sessionId']?.toString();
    final status = event.data['status']?.toString();
    final totalCost = event.data['totalCost'];
    final computerId = event.data['computerId']?.toString();
    bool found = false;
    final updated = list.map((s) {
      if (s.id == sid) {
        found = true;
        return Session(
          id: s.id,
          computerId: s.computerId,
          startedAt: s.startedAt,
          endedAt: status == 'ENDED' ? DateTime.now() : s.endedAt,
          status: status ?? s.status,
          pricePerMinute: s.pricePerMinute,
          totalCost: totalCost is num ? totalCost as int : s.totalCost,
        );
      }
      return s;
    }).toList();
    if (!found && sid != null && computerId != null) {
      updated.insert(
        0,
        Session(
          id: sid,
          computerId: computerId,
          status: status ?? 'UNKNOWN',
          startedAt: null,
          endedAt: status == 'ENDED' ? DateTime.now() : null,
          pricePerMinute: 0,
          totalCost: totalCost is num ? (totalCost as num).toInt() : null,
        ),
      );
    }
    emit(SessionsLoaded(updated));

    if (status == 'ENDED' && computerId != null && totalCost is num) {
      computers.add(ComputerLastEndedCostSet(computerId, (totalCost as num).toInt()));
      computers.add(ComputerStatusChanged(computerId, 'AVAILABLE'));
      // Clear active session on computer for real-time UI
      computers.add(ComputerActiveSessionSet(
        id: computerId,
        startedAt: null,
        pricePerMinute: 0,
        status: 'ENDED',
      ));
    }
    if (status == 'ACTIVE' && computerId != null) {
      // Session became active - clear any local pending UI and ensure IN_USE status
      computers.add(ComputerStatusChanged(computerId, 'IN_USE'));
      // Also set active session details to enable live time/cost
      // Try to find session details from updated list
      final session = updated.firstWhere(
        (s) => s.id == sid,
        orElse: () => Session(
          id: sid ?? '',
          computerId: computerId,
          status: 'ACTIVE',
          startedAt: event.data['startedAt'] != null ? DateTime.tryParse(event.data['startedAt'].toString()) : null,
          endedAt: null,
          pricePerMinute: event.data['pricePerMinute'] is num ? (event.data['pricePerMinute'] as num).toInt() : 0,
          totalCost: null,
        ),
      );
      computers.add(ComputerActiveSessionSet(
        id: computerId,
        startedAt: session.startedAt,
        pricePerMinute: session.pricePerMinute,
        status: 'ACTIVE',
      ));
    }
    if (status == 'PAUSED' && computerId != null) {
      // Session paused - reflect locked state
      computers.add(ComputerStatusChanged(computerId, 'LOCKED'));
      // Clear active session when paused
      computers.add(ComputerActiveSessionSet(
        id: computerId,
        startedAt: null,
        pricePerMinute: 0,
        status: 'PAUSED',
      ));
    }
  }
}
