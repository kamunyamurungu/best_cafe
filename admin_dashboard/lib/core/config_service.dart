import 'package:shared_preferences/shared_preferences.dart';

class ConfigService {
  static const String _serverUrlKey = 'server_url';
  static const String _defaultServerUrl = 'http://192.168.100.70:3000';

  static Future<String> getServerUrl() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_serverUrlKey) ?? _defaultServerUrl;
  }

  static Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_serverUrlKey, url);
  }
}