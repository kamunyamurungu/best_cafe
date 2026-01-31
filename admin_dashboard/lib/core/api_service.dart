import 'dart:convert';
import 'package:http/http.dart' as http;
import 'config_service.dart';

class ApiService {
  String? _baseUrl;
  String? _token;

  Future<String> get baseUrl async {
    _baseUrl ??= await ConfigService.getServerUrl();
    return _baseUrl!;
  }

  void setToken(String token) {
    _token = token;
  }

  Future<Map<String, String>> get _headers async => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };

  Future<List<dynamic>> getComputers() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/computers'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load computers');
    }
  }

  Future<Map<String, dynamic>> getTodayStats() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/sessions/today'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load stats');
    }
  }

  Future<List<dynamic>> getSessions() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/sessions'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load sessions');
    }
  }

  Future<void> sendCommand(String computerId, String commandType) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/commands'),
      headers: await _headers,
      body: json.encode({
        'computerId': computerId,
        'type': commandType,
      }),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to send command');
    }
  }

  Future<Map<String, dynamic>> createSession(String computerId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/sessions'),
      headers: await _headers,
      body: json.encode({
        'computerId': computerId,
      }),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create session');
    }
  }

  Future<Map<String, dynamic>> startSession(String sessionId) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/sessions/$sessionId/start'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to start session');
    }
  }

  Future<Map<String, dynamic>> endSession(String sessionId) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/sessions/$sessionId/end'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to end session');
    }
  }

  Future<Map<String, dynamic>> pauseSession(String sessionId) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/sessions/$sessionId/pause'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to pause session');
    }
  }

  Future<Map<String, dynamic>> resumeSession(String sessionId) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/sessions/$sessionId/resume'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to resume session');
    }
  }

  Future<Map<String, dynamic>> register(String email, String password, String role) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
        'role': role,
      }),
    );
    if (response.statusCode == 201) {
      final data = json.decode(response.body);
      if (data['accessToken'] != null) {
        setToken(data['accessToken']);
      }
      return data;
    } else {
      throw Exception('Failed to register');
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['accessToken'] != null) {
        setToken(data['accessToken']);
      }
      return data;
    } else {
      throw Exception('Failed to login');
    }
  }

  Future<Map<String, dynamic>> topUp(int amount) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/auth/top-up'),
      headers: await _headers,
      body: json.encode({
        'amount': amount,
      }),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to top up');
    }
  }

  // Pricing
  Future<List<dynamic>> getPricings() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/pricing'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load pricings');
    }
  }

  Future<Map<String, dynamic>> createPricing(int pricePerMinute, bool active) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/pricing'),
      headers: await _headers,
      body: json.encode({
        'pricePerMinute': pricePerMinute,
        'active': active,
      }),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create pricing');
    }
  }

  Future<Map<String, dynamic>> updatePricing(String id, int? pricePerMinute, bool? active) async {
    final url = await baseUrl;
    final body = {};
    if (pricePerMinute != null) body['pricePerMinute'] = pricePerMinute;
    if (active != null) body['active'] = active;
    final response = await http.patch(
      Uri.parse('$url/pricing/$id'),
      headers: await _headers,
      body: json.encode(body),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update pricing');
    }
  }

  // Computers
  Future<Map<String, dynamic>> updateComputer(String id, String name) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/computers/$id'),
      headers: await _headers,
      body: json.encode({'name': name}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update computer');
    }
  }

  // Cyber Centers
  Future<List<dynamic>> getCyberCenters() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/cyber-centers'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load cyber centers');
    }
  }

  Future<Map<String, dynamic>> createCyberCenter(String name, String? location, String organizationId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/cyber-centers'),
      headers: await _headers,
      body: json.encode({
        'name': name,
        'location': location,
        'organizationId': organizationId,
      }),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create cyber center');
    }
  }

  // Users
  Future<List<dynamic>> getUsers() async {
    final url = await baseUrl;
    final response = await http.get(Uri.parse('$url/users'), headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load users');
    }
  }

  Future<Map<String, dynamic>> createUser(String email, String password, String role, String? cyberCenterId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/users'),
      headers: await _headers,
      body: json.encode({
        'email': email,
        'password': password,
        'role': role,
        'cyberCenterId': cyberCenterId,
      }),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create user');
    }
  }

  Future<Map<String, dynamic>> updateUser(String id, String? email, String? password, String? role, int? balance) async {
    final url = await baseUrl;
    final body = {};
    if (email != null) body['email'] = email;
    if (password != null) body['password'] = password;
    if (role != null) body['role'] = role;
    if (balance != null) body['balance'] = balance;
    final response = await http.patch(
      Uri.parse('$url/users/$id'),
      headers: await _headers,
      body: json.encode(body),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update user');
    }
  }
}