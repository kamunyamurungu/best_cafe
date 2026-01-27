import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../core/models.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pricingsAsync = ref.watch(pricingsProvider);
    final computersAsync = ref.watch(computersProvider);
    final cyberCentersAsync = ref.watch(cyberCentersProvider);
    final usersAsync = ref.watch(usersProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: ListView(
        children: [
          _buildServerSettingsSection(context),
          _buildSection('Pricing', [
            pricingsAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => Text('Error: $error'),
              data: (pricings) => Column(
                children: [
                  ...pricings.map((pricing) => ListTile(
                    title: Text('Price per minute: KES ${pricing['pricePerMinute']}'),
                    subtitle: Text('Active: ${pricing['active']}'),
                    trailing: ElevatedButton(
                      onPressed: () => _showUpdatePricingDialog(context, ref, pricing),
                      child: const Text('UPDATE'),
                    ),
                  )),
                  ListTile(
                    title: const Text('Add New Pricing'),
                    trailing: ElevatedButton(
                      onPressed: () => _showAddPricingDialog(context, ref),
                      child: const Text('ADD'),
                    ),
                  ),
                ],
              ),
            ),
          ]),
          _buildSection('Computers', [
            computersAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => Text('Error: $error'),
              data: (computers) => Column(
                children: computers.map((computer) => ListTile(
                  title: Text(computer.name),
                  subtitle: Text('Status: ${computer.status}'),
                  trailing: ElevatedButton(
                    onPressed: () => _showEditComputerDialog(context, ref, computer),
                    child: const Text('EDIT'),
                  ),
                )).toList(),
              ),
            ),
          ]),
          _buildSection('Cyber Center', [
            cyberCentersAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => Text('Error: $error'),
              data: (cyberCenters) => Column(
                children: [
                  ...cyberCenters.map((center) => ListTile(
                    title: Text(center['name']),
                    subtitle: Text('Location: ${center['location'] ?? 'N/A'}'),
                  )),
                  ListTile(
                    title: const Text('Add New Cyber Center'),
                    trailing: ElevatedButton(
                      onPressed: () => _showAddCyberCenterDialog(context, ref),
                      child: const Text('ADD'),
                    ),
                  ),
                ],
              ),
            ),
          ]),
          _buildSection('Users', [
            usersAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => Text('Error: $error'),
              data: (users) => Column(
                children: [
                  ...users.map((user) => ListTile(
                    title: Text(user['email']),
                    subtitle: Text('Role: ${user['role']} | Balance: KES ${user['balance']}'),
                    trailing: ElevatedButton(
                      onPressed: () => _showEditUserDialog(context, ref, user),
                      child: const Text('EDIT'),
                    ),
                  )),
                  ListTile(
                    title: const Text('Add New User'),
                    trailing: ElevatedButton(
                      onPressed: () => _showAddUserDialog(context, ref),
                      child: const Text('ADD'),
                    ),
                  ),
                ],
              ),
            ),
          ]),
          _buildSection('Security', [
            ListTile(
              title: const Text('Change Password'),
              onTap: () => _showChangePasswordDialog(context, ref),
            ),
          ]),
        ],
      ),
    );
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        ...children,
        const Divider(),
      ],
    );
  }

  void _showAddPricingDialog(BuildContext context, WidgetRef ref) {
    final priceController = TextEditingController();
    bool active = false;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Add Pricing'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: priceController,
                decoration: const InputDecoration(labelText: 'Price per minute'),
                keyboardType: TextInputType.number,
              ),
              CheckboxListTile(
                title: const Text('Active'),
                value: active,
                onChanged: (value) => setState(() => active = value ?? false),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final price = int.tryParse(priceController.text);
                if (price != null) {
                  try {
                    await ref.read(pricingsProvider.notifier).createPricing(price, active);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Pricing added')),
                      );
                    }
                  } catch (error) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Error: $error')),
                      );
                    }
                  }
                }
              },
              child: const Text('Add'),
            ),
          ],
        ),
      ),
    );
  }

  void _showUpdatePricingDialog(BuildContext context, WidgetRef ref, Map<String, dynamic> pricing) {
    final priceController = TextEditingController(text: pricing['pricePerMinute'].toString());
    bool active = pricing['active'];

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Update Pricing'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: priceController,
                decoration: const InputDecoration(labelText: 'Price per minute'),
                keyboardType: TextInputType.number,
              ),
              CheckboxListTile(
                title: const Text('Active'),
                value: active,
                onChanged: (value) => setState(() => active = value ?? false),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final price = int.tryParse(priceController.text);
                if (price != null) {
                  try {
                    await ref.read(pricingsProvider.notifier).updatePricing(pricing['id'], price, active);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Pricing updated')),
                      );
                    }
                  } catch (error) {
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Error: $error')),
                      );
                    }
                  }
                }
              },
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }

  void _showEditComputerDialog(BuildContext context, WidgetRef ref, Computer computer) {
    final nameController = TextEditingController(text: computer.name);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Computer'),
        content: TextField(
          controller: nameController,
          decoration: const InputDecoration(labelText: 'Computer Name'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              try {
                await ref.read(apiServiceProvider).updateComputer(computer.id, nameController.text);
                ref.invalidate(computersProvider);
                if (context.mounted) {
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Computer updated')),
                  );
                }
              } catch (error) {
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Error: $error')),
                  );
                }
              }
            },
            child: const Text('Update'),
          ),
        ],
      ),
    );
  }

  void _showAddCyberCenterDialog(BuildContext context, WidgetRef ref) {
    final nameController = TextEditingController();
    final locationController = TextEditingController();
    // Assume organizationId is fixed for now
    const organizationId = 'default-org'; // TODO: get from API

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Cyber Center'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: locationController,
              decoration: const InputDecoration(labelText: 'Location'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              try {
                await ref.read(cyberCentersProvider.notifier).createCyberCenter(
                  nameController.text,
                  locationController.text.isEmpty ? null : locationController.text,
                  organizationId,
                );
                if (context.mounted) {
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Cyber center added')),
                  );
                }
              } catch (error) {
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Error: $error')),
                  );
                }
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }

  void _showAddUserDialog(BuildContext context, WidgetRef ref) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    String role = 'USER';

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Add User'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              TextField(
                controller: passwordController,
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              DropdownButtonFormField<String>(
                initialValue: role,
                items: ['ADMIN', 'STAFF', 'USER'].map((r) => DropdownMenuItem(value: r, child: Text(r))).toList(),
                onChanged: (value) => setState(() => role = value!),
                decoration: const InputDecoration(labelText: 'Role'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                try {
                  await ref.read(usersProvider.notifier).createUser(
                    emailController.text,
                    passwordController.text,
                    role,
                    null, // cyberCenterId
                  );
                  if (context.mounted) {
                    Navigator.of(context).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('User added')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: $error')),
                    );
                  }
                }
              },
              child: const Text('Add'),
            ),
          ],
        ),
      ),
    );
  }

  void _showEditUserDialog(BuildContext context, WidgetRef ref, Map<String, dynamic> user) {
    final emailController = TextEditingController(text: user['email']);
    final passwordController = TextEditingController();
    String role = user['role'];
    final balanceController = TextEditingController(text: user['balance'].toString());

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Edit User'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'Email'),
              ),
              TextField(
                controller: passwordController,
                decoration: const InputDecoration(labelText: 'New Password (leave empty to keep)'),
                obscureText: true,
              ),
              DropdownButtonFormField<String>(
                initialValue: role,
                items: ['ADMIN', 'STAFF', 'USER'].map((r) => DropdownMenuItem(value: r, child: Text(r))).toList(),
                onChanged: (value) => setState(() => role = value!),
                decoration: const InputDecoration(labelText: 'Role'),
              ),
              TextField(
                controller: balanceController,
                decoration: const InputDecoration(labelText: 'Balance'),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final balance = int.tryParse(balanceController.text);
                try {
                  await ref.read(usersProvider.notifier).updateUser(
                    user['id'],
                    emailController.text,
                    passwordController.text.isEmpty ? null : passwordController.text,
                    role,
                    balance,
                  );
                  if (context.mounted) {
                    Navigator.of(context).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('User updated')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: $error')),
                    );
                  }
                }
              },
              child: const Text('Update'),
            ),
          ],
        ),
      ),
    );
  }

  void _showChangePasswordDialog(BuildContext context, WidgetRef ref) {
    final oldPasswordController = TextEditingController();
    final newPasswordController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Change Password'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: oldPasswordController,
              decoration: const InputDecoration(labelText: 'Old Password'),
              obscureText: true,
            ),
            TextField(
              controller: newPasswordController,
              decoration: const InputDecoration(labelText: 'New Password'),
              obscureText: true,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              // TODO: Implement change password API
              if (context.mounted) {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Password changed (not implemented yet)')),
                );
              }
            },
            child: const Text('Change'),
          ),
        ],
      ),
    );
  }

  Widget _buildServerSettingsSection(BuildContext context) {
    return _buildSection('Server Settings', [
      FutureBuilder<String>(
        future: ConfigService.getServerUrl(),
        builder: (context, snapshot) {
          final currentUrl = snapshot.data ?? 'Loading...';
          return ListTile(
            title: const Text('Server URL'),
            subtitle: Text(currentUrl),
            trailing: ElevatedButton(
              onPressed: () => _showEditServerUrlDialog(context),
              child: const Text('EDIT'),
            ),
          );
        },
      ),
    ]);
  }

  void _showEditServerUrlDialog(BuildContext context) async {
    final controller = TextEditingController(text: await ConfigService.getServerUrl());
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Server URL'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(labelText: 'Server URL'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              await ConfigService.setServerUrl(controller.text);
              if (context.mounted) {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Server URL updated. Restart the app to apply changes.')),
                );
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }
}