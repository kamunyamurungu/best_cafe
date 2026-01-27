import 'package:flutter_riverpod/flutter_riverpod.dart';
import './api_service.dart';
import './models.dart';
import './socket_service.dart';

// API Service Provider
final apiServiceProvider = Provider<ApiService>((ref) => ApiService());

// Socket Service Provider
final socketServiceProvider = Provider<AdminSocketService>((ref) {
  final computersNotifier = ref.read(computersProvider.notifier);
  final sessionsNotifier = ref.read(sessionsProvider.notifier);

  return AdminSocketService(
    onComputerUpdate: () => computersNotifier.loadComputers(),
    onSessionUpdate: () => sessionsNotifier.loadSessions(),
  );
});

// Computers Provider
final computersProvider = StateNotifierProvider<ComputersNotifier, AsyncValue<List<Computer>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  final sessionsNotifier = ref.read(sessionsProvider.notifier);
  return ComputersNotifier(apiService, sessionsNotifier);
});

class ComputersNotifier extends StateNotifier<AsyncValue<List<Computer>>> {
  final ApiService _apiService;
  final SessionsNotifier _sessionsNotifier;

  ComputersNotifier(this._apiService, this._sessionsNotifier) : super(const AsyncValue.loading()) {
    loadComputers();
  }

  Future<void> loadComputers() async {
    state = const AsyncValue.loading();
    try {
      final computersJson = await _apiService.getComputers();
      final computers = computersJson.map((json) => Computer.fromJson(json)).toList();
      state = AsyncValue.data(computers);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }

  Future<void> sendCommand(String computerId, String commandType) async {
    try {
      await _apiService.sendCommand(computerId, commandType);
      // Reload computers after command
      await loadComputers();
    } catch (error) {
      // Handle error
      rethrow;
    }
  }

  Future<void> startComputer(String computerId) async {
    try {
      // Create session
      final session = await _apiService.createSession(computerId);
      // Start session
      await _apiService.startSession(session['id']);
      // Reload computers and sessions
      await loadComputers();
      _sessionsNotifier.loadSessions();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> unlockComputer(String computerId) async {
    try {
      // Find the active session for this computer
      final sessions = await _apiService.getSessions();
      final activeSession = sessions.firstWhere(
        (s) => s['computerId'] == computerId && s['status'] == 'CREATED',
        orElse: () => null,
      );
      if (activeSession != null) {
        await _apiService.startSession(activeSession['id']);
      }
      // Reload computers and sessions
      await loadComputers();
      _sessionsNotifier.loadSessions();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> stopComputer(String computerId) async {
    try {
      // Find the active session for this computer
      final sessions = await _apiService.getSessions();
      final activeSession = sessions.firstWhere(
        (s) => s['computerId'] == computerId && s['status'] == 'ACTIVE',
        orElse: () => null,
      );
      if (activeSession != null) {
        await _apiService.endSession(activeSession['id']);
      }
      // Reload computers and sessions
      await loadComputers();
      _sessionsNotifier.loadSessions();
    } catch (error) {
      rethrow;
    }
  }
}

// Sessions Provider
final sessionsProvider = StateNotifierProvider<SessionsNotifier, AsyncValue<List<Session>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return SessionsNotifier(apiService);
});

class SessionsNotifier extends StateNotifier<AsyncValue<List<Session>>> {
  final ApiService _apiService;

  SessionsNotifier(this._apiService) : super(const AsyncValue.loading()) {
    loadSessions();
  }

  Future<void> loadSessions() async {
    state = const AsyncValue.loading();
    try {
      final sessionsJson = await _apiService.getSessions();
      final sessions = sessionsJson.map((json) => Session.fromJson(json)).toList();
      state = AsyncValue.data(sessions);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }
}

// Stats Provider
final statsProvider = StateNotifierProvider<StatsNotifier, AsyncValue<Map<String, dynamic>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return StatsNotifier(apiService);
});

class StatsNotifier extends StateNotifier<AsyncValue<Map<String, dynamic>>> {
  final ApiService _apiService;

  StatsNotifier(this._apiService) : super(const AsyncValue.loading()) {
    loadStats();
  }

  Future<void> loadStats() async {
    state = const AsyncValue.loading();
    try {
      final stats = await _apiService.getTodayStats();
      state = AsyncValue.data(stats);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }
}

// Pricings Provider
final pricingsProvider = StateNotifierProvider<PricingsNotifier, AsyncValue<List<Map<String, dynamic>>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return PricingsNotifier(apiService);
});

class PricingsNotifier extends StateNotifier<AsyncValue<List<Map<String, dynamic>>>> {
  final ApiService _apiService;

  PricingsNotifier(this._apiService) : super(const AsyncValue.loading()) {
    loadPricings();
  }

  Future<void> loadPricings() async {
    state = const AsyncValue.loading();
    try {
      final pricings = await _apiService.getPricings();
      state = AsyncValue.data(pricings.cast<Map<String, dynamic>>());
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }

  Future<void> createPricing(int pricePerMinute, bool active) async {
    try {
      await _apiService.createPricing(pricePerMinute, active);
      await loadPricings();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> updatePricing(String id, int? pricePerMinute, bool? active) async {
    try {
      await _apiService.updatePricing(id, pricePerMinute, active);
      await loadPricings();
    } catch (error) {
      rethrow;
    }
  }
}

// Cyber Centers Provider
final cyberCentersProvider = StateNotifierProvider<CyberCentersNotifier, AsyncValue<List<Map<String, dynamic>>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return CyberCentersNotifier(apiService);
});

class CyberCentersNotifier extends StateNotifier<AsyncValue<List<Map<String, dynamic>>>> {
  final ApiService _apiService;

  CyberCentersNotifier(this._apiService) : super(const AsyncValue.loading()) {
    loadCyberCenters();
  }

  Future<void> loadCyberCenters() async {
    state = const AsyncValue.loading();
    try {
      final cyberCenters = await _apiService.getCyberCenters();
      state = AsyncValue.data(cyberCenters.cast<Map<String, dynamic>>());
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }

  Future<void> createCyberCenter(String name, String? location, String organizationId) async {
    try {
      await _apiService.createCyberCenter(name, location, organizationId);
      await loadCyberCenters();
    } catch (error) {
      rethrow;
    }
  }
}

// Users Provider
final usersProvider = StateNotifierProvider<UsersNotifier, AsyncValue<List<Map<String, dynamic>>>>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return UsersNotifier(apiService);
});

class UsersNotifier extends StateNotifier<AsyncValue<List<Map<String, dynamic>>>> {
  final ApiService _apiService;

  UsersNotifier(this._apiService) : super(const AsyncValue.loading()) {
    loadUsers();
  }

  Future<void> loadUsers() async {
    state = const AsyncValue.loading();
    try {
      final users = await _apiService.getUsers();
      state = AsyncValue.data(users.cast<Map<String, dynamic>>());
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
    }
  }

  Future<void> createUser(String email, String password, String role, String? cyberCenterId) async {
    try {
      await _apiService.createUser(email, password, role, cyberCenterId);
      await loadUsers();
    } catch (error) {
      rethrow;
    }
  }

  Future<void> updateUser(String id, String? email, String? password, String? role, int? balance) async {
    try {
      await _apiService.updateUser(id, email, password, role, balance);
      await loadUsers();
    } catch (error) {
      rethrow;
    }
  }
}