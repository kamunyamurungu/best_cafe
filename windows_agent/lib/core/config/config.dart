
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';
import 'dart:io';

class Config {
  static const String serverUrlKey = 'server_url';
  static const String defaultServerUrl = 'http://192.168.100.70:3000';
  static const String deviceTokenKey = 'device_token';
  static String? _cachedToken;
  static String? _cachedServerUrl;

  /// Returns the persisted device token, or generates and saves a new one if not present.
  static Future<String> get deviceToken async {
    if (_cachedToken != null && _cachedToken!.trim().isNotEmpty) {
      return _cachedToken!;
    }
    try {
      final prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString(deviceTokenKey);
      if (token == null || token.trim().isEmpty) {
        // Deterministic fallback based on computer name to avoid duplicates across reconnects
        final name = computerName;
        token = const Uuid().v5(Uuid.NAMESPACE_URL, 'best_cafe:$name');
        try {
          await prefs.setString(deviceTokenKey, token);
        } catch (_) {}
      }
      _cachedToken = token;
      return token;
    } catch (_) {
      // Preferences unavailable -> deterministic per-machine fallback
      final name = computerName;
      _cachedToken = const Uuid().v5(Uuid.NAMESPACE_URL, 'best_cafe:$name');
      return _cachedToken!;
    }
  }

  static Future<String> get serverUrl async {
    if (_cachedServerUrl != null && _cachedServerUrl!.trim().isNotEmpty) {
      return _cachedServerUrl!;
    }
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(serverUrlKey);
      final url = (raw ?? defaultServerUrl).trim();
      _cachedServerUrl = url.isEmpty ? defaultServerUrl : url;
      return _cachedServerUrl!;
    } catch (_) {
      // Fallback to default if preferences cannot be read
      _cachedServerUrl = defaultServerUrl;
      return _cachedServerUrl!;
    }
  }

  static Future<void> setDeviceToken(String token) async {
    _cachedToken = token;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(deviceTokenKey, token);
    } catch (_) {}
  }

  static Future<void> setServerUrl(String url) async {
    _cachedServerUrl = url.trim();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(serverUrlKey, _cachedServerUrl!);
    } catch (_) {}
  }

  /// Returns the Windows computer name using environment variable fallback.
  static String get computerName {
    return Platform.environment['COMPUTERNAME'] ?? 'Unknown';
  }
}