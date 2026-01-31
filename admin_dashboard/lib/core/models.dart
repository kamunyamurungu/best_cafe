class Computer {
  final String id;
  final String name;
  final String deviceToken;
  final String status;
  final DateTime? lastSeenAt;
  final List<Session> activeSessions;
  final int? lastEndedCost;
  final String? pendingCommand;
  final DateTime? localStartedAt;
  final String? uiState; // UNLOCK_PENDING | ACTIVE_LOCAL | STOP_PENDING

  Computer({
    required this.id,
    required this.name,
    required this.deviceToken,
    required this.status,
    this.lastSeenAt,
    required this.activeSessions,
    this.lastEndedCost,
    this.pendingCommand,
    this.localStartedAt,
    this.uiState,
  });

  factory Computer.fromJson(Map<String, dynamic> json) {
    // Extract sessions array if present
    final sessionsJson = (json['sessions'] as List<dynamic>?) ?? [];
    final sessions = sessionsJson.map((s) => Session.fromJson(s)).toList();
    final activeSessions = sessions.where((s) => s.status == 'ACTIVE').toList();
    final lastEnded =
        sessions
            .where((s) => s.status == 'ENDED' && s.totalCost != null)
            .toList()
          ..sort(
            (a, b) => (b.endedAt ?? DateTime.fromMillisecondsSinceEpoch(0))
                .compareTo(a.endedAt ?? DateTime.fromMillisecondsSinceEpoch(0)),
          );

    return Computer(
      id: json['id'] ?? '',
      name: json['name'] ?? 'Unknown Computer',
      deviceToken: json['deviceToken'] ?? '',
      status: json['status'] ?? 'UNKNOWN',
      lastSeenAt: json['lastSeenAt'] != null
          ? DateTime.parse(json['lastSeenAt'])
          : null,
      activeSessions: activeSessions,
      lastEndedCost: lastEnded.isNotEmpty ? lastEnded.first.totalCost : null,
      pendingCommand: null,
      localStartedAt: null,
      uiState: null,
    );
  }

  String get displayStatus {
    switch (status) {
      case 'IN_USE':
        return 'IN USE';
      case 'AVAILABLE':
        return 'FREE';
      case 'LOCKED':
        return 'LOCKED';
      case 'OFFLINE':
        return 'OFFLINE';
      default:
        return 'UNKNOWN';
    }
  }

  String? get timeDisplay {
    final started = activeSessions.isNotEmpty && activeSessions.first.startedAt != null
        ? activeSessions.first.startedAt!
        : null;
    final isActive = (activeSessions.isNotEmpty && activeSessions.first.status == 'ACTIVE');
    if (started != null && isActive) {
      final duration = DateTime.now().difference(started);
      final minutes = duration.inMinutes;
      return '${minutes}m';
    }
    return null;
  }

  String? get costDisplay {
    if (activeSessions.isNotEmpty) {
      final session = activeSessions.first;
      if (session.startedAt != null && session.status == 'ACTIVE') {
        final duration = DateTime.now().difference(session.startedAt!);
        final minutes = duration.inMinutes;
        final cost = minutes * session.pricePerMinute;
        return 'KES ${cost.toStringAsFixed(0)}';
      }
    }
    return null;
  }

  String? get pendingLabel {
    if (pendingCommand == null) return null;
    switch (pendingCommand) {
      case 'UNLOCK':
        return 'Unlock requested';
      case 'LOCK':
        return 'Lock requested';
      default:
        return 'Command: $pendingCommand';
    }
  }

  String? get uiBadgeLabel => null;
}

class Session {
  final String id;
  final String computerId;
  final DateTime? startedAt;
  final DateTime? endedAt;
  final String status;
  final int pricePerMinute;
  final int? totalCost;

  Session({
    required this.id,
    required this.computerId,
    this.startedAt,
    this.endedAt,
    required this.status,
    required this.pricePerMinute,
    this.totalCost,
  });

  factory Session.fromJson(Map<String, dynamic> json) {
    return Session(
      id: json['id'] ?? '',
      computerId: json['computerId'] ?? '',
      startedAt: json['startedAt'] != null
          ? DateTime.parse(json['startedAt'])
          : null,
      endedAt: json['endedAt'] != null ? DateTime.parse(json['endedAt']) : null,
      status: json['status'] ?? 'UNKNOWN',
      pricePerMinute: json['pricePerMinute'] ?? 0,
      totalCost: json['totalCost'],
    );
  }

  int get cost => totalCost ?? 0;
}
