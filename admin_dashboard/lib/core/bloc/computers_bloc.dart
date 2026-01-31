import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../models.dart';
import '../api_service.dart';

part 'computers_event.dart';
part 'computers_state.dart';

class ComputersBloc extends Bloc<ComputersEvent, ComputersState> {
  final ApiService api;
  ComputersBloc(this.api) : super(const ComputersLoading()) {
    on<ComputersRequested>(_onLoad);
    on<ComputerStatusChanged>(_onStatusChanged);
    on<ComputerPendingCommandSet>(_onPendingCommand);
    on<ComputerLastEndedCostSet>(_onLastEndedCost);
    on<ComputerStartRequested>(_onStartRequested);
    on<ComputerUnlockRequested>(_onUnlockRequested);
    on<ComputerStopRequested>(_onStopRequested);
    on<ComputerClearUiState>(_onClearUiState);
    on<ComputerActiveSessionSet>(_onActiveSessionSet);
    on<ComputerUnlockCommandReceived>(_onUnlockCommandReceived);
  }

  Future<void> _onLoad(ComputersRequested event, Emitter<ComputersState> emit) async {
    emit(const ComputersLoading());
    try {
      final data = await api.getComputers();
      final items = data.map<Computer>((j) => Computer.fromJson(j)).toList();
      emit(ComputersLoaded(items));
    } catch (e) {
      emit(ComputersFailure(e.toString()));
    }
  }

  Future<void> _onUnlockCommandReceived(ComputerUnlockCommandReceived event, Emitter<ComputersState> emit) async {
    // Agent requested UNLOCK: reflect LOCKED state immediately so the red Unlock card appears
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items.map((c) {
        if (c.id != event.id) return c;
        return Computer(
          id: c.id,
          name: c.name,
          deviceToken: c.deviceToken,
          status: 'LOCKED',
          lastSeenAt: c.lastSeenAt,
          activeSessions: const <Session>[],
          lastEndedCost: c.lastEndedCost,
          pendingCommand: null,
          localStartedAt: null,
          uiState: null,
        );
      }).toList();
      emit(ComputersLoaded(updated));
      return;
    }

    // If computers aren't loaded yet, fetch and update to avoid missing the event
    try {
      final data = await api.getComputers();
      final items = data.map<Computer>((j) => Computer.fromJson(j)).toList();
      final updated = items.map((c) {
        if (c.id != event.id) return c;
        return Computer(
          id: c.id,
          name: c.name,
          deviceToken: c.deviceToken,
          status: 'LOCKED',
          lastSeenAt: c.lastSeenAt,
          activeSessions: const <Session>[],
          lastEndedCost: c.lastEndedCost,
          pendingCommand: null,
          localStartedAt: null,
          uiState: null,
        );
      }).toList();
      emit(ComputersLoaded(updated));
    } catch (_) {}
  }

  void _onActiveSessionSet(ComputerActiveSessionSet event, Emitter<ComputersState> emit) {
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items.map((c) {
        if (c.id != event.id) return c;
        final newSessions = <Session>[];
        if (event.status == 'ACTIVE' && event.startedAt != null) {
          newSessions.add(Session(
            id: '${event.id}-active',
            computerId: event.id,
            startedAt: event.startedAt,
            endedAt: null,
            status: 'ACTIVE',
            pricePerMinute: event.pricePerMinute,
            totalCost: null,
          ));
        }
        return Computer(
          id: c.id,
          name: c.name,
          deviceToken: c.deviceToken,
          status: c.status,
          lastSeenAt: c.lastSeenAt,
          activeSessions: newSessions,
          lastEndedCost: c.lastEndedCost,
          pendingCommand: c.pendingCommand,
          localStartedAt: null,
          uiState: null,
        );
      }).toList();
      emit(ComputersLoaded(updated));
    }
  }

  void _onClearUiState(ComputerClearUiState event, Emitter<ComputersState> emit) {
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items
          .map((c) => c.id == event.id
              ? Computer(
                  id: c.id,
                  name: c.name,
                  deviceToken: c.deviceToken,
                  status: c.status,
                  lastSeenAt: c.lastSeenAt,
                  activeSessions: c.activeSessions,
                  lastEndedCost: c.lastEndedCost,
                  pendingCommand: null,
                  localStartedAt: null,
                  uiState: null,
                )
              : c)
          .toList();
      emit(ComputersLoaded(updated));
    }
  }

  void _onStatusChanged(ComputerStatusChanged event, Emitter<ComputersState> emit) {
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items
          .map((c) => c.id == event.id
              ? Computer(
                  id: c.id,
                  name: c.name,
                  deviceToken: c.deviceToken,
                  status: event.status,
                  lastSeenAt: c.lastSeenAt,
                  activeSessions: c.activeSessions,
                  lastEndedCost: c.lastEndedCost,
                  pendingCommand: null,
                  localStartedAt: null,
                  uiState: null,
                )
              : c)
          .toList();
      emit(ComputersLoaded(updated));
    }
  }

  void _onPendingCommand(ComputerPendingCommandSet event, Emitter<ComputersState> emit) {
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items
          .map((c) => c.id == event.id
              ? Computer(
                  id: c.id,
                  name: c.name,
                  deviceToken: c.deviceToken,
                  status: c.status,
                  lastSeenAt: c.lastSeenAt,
                  activeSessions: c.activeSessions,
                  lastEndedCost: c.lastEndedCost,
                  pendingCommand: event.command?.isNotEmpty == true ? event.command : null,
                )
              : c)
          .toList();
      emit(ComputersLoaded(updated));
    }
  }

  void _onLastEndedCost(ComputerLastEndedCostSet event, Emitter<ComputersState> emit) {
    final s = state;
    if (s is ComputersLoaded) {
      final updated = s.items
          .map((c) => c.id == event.id
              ? Computer(
                  id: c.id,
                  name: c.name,
                  deviceToken: c.deviceToken,
                  status: c.status,
                  lastSeenAt: c.lastSeenAt,
                  activeSessions: c.activeSessions,
                  lastEndedCost: event.cost,
                  pendingCommand: c.pendingCommand,
                )
              : c)
          .toList();
      emit(ComputersLoaded(updated));
    }
  }

  Future<void> _onStartRequested(ComputerStartRequested event, Emitter<ComputersState> emit) async {
    try {
      final sessions = await api.getSessions();
      final paused = sessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'PAUSED',
        orElse: () => null,
      );
      if (paused != null) {
        await api.resumeSession(paused['id']);
      } else {
        final session = await api.createSession(event.id);
        await api.startSession(session['id']);
      }
      // After starting/resuming, fetch current active session details to update time/cost immediately
      final freshSessions = await api.getSessions();
      final active = freshSessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'ACTIVE',
        orElse: () => null,
      );
      final s = state;
      if (s is ComputersLoaded) {
        final updated = s.items.map((c) {
          if (c.id != event.id) return c;
          final activeList = <Session>[];
          if (active != null) {
            activeList.add(Session(
              id: active['id']?.toString() ?? '${event.id}-active',
              computerId: event.id,
              startedAt: active['startedAt'] != null ? DateTime.tryParse(active['startedAt'].toString()) : DateTime.now(),
              endedAt: null,
              status: 'ACTIVE',
              pricePerMinute: active['pricePerMinute'] is num ? (active['pricePerMinute'] as num).toInt() : 0,
              totalCost: null,
            ));
          }
          return Computer(
            id: c.id,
            name: c.name,
            deviceToken: c.deviceToken,
            status: 'IN_USE',
            lastSeenAt: c.lastSeenAt,
            activeSessions: activeList,
            lastEndedCost: c.lastEndedCost,
            pendingCommand: c.pendingCommand,
            localStartedAt: null,
            uiState: null,
          );
        }).toList();
        emit(ComputersLoaded(updated));
      }
    } catch (_) {}
  }

  Future<void> _onUnlockRequested(ComputerUnlockRequested event, Emitter<ComputersState> emit) async {
    try {
      final sessions = await api.getSessions();
      final created = sessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'CREATED',
        orElse: () => null,
      );
      final paused = sessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'PAUSED',
        orElse: () => null,
      );
      if (paused != null) {
        await api.resumeSession(paused['id']);
      } else if (created != null) {
        await api.startSession(created['id']);
      }
      // Fetch active session details to switch to Active card promptly
      final freshSessions = await api.getSessions();
      final active = freshSessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'ACTIVE',
        orElse: () => null,
      );
      final s = state;
      if (s is ComputersLoaded) {
        final updated = s.items.map((c) {
          if (c.id != event.id) return c;
          final activeList = <Session>[];
          if (active != null) {
            activeList.add(Session(
              id: active['id']?.toString() ?? '${event.id}-active',
              computerId: event.id,
              startedAt: active['startedAt'] != null ? DateTime.tryParse(active['startedAt'].toString()) : DateTime.now(),
              endedAt: null,
              status: 'ACTIVE',
              pricePerMinute: active['pricePerMinute'] is num ? (active['pricePerMinute'] as num).toInt() : 0,
              totalCost: null,
            ));
          }
          return Computer(
            id: c.id,
            name: c.name,
            deviceToken: c.deviceToken,
            status: 'IN_USE',
            lastSeenAt: c.lastSeenAt,
            activeSessions: activeList,
            lastEndedCost: c.lastEndedCost,
            pendingCommand: c.pendingCommand,
            localStartedAt: null,
            uiState: null,
          );
        }).toList();
        emit(ComputersLoaded(updated));
      }
    } catch (_) {}
  }

  Future<void> _onStopRequested(ComputerStopRequested event, Emitter<ComputersState> emit) async {
    try {
      final sessions = await api.getSessions();
      final active = sessions.firstWhere(
        (s) => s['computerId'] == event.id && s['status'] == 'ACTIVE',
        orElse: () => null,
      );
      if (active != null) {
        await api.endSession(active['id']);
      }
      // Immediately clear active session and set status to AVAILABLE for responsive UI
      final s = state;
      if (s is ComputersLoaded) {
        final updated = s.items.map((c) {
          if (c.id != event.id) return c;
          return Computer(
            id: c.id,
            name: c.name,
            deviceToken: c.deviceToken,
            status: 'AVAILABLE',
            lastSeenAt: c.lastSeenAt,
            activeSessions: const <Session>[],
            lastEndedCost: c.lastEndedCost,
            pendingCommand: c.pendingCommand,
            localStartedAt: null,
            uiState: null,
          );
        }).toList();
        emit(ComputersLoaded(updated));
      }
    } catch (_) {}
  }
}
