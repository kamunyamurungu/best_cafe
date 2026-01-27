class Computer {
  final String id;
  final String name;
  final String deviceToken;
  final String status;
  final DateTime? lastSeenAt;
  final List<Session> activeSessions;

  Computer({
    required this.id,
    required this.name,
    required this.deviceToken,
    required this.status,
    this.lastSeenAt,
    required this.activeSessions,
  });

  factory Computer.fromJson(Map<String, dynamic> json) {
    return Computer(
      id: json['id'] ?? '',
      name: json['name'] ?? 'Unknown Computer',
      deviceToken: json['deviceToken'] ?? '',
      status: json['status'] ?? 'UNKNOWN',
      lastSeenAt: json['lastSeenAt'] != null ? DateTime.parse(json['lastSeenAt']) : null,
      activeSessions: (json['sessions'] as List<dynamic>?)
          ?.map((s) => Session.fromJson(s))
          .toList() ?? [],
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
    if (activeSessions.isNotEmpty) {
      final session = activeSessions.first;
      if (session.startedAt != null) {
        final duration = DateTime.now().difference(session.startedAt!);
        final minutes = duration.inMinutes;
        return '${minutes}m';
      }
    }
    return null;
  }

  String? get costDisplay {
    if (activeSessions.isNotEmpty) {
      final session = activeSessions.first;
      if (session.startedAt != null) {
        final duration = DateTime.now().difference(session.startedAt!);
        final minutes = duration.inMinutes;
        final cost = minutes * session.pricePerMinute;
        return 'KES ${cost.toStringAsFixed(0)}';
      }
    }
    return null;
  }
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
      startedAt: json['startedAt'] != null ? DateTime.parse(json['startedAt']) : null,
      endedAt: json['endedAt'] != null ? DateTime.parse(json['endedAt']) : null,
      status: json['status'] ?? 'UNKNOWN',
      pricePerMinute: json['pricePerMinute'] ?? 0,
      totalCost: json['totalCost'],
    );
  }

  int get cost => totalCost ?? 0;
}