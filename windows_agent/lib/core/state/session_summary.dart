import 'package:shared_preferences/shared_preferences.dart';

class SessionSummary {
  final int minutes;
  final double cost;

  SessionSummary({required this.minutes, required this.cost});
}

class SessionSummaryStore {
  static const _minutesKey = 'lastSessionMinutes';
  static const _costKey = 'lastSessionCost';

  static Future<void> save(SessionSummary summary) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_minutesKey, summary.minutes);
    await prefs.setDouble(_costKey, summary.cost);
  }

  static Future<SessionSummary?> load() async {
    final prefs = await SharedPreferences.getInstance();
    final minutes = prefs.getInt(_minutesKey);
    final cost = prefs.getDouble(_costKey);
    if (minutes == null || cost == null) return null;
    return SessionSummary(minutes: minutes, cost: cost);
  }

  static Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_minutesKey);
    await prefs.remove(_costKey);
  }
}
