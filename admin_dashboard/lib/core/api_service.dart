import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'config_service.dart';
import 'errors/app_error.dart';
import 'errors/error_mapper.dart';

class ApiService {
  String? _baseUrl;
  String? _token;
  static const _govServicesCacheKey = 'cache_gov_services';
  static const _shortcutsCacheKey = 'cache_shortcuts';
  static const _tokenKey = 'auth_token';
  static void Function()? onUnauthorized;

  Future<String> get baseUrl async {
    _baseUrl ??= await ConfigService.getServerUrl();
    return _baseUrl!;
  }

  void setToken(String token) {
    _token = token;
  }

  Future<void> loadToken() async {
    if (_token != null) return;
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
  }

  Future<void> persistToken(String token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<void> clearToken() async {
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  Future<bool> hasToken() async {
    await loadToken();
    return _token != null && _token!.isNotEmpty;
  }

  Future<void> _ensureTokenLoaded() async {
    if (_token == null) {
      await loadToken();
    }
  }

  Future<Map<String, String>> get _headers async {
    await _ensureTokenLoaded();
    return {
      'Content-Type': 'application/json',
      if (_token != null) 'Authorization': 'Bearer $_token',
    };
  }

  Future<AppError> _mapError(http.Response response) async {
    if (response.statusCode == 401) {
      await clearToken();
      onUnauthorized?.call();
    }
    return ErrorMapper.fromResponse(response);
  }

  Future<Never> _throwMapped(http.Response response) async {
    throw await _mapError(response);
  }

  Future<List<dynamic>> getComputers() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/computers'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> getTodayStats() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/sessions/today'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<List<dynamic>> getGovServices() async {
    final url = await baseUrl;
    try {
      final response = await http.get(
        Uri.parse('$url/gov-services'),
        headers: await _headers,
      );
      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List<dynamic>;
        await _writeCache(_govServicesCacheKey, response.body);
        return data;
      }
      return _throwMapped(response);
    } catch (error) {
      final cached = await _readCache(_govServicesCacheKey);
      if (cached != null) {
        return json.decode(cached) as List<dynamic>;
      }
      throw ErrorMapper.fromException(error);
    }
  }

  Future<List<dynamic>> getActiveGovUsage() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/gov-services/active'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body) as List<dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> startGovService(String serviceId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/gov-services/$serviceId/start'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> endGovService(String usageId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/gov-services/$usageId/end'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<List<dynamic>> getShortcuts() async {
    final url = await baseUrl;
    try {
      final response = await http.get(
        Uri.parse('$url/shortcuts'),
        headers: await _headers,
      );
      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List<dynamic>;
        await _writeCache(_shortcutsCacheKey, response.body);
        return data;
      }
      return _throwMapped(response);
    } catch (error) {
      final cached = await _readCache(_shortcutsCacheKey);
      if (cached != null) {
        return json.decode(cached) as List<dynamic>;
      }
      throw ErrorMapper.fromException(error);
    }
  }

  Future<Map<String, dynamic>> createShortcut(
    Map<String, dynamic> payload,
  ) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/shortcuts'),
      headers: await _headers,
      body: json.encode(payload),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> updateShortcut(
    String id,
    Map<String, dynamic> payload,
  ) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/shortcuts/$id'),
      headers: await _headers,
      body: json.encode(payload),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> useShortcut(String id) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/shortcuts/$id/use'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<List<dynamic>> getSessions() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/sessions'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<void> sendCommand(String computerId, String commandType) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/commands'),
      headers: await _headers,
      body: json.encode({'computerId': computerId, 'type': commandType}),
    );
    if (response.statusCode != 201) {
      throw await _mapError(response);
    }
  }

  Future<Map<String, dynamic>> createSession(String computerId) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/sessions'),
      headers: await _headers,
      body: json.encode({'computerId': computerId}),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
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
    }
    return _throwMapped(response);
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
    }
    return _throwMapped(response);
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
    }
    return _throwMapped(response);
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
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> register({
    required String fullName,
    required String password,
    String? email,
    String? phone,
    String? role,
  }) async {
    final url = await baseUrl;
    final body = {
      'fullName': fullName,
      'password': password,
      if (email != null && email.isNotEmpty) 'email': email,
      if (phone != null && phone.isNotEmpty) 'phone': phone,
      if (role != null) 'role': role,
    };
    final response = await http.post(
      Uri.parse('$url/auth/register'),
      headers: await _headers,
      body: json.encode(body),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> bootstrapAdmin({
    required String fullName,
    required String password,
    String? email,
    String? phone,
  }) async {
    final url = await baseUrl;
    final body = {
      'fullName': fullName,
      'password': password,
      if (email != null && email.isNotEmpty) 'email': email,
      if (phone != null && phone.isNotEmpty) 'phone': phone,
    };
    final response = await http.post(
      Uri.parse('$url/auth/bootstrap'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(body),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      final data = json.decode(response.body) as Map<String, dynamic>;
      if (data['accessToken'] != null) {
        await persistToken(data['accessToken']);
      }
      return data;
    } else {
      throw Exception('Failed to bootstrap admin');
    }
  }

  Future<Map<String, dynamic>> login(String identifier, String password) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'identifier': identifier, 'password': password}),
    );
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final data = json.decode(response.body);
      if (data['accessToken'] != null) {
        await persistToken(data['accessToken']);
      }
      return data;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> getProfile() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/auth/profile'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<List<dynamic>> getUsers() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/users'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body) as List<dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> createUser({
    required String fullName,
    required String password,
    String? email,
    String? phone,
    required String role,
    String? status,
    String? admissionNo,
    int? studentBalance,
    double? discountRate,
  }) async {
    final url = await baseUrl;
    final body = <String, dynamic>{
      'fullName': fullName,
      'password': password,
      'role': role,
    };
    if (email != null && email.isNotEmpty) body['email'] = email;
    if (phone != null && phone.isNotEmpty) body['phone'] = phone;
    if (status != null) body['status'] = status;
    if (admissionNo != null && admissionNo.isNotEmpty) {
      body['admissionNo'] = admissionNo;
    }
    if (studentBalance != null) body['studentBalance'] = studentBalance;
    if (discountRate != null) body['discountRate'] = discountRate;

    final response = await http.post(
      Uri.parse('$url/users'),
      headers: await _headers,
      body: json.encode(body),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> updateUser({
    required String id,
    String? fullName,
    String? email,
    String? phone,
    String? password,
    String? role,
    String? status,
    String? admissionNo,
    int? studentBalance,
    double? discountRate,
  }) async {
    final url = await baseUrl;
    final body = <String, dynamic>{};
    if (fullName != null) body['fullName'] = fullName;
    if (email != null) body['email'] = email;
    if (phone != null) body['phone'] = phone;
    if (password != null && password.isNotEmpty) body['password'] = password;
    if (role != null) body['role'] = role;
    if (status != null) body['status'] = status;
    if (admissionNo != null) body['admissionNo'] = admissionNo;
    if (studentBalance != null) body['studentBalance'] = studentBalance;
    if (discountRate != null) body['discountRate'] = discountRate;

    final response = await http.patch(
      Uri.parse('$url/users/$id'),
      headers: await _headers,
      body: json.encode(body),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body) as Map<String, dynamic>;
    }
    return _throwMapped(response);
  }

  Future<void> deleteUser(String id) async {
    final url = await baseUrl;
    final response = await http.delete(
      Uri.parse('$url/users/$id'),
      headers: await _headers,
    );
    if (response.statusCode != 200) {
      throw await _mapError(response);
    }
  }

  Future<Map<String, dynamic>> topUp(int amount) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/auth/top-up'),
      headers: await _headers,
      body: json.encode({'amount': amount}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  // Pricing
  Future<List<dynamic>> getPricings() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/pricing'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> createPricing(
    int pricePerMinute,
    bool active,
  ) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/pricing'),
      headers: await _headers,
      body: json.encode({'pricePerMinute': pricePerMinute, 'active': active}),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> updatePricing(
    String id,
    int? pricePerMinute,
    bool? active,
  ) async {
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
    }
    return _throwMapped(response);
  }

  Future<void> _writeCache(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, value);
  }

  Future<String?> _readCache(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
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
    }
    return _throwMapped(response);
  }

  // Cyber Centers
  Future<List<dynamic>> getCyberCenters() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/cyber-centers'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    return _throwMapped(response);
  }

  Future<Map<String, dynamic>> createCyberCenter(
    String name,
    String? location,
    String organizationId,
  ) async {
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
    }
    return _throwMapped(response);
  }

  // Print Jobs
  Future<List<dynamic>> getPrintJobs({
    String? status,
    String? computerId,
    String? sessionId,
  }) async {
    final url = await baseUrl;
    final params = <String, String>{};
    if (status != null) params['status'] = status;
    if (computerId != null) params['computerId'] = computerId;
    if (sessionId != null) params['sessionId'] = sessionId;
    final uri = Uri.parse(
      '$url/print-jobs',
    ).replace(queryParameters: params.isEmpty ? null : params);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load print jobs');
    }
  }

  Future<List<dynamic>> getPendingPrintJobs() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/print-jobs/pending'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load pending print jobs');
    }
  }

  Future<Map<String, dynamic>> approvePrintJob(String id) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/print-jobs/$id/approve'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to approve print job');
    }
  }

  Future<Map<String, dynamic>> rejectPrintJob(String id) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/print-jobs/$id/reject'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to reject print job');
    }
  }

  Future<Map<String, dynamic>> markPrintJobPrinted(String id) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/print-jobs/$id/printed'),
      headers: await _headers,
      body: json.encode({}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to mark print job printed');
    }
  }

  // Print Pricing
  Future<List<dynamic>> getPrintPricing({String? type}) async {
    final url = await baseUrl;
    final uri = Uri.parse(
      '$url/print-pricing',
    ).replace(queryParameters: type != null ? {'type': type} : null);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load print pricing');
    }
  }

  Future<Map<String, dynamic>> createPrintPricing(
    String type,
    int pricePerPage,
  ) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/print-pricing'),
      headers: await _headers,
      body: json.encode({'type': type, 'pricePerPage': pricePerPage}),
    );
    if (response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create print pricing');
    }
  }

  // Transactions
  Future<List<dynamic>> getTransactions({
    String? status,
    String? computerId,
    String? sessionId,
    String? type,
  }) async {
    final url = await baseUrl;
    final params = <String, String>{};
    if (status != null) params['status'] = status;
    if (computerId != null) params['computerId'] = computerId;
    if (sessionId != null) params['sessionId'] = sessionId;
    if (type != null) params['type'] = type;
    final uri = Uri.parse(
      '$url/transactions',
    ).replace(queryParameters: params.isEmpty ? null : params);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load transactions');
    }
  }

  Future<Map<String, dynamic>> createReceipt({
    required List<String> transactionIds,
    required String paymentMethod,
    String? issuedBy,
  }) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/receipts'),
      headers: await _headers,
      body: json.encode({
        'transactionIds': transactionIds,
        'paymentMethod': paymentMethod,
        if (issuedBy != null) 'issuedBy': issuedBy,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create receipt');
    }
  }

  Future<List<dynamic>> getReceipts() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/receipts'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load receipts');
    }
  }

  Future<Map<String, dynamic>> getDailyTotals({String? date}) async {
    final url = await baseUrl;
    final uri = Uri.parse(
      '$url/receipts/daily-totals',
    ).replace(queryParameters: date != null ? {'date': date} : null);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load daily totals');
    }
  }

  // Printers
  Future<List<dynamic>> getPrinters({String? computerId}) async {
    final url = await baseUrl;
    final uri = Uri.parse('$url/printers').replace(
      queryParameters: computerId != null ? {'computerId': computerId} : null,
    );
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load printers');
    }
  }

  Future<Map<String, dynamic>> setDefaultPrinter(
    String computerId,
    String printerName,
  ) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/printers/default'),
      headers: await _headers,
      body: json.encode({'computerId': computerId, 'printerName': printerName}),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to set default printer');
    }
  }

  // SNMP Metrics
  Future<Map<String, dynamic>> getSnmpDailyTotals({String? date}) async {
    final url = await baseUrl;
    final uri = Uri.parse(
      '$url/snmp/daily-totals',
    ).replace(queryParameters: date != null ? {'date': date} : null);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load SNMP totals');
    }
  }

  Future<List<dynamic>> getSnmpDevices() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/snmp/devices'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load SNMP devices');
    }
  }

  Future<Map<String, dynamic>> createSnmpDevice({
    required String name,
    required String host,
    required String community,
    required String scanOid,
    required String copyOid,
  }) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/snmp/devices'),
      headers: await _headers,
      body: json.encode({
        'name': name,
        'host': host,
        'community': community,
        'scanOid': scanOid,
        'copyOid': copyOid,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create SNMP device');
    }
  }

  Future<Map<String, dynamic>> updateSnmpDevice({
    required String id,
    String? name,
    String? host,
    String? community,
    String? scanOid,
    String? copyOid,
    bool? enabled,
  }) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/snmp/devices'),
      headers: await _headers,
      body: json.encode({
        'id': id,
        if (name != null) 'name': name,
        if (host != null) 'host': host,
        if (community != null) 'community': community,
        if (scanOid != null) 'scanOid': scanOid,
        if (copyOid != null) 'copyOid': copyOid,
        if (enabled != null) 'enabled': enabled,
      }),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update SNMP device');
    }
  }

  // AI Services
  Future<List<dynamic>> getAiServices({String? category}) async {
    final url = await baseUrl;
    final uri = Uri.parse('$url/ai/services').replace(
      queryParameters: category != null ? {'category': category} : null,
    );
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load AI services');
    }
  }

  Future<Map<String, dynamic>> createAiService({
    required String name,
    required String category,
    required String pricingModel,
    required int unitPrice,
    String? aiTemplateId,
    bool? isActive,
  }) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/ai/services'),
      headers: await _headers,
      body: json.encode({
        'name': name,
        'category': category,
        'pricingModel': pricingModel,
        'unitPrice': unitPrice,
        'aiTemplateId': aiTemplateId,
        'isActive': isActive,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create AI service');
    }
  }

  Future<Map<String, dynamic>> updateAiService({
    required String id,
    String? name,
    String? category,
    String? pricingModel,
    int? unitPrice,
    String? aiTemplateId,
    bool? isActive,
  }) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/ai/services/$id'),
      headers: await _headers,
      body: json.encode({
        if (name != null) 'name': name,
        if (category != null) 'category': category,
        if (pricingModel != null) 'pricingModel': pricingModel,
        if (unitPrice != null) 'unitPrice': unitPrice,
        'aiTemplateId': aiTemplateId,
        if (isActive != null) 'isActive': isActive,
      }),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update AI service');
    }
  }

  Future<List<dynamic>> getAiTemplates() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/ai/templates'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception(
        'Failed to load AI templates: ${response.statusCode} ${response.body}',
      );
    }
  }

  Future<Map<String, dynamic>> createAiTemplate({
    required String name,
    required String systemPrompt,
    required Map<String, String> userPromptSchema,
    required String outputFormat,
    bool? isActive,
  }) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/ai/templates'),
      headers: await _headers,
      body: json.encode({
        'name': name,
        'systemPrompt': systemPrompt,
        'userPromptSchema': userPromptSchema,
        'outputFormat': outputFormat,
        'isActive': isActive,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create AI template');
    }
  }

  Future<Map<String, dynamic>> updateAiTemplate({
    required String id,
    String? name,
    String? systemPrompt,
    Map<String, String>? userPromptSchema,
    String? outputFormat,
    bool? isActive,
  }) async {
    final url = await baseUrl;
    final response = await http.patch(
      Uri.parse('$url/ai/templates/$id'),
      headers: await _headers,
      body: json.encode({
        if (name != null) 'name': name,
        if (systemPrompt != null) 'systemPrompt': systemPrompt,
        if (userPromptSchema != null) 'userPromptSchema': userPromptSchema,
        if (outputFormat != null) 'outputFormat': outputFormat,
        if (isActive != null) 'isActive': isActive,
      }),
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to update AI template');
    }
  }

  Future<List<dynamic>> getAiJobs() async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/ai/jobs'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception(
        'Failed to load AI jobs: ${response.statusCode} ${response.body}',
      );
    }
  }

  Future<Map<String, dynamic>> getAiJob(String id) async {
    final url = await baseUrl;
    final response = await http.get(
      Uri.parse('$url/ai/jobs/$id'),
      headers: await _headers,
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load AI job');
    }
  }

  Future<Map<String, dynamic>> createAiJob({
    required String serviceId,
    String? templateId,
    required Map<String, dynamic> inputData,
    String? createdById,
  }) async {
    final url = await baseUrl;
    final response = await http.post(
      Uri.parse('$url/ai/jobs'),
      headers: await _headers,
      body: json.encode({
        'serviceId': serviceId,
        if (templateId != null) 'templateId': templateId,
        'inputData': inputData,
        if (createdById != null) 'createdById': createdById,
      }),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to create AI job');
    }
  }

  Future<List<dynamic>> getRecords({String? type}) async {
    final url = await baseUrl;
    final uri = Uri.parse(
      '$url/records',
    ).replace(queryParameters: type != null ? {'type': type} : null);
    final response = await http.get(uri, headers: await _headers);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception(
        'Failed to load records: ${response.statusCode} ${response.body}',
      );
    }
  }
}
