import 'package:flutter/material.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_view.dart';

class UsersScreen extends StatefulWidget {
  const UsersScreen({super.key});

  @override
  State<UsersScreen> createState() => _UsersScreenState();
}

class _UsersScreenState extends State<UsersScreen> {
  final ApiService _api = ApiService();
  late Future<List<dynamic>> _usersFuture;
  String _query = '';

  @override
  void initState() {
    super.initState();
    _usersFuture = _api.getUsers();
  }

  void _reload() {
    setState(() {
      _usersFuture = _api.getUsers();
    });
  }

  Future<void> _showCreateDialog() async {
    await _showUserDialog();
    _reload();
  }

  Future<void> _showEditDialog(Map<String, dynamic> user) async {
    await _showUserDialog(user: user);
    _reload();
  }

  Future<void> _showUserDialog({Map<String, dynamic>? user}) async {
    final isEdit = user != null;
    final fullNameController = TextEditingController(text: user?['fullName']);
    final emailController = TextEditingController(text: user?['email']);
    final phoneController = TextEditingController(text: user?['phone']);
    final passwordController = TextEditingController();
    String role = (user?['role'] ?? 'STAFF').toString();
    String status = (user?['status'] ?? 'ACTIVE').toString();

    final studentProfile = user?['studentProfile'] as Map<String, dynamic>?;
    final admissionController = TextEditingController(
      text: studentProfile?['admissionNo']?.toString() ?? '',
    );
    final balanceController = TextEditingController(
      text: studentProfile?['balance']?.toString() ?? '',
    );
    final discountController = TextEditingController(
      text: studentProfile?['discountRate']?.toString() ?? '',
    );

    await showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setStateDialog) => AlertDialog(
          title: Text(isEdit ? 'Edit User' : 'Create User'),
          content: SizedBox(
            width: 420,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextField(
                    controller: fullNameController,
                    decoration: const InputDecoration(labelText: 'Full name'),
                  ),
                  TextField(
                    controller: emailController,
                    decoration: const InputDecoration(labelText: 'Email'),
                  ),
                  TextField(
                    controller: phoneController,
                    decoration: const InputDecoration(labelText: 'Phone'),
                  ),
                  TextField(
                    controller: passwordController,
                    decoration: InputDecoration(
                      labelText: isEdit
                          ? 'New password (optional)'
                          : 'Password',
                    ),
                    obscureText: true,
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    value: role,
                    decoration: const InputDecoration(labelText: 'Role'),
                    items: const [
                      DropdownMenuItem(value: 'ADMIN', child: Text('ADMIN')),
                      DropdownMenuItem(value: 'STAFF', child: Text('STAFF')),
                      DropdownMenuItem(
                        value: 'CUSTOMER',
                        child: Text('CUSTOMER'),
                      ),
                      DropdownMenuItem(
                        value: 'STUDENT',
                        child: Text('STUDENT'),
                      ),
                    ],
                    onChanged: (value) {
                      if (value == null) return;
                      setStateDialog(() => role = value);
                    },
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    value: status,
                    decoration: const InputDecoration(labelText: 'Status'),
                    items: const [
                      DropdownMenuItem(value: 'ACTIVE', child: Text('ACTIVE')),
                      DropdownMenuItem(
                        value: 'SUSPENDED',
                        child: Text('SUSPENDED'),
                      ),
                    ],
                    onChanged: (value) {
                      if (value == null) return;
                      setStateDialog(() => status = value);
                    },
                  ),
                  const SizedBox(height: 16),
                  if (role == 'STUDENT') ...[
                    TextField(
                      controller: admissionController,
                      decoration: const InputDecoration(
                        labelText: 'Admission number',
                      ),
                    ),
                    TextField(
                      controller: balanceController,
                      decoration: const InputDecoration(
                        labelText: 'Student balance',
                      ),
                      keyboardType: TextInputType.number,
                    ),
                    TextField(
                      controller: discountController,
                      decoration: const InputDecoration(
                        labelText: 'Discount rate (0-1)',
                      ),
                      keyboardType: TextInputType.number,
                    ),
                  ],
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final fullName = fullNameController.text.trim();
                final email = emailController.text.trim();
                final phone = phoneController.text.trim();
                final password = passwordController.text.trim();
                if (fullName.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Full name is required.')),
                  );
                  return;
                }
                if (!isEdit && password.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Password is required.')),
                  );
                  return;
                }

                final admissionNo = admissionController.text.trim();
                final balance = int.tryParse(balanceController.text.trim());
                final discount = double.tryParse(
                  discountController.text.trim(),
                );

                try {
                  if (isEdit) {
                    await _api.updateUser(
                      id: user!['id'],
                      fullName: fullName,
                      email: email.isEmpty ? null : email,
                      phone: phone.isEmpty ? null : phone,
                      password: password.isEmpty ? null : password,
                      role: role,
                      status: status,
                      admissionNo: role == 'STUDENT' && admissionNo.isNotEmpty
                          ? admissionNo
                          : null,
                      studentBalance: role == 'STUDENT' ? balance : null,
                      discountRate: role == 'STUDENT' ? discount : null,
                    );
                  } else {
                    await _api.createUser(
                      fullName: fullName,
                      password: password,
                      email: email.isEmpty ? null : email,
                      phone: phone.isEmpty ? null : phone,
                      role: role,
                      status: status,
                      admissionNo: role == 'STUDENT' && admissionNo.isNotEmpty
                          ? admissionNo
                          : null,
                      studentBalance: role == 'STUDENT' ? balance : null,
                      discountRate: role == 'STUDENT' ? discount : null,
                    );
                  }
                  if (!context.mounted) return;
                  Navigator.of(context).pop();
                } catch (error) {
                  if (!context.mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Save failed: $error')),
                  );
                }
              },
              child: Text(isEdit ? 'Save' : 'Create'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _confirmDelete(Map<String, dynamic> user) async {
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete user'),
        content: Text('Delete ${user['fullName']}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              try {
                await _api.deleteUser(user['id']);
                if (!context.mounted) return;
                Navigator.of(context).pop();
                _reload();
              } catch (error) {
                if (!context.mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Delete failed: $error')),
                );
              }
            },
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _filterUsers(List<dynamic> users) {
    if (_query.isEmpty) return users.cast<Map<String, dynamic>>();
    return users.cast<Map<String, dynamic>>().where((user) {
      final haystack = [
        user['fullName'],
        user['email'],
        user['phone'],
        user['role'],
      ].whereType<String>().join(' ').toLowerCase();
      return haystack.contains(_query.toLowerCase());
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Users'),
        actions: [
          IconButton(onPressed: _reload, icon: const Icon(Icons.refresh)),
          IconButton(
            onPressed: _showCreateDialog,
            icon: const Icon(Icons.person_add),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(
                labelText: 'Search users',
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (value) => setState(() => _query = value),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: FutureBuilder<List<dynamic>>(
                future: _usersFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return ErrorView(error: snapshot.error!);
                  }
                  final items = _filterUsers(snapshot.data ?? []);
                  if (items.isEmpty) {
                    return const Center(child: Text('No users found.'));
                  }
                  return ListView.builder(
                    itemCount: items.length,
                    itemBuilder: (context, index) {
                      final user = items[index];
                      final studentProfile =
                          user['studentProfile'] as Map<String, dynamic>?;
                      final subtitle = [
                        if (user['email'] != null) user['email'],
                        if (user['phone'] != null) user['phone'],
                        'Role: ${user['role']}',
                        'Status: ${user['status']}',
                        if (studentProfile != null)
                          'Student balance: ${studentProfile['balance']} • Discount: ${studentProfile['discountRate'] ?? 0}',
                      ].join(' | ');
                      return Card(
                        child: ListTile(
                          title: Text(user['fullName'] ?? 'Unnamed'),
                          subtitle: Text(subtitle),
                          trailing: Wrap(
                            spacing: 8,
                            children: [
                              IconButton(
                                icon: const Icon(Icons.edit),
                                onPressed: () => _showEditDialog(user),
                              ),
                              IconButton(
                                icon: const Icon(Icons.delete),
                                onPressed: () => _confirmDelete(user),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
