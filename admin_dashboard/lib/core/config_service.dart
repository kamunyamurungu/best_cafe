import 'package:shared_preferences/shared_preferences.dart';

class ConfigService {
  static const String _serverUrlKey = 'server_url';
  static const String _defaultServerUrl = 'http://192.168.100.70:3000';
  static const String _aiProviderKey = 'ai_provider';
  static const String _aiApiKey = 'ai_api_key';

  static Future<String> getServerUrl() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_serverUrlKey) ?? _defaultServerUrl;
  }

  static Future<void> setServerUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_serverUrlKey, url);
  }

  static Future<String> getAiProvider() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_aiProviderKey) ?? 'CHATGPT';
  }

  static Future<void> setAiProvider(String provider) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_aiProviderKey, provider);
  }

  static Future<String> getAiApiKey() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_aiApiKey) ?? '';
  }

  static Future<void> setAiApiKey(String apiKey) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_aiApiKey, apiKey);
  }
}