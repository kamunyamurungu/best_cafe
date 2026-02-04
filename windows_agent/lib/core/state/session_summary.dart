import 'package:shared_preferences/shared_preferences.dart';

class SessionSummary {
  final int minutes;
  final int seconds; // total duration seconds for exact display
  final double cost;

  SessionSummary({required this.minutes, required this.cost, required this.seconds});
}

class SessionSummaryStore {
  static const _minutesKey = 'lastSessionMinutes';
  static const _costKey = 'lastSessionCost';
  static const _secondsKey = 'lastSessionSeconds';

  static Future<void> save(SessionSummary summary) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_minutesKey, summary.minutes);
    await prefs.setDouble(_costKey, summary.cost);
    await prefs.setInt(_secondsKey, summary.seconds);
  }

  static Future<SessionSummary?> load() async {
    final prefs = await SharedPreferences.getInstance();
    final minutes = prefs.getInt(_minutesKey);
    final cost = prefs.getDouble(_costKey);
    if (minutes == null || cost == null) return null;
    final seconds = prefs.getInt(_secondsKey) ?? (minutes * 60);
    return SessionSummary(minutes: minutes, cost: cost, seconds: seconds);
  }

  static Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_minutesKey);
    await prefs.remove(_costKey);
    await prefs.remove(_secondsKey);
  }
}
