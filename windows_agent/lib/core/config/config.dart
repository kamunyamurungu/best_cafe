
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';
import 'dart:io';

class Config {
  static const String serverUrlKey = 'server_url';
  static const String defaultServerUrl = 'http://192.168.100.70:3000';
  static const String deviceTokenKey = 'device_token';

  /// Returns the persisted device token, or generates and saves a new one if not present.
  static Future<String> get deviceToken async {
    final prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString(deviceTokenKey);
    if (token == null) {
      token = const Uuid().v4();
      await prefs.setString(deviceTokenKey, token);
    }
    return token;
  }

  static Future<String> get serverUrl async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(serverUrlKey) ?? defaultServerUrl;
  }

  static Future<void> setDeviceToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(deviceTokenKey, token);
  }

  static Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(serverUrlKey, url);
  }

  /// Returns the Windows computer name using environment variable fallback.
  static String get computerName {
    return Platform.environment['COMPUTERNAME'] ?? 'Unknown';
  }
}