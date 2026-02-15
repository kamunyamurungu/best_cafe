import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../core/models.dart';
import '../../core/api_service.dart';
import '../../core/config_service.dart';
import '../../core/ui/error_handler.dart';
import '../../core/ui/error_view.dart';
import '../../core/errors/app_error.dart';
import '../snmp/snmp_screen.dart';
import '../users/users_screen.dart';

class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  final ApiService _api = ApiService();
  late Future<List<ShortcutItem>> _shortcutsFuture;

  @override
  void initState() {
    super.initState();
    _shortcutsFuture = _loadShortcuts();
  }

  Future<List<ShortcutItem>> _loadShortcuts() async {
    final items = await _api.getShortcuts();
    return items.map((e) => ShortcutItem.fromJson(e)).toList();
  }

  void _refreshShortcuts() {
    setState(() {
      _shortcutsFuture = _loadShortcuts();
    });
  }

  @override
  Widget build(BuildContext context) {
    final pricingsAsync = ref.watch(pricingsProvider);
    final computersAsync = ref.watch(computersProvider);
    final cyberCentersAsync = ref.watch(cyberCentersProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          _buildServerSettingsSection(context),
          _buildAiSettingsSection(context),
          _buildSnmpSettingsSection(context),
          _buildSection('Pricing', [
            pricingsAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => ErrorView(error: error),
              data: (pricings) => Column(
                children: [
                  ...pricings.map(
                    (pricing) => ListTile(
                      title: Text(
                        'Price per minute: KES ${pricing['pricePerMinute']}',
                      ),
                      subtitle: Text('Active: ${pricing['active']}'),
                      trailing: ElevatedButton(
                        onPressed: () =>
                            _showUpdatePricingDialog(context, ref, pricing),
                        child: const Text('UPDATE'),
                      ),
                    ),
                  ),
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
              error: (error, stack) => ErrorView(error: error),
              data: (computers) => Column(
                children: computers
                    .map(
                      (computer) => ListTile(
                        title: Text(computer.name),
                        subtitle: Text('Status: ${computer.status}'),
                        trailing: ElevatedButton(
                          onPressed: () =>
                              _showEditComputerDialog(context, ref, computer),
                          child: const Text('EDIT'),
                        ),
                      ),
                    )
                    .toList(),
              ),
            ),
          ]),
          _buildSection('Cyber Center', [
            cyberCentersAsync.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stack) => ErrorView(error: error),
              data: (cyberCenters) => Column(
                children: [
                  ...cyberCenters.map(
                    (center) => ListTile(
                      title: Text(center['name']),
                      subtitle: Text(
                        'Location: ${center['location'] ?? 'N/A'}',
                      ),
                    ),
                  ),
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
          _buildSection('Quick Links', [
            FutureBuilder<List<ShortcutItem>>(
              future: _shortcutsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const LinearProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final shortcuts = snapshot.data ?? [];
                return Column(
                  children: [
                    ...shortcuts.map(
                      (shortcut) => ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Colors.grey.shade200,
                          backgroundImage: shortcut.imageUrl != null &&
                                  shortcut.imageUrl!.isNotEmpty
                              ? NetworkImage(shortcut.imageUrl!)
                              : null,
                          child: shortcut.imageUrl == null ||
                                  shortcut.imageUrl!.isEmpty
                              ? const Icon(Icons.link)
                              : null,
                        ),
                        title: Text(shortcut.name),
                        subtitle: Text(
                          '${shortcut.type} • ${shortcut.target} • ${shortcut.price != null && shortcut.price! > 0 ? 'KES ${shortcut.price}' : 'Free'}',
                        ),
                        trailing: Wrap(
                          spacing: 8,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          children: [
                            Switch(
                              value: shortcut.isActive,
                              onChanged: (value) async {
                                try {
                                  await _api.updateShortcut(
                                    shortcut.id,
                                    {
                                      'isActive': value,
                                    },
                                  );
                                  _refreshShortcuts();
                                } catch (error) {
                                  if (context.mounted) {
                                    ErrorHandler.show(context, error);
                                  }
                                }
                              },
                            ),
                            IconButton(
                              tooltip: 'Edit shortcut',
                              onPressed: () => _showShortcutDialog(
                                context,
                                shortcut: shortcut,
                              ),
                              icon: const Icon(Icons.edit),
                            ),
                          ],
                        ),
                      ),
                    ),
                    ListTile(
                      title: const Text('Add Quick Link'),
                      trailing: ElevatedButton(
                        onPressed: () => _showShortcutDialog(context),
                        child: const Text('ADD'),
                      ),
                    ),
                  ],
                );
              },
            ),
          ]),
          _buildSection('Users', [
            ListTile(
              title: const Text('Manage Users'),
              subtitle: const Text('Create, update, and suspend accounts'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                Navigator.of(
                  context,
                ).push(MaterialPageRoute(builder: (_) => const UsersScreen()));
              },
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

  Widget _buildAiSettingsSection(BuildContext context) {
    return _buildSection('AI Settings', [
      FutureBuilder<String>(
        future: ConfigService.getAiProvider(),
        builder: (context, snapshot) {
          final provider = snapshot.data ?? 'Loading...';
          return ListTile(
            title: const Text('AI Provider'),
            subtitle: Text(provider),
            trailing: ElevatedButton(
              onPressed: () => _showEditAiConfigDialog(context),
              child: const Text('EDIT'),
            ),
          );
        },
      ),
    ]);
  }

  Widget _buildSnmpSettingsSection(BuildContext context) {
    return _buildSection('SNMP', [
      ListTile(
        title: const Text('Manage SNMP Devices'),
        subtitle: const Text('Configure network printers and counters'),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          Navigator.of(
            context,
          ).push(MaterialPageRoute(builder: (_) => const SnmpScreen()));
        },
      ),
    ]);
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
                decoration: const InputDecoration(
                  labelText: 'Price per minute',
                ),
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
                    await ref
                        .read(pricingsProvider.notifier)
                        .createPricing(price, active);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Pricing added')),
                      );
                    }
                  } catch (error) {
                    if (context.mounted) {
                      ErrorHandler.show(context, error);
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

  void _showShortcutDialog(
    BuildContext context, {
    ShortcutItem? shortcut,
  }) {
    final nameController = TextEditingController(text: shortcut?.name ?? '');
    final targetController = TextEditingController(
      text: shortcut?.target ?? '',
    );
    final iconController = TextEditingController(text: shortcut?.icon ?? '');
    final imageUrlController = TextEditingController(
      text: shortcut?.imageUrl ?? '',
    );
    final priceController = TextEditingController(
      text: shortcut?.price != null ? '${shortcut?.price}' : '',
    );
    String type = shortcut?.type ?? 'URL';
    bool isActive = shortcut?.isActive ?? true;
    String? selectedGovServiceId =
        type == 'GOV_SERVICE' ? shortcut?.target : null;
    String internalTarget =
        type == 'INTERNAL'
            ? (shortcut?.target == 'GOV_SERVICES'
                ? 'QUICK_LINKS'
                : (shortcut?.target ?? 'QUICK_LINKS'))
            : 'QUICK_LINKS';

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: Text(shortcut == null ? 'Add Quick Link' : 'Edit Quick Link'),
          content: SizedBox(
            width: 420,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(labelText: 'Name'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: type,
                  decoration: const InputDecoration(labelText: 'Type'),
                  items: const [
                    DropdownMenuItem(value: 'URL', child: Text('URL')),
                    DropdownMenuItem(
                      value: 'GOV_SERVICE',
                      child: Text('Government Service'),
                    ),
                    DropdownMenuItem(
                      value: 'AI_SERVICE',
                      child: Text('AI Service'),
                    ),
                    DropdownMenuItem(
                      value: 'INTERNAL',
                      child: Text('Internal'),
                    ),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() {
                      type = value;
                      if (type != 'GOV_SERVICE') {
                        selectedGovServiceId = null;
                      }
                      if (type == 'INTERNAL') {
                        internalTarget = 'QUICK_LINKS';
                      }
                    });
                  },
                ),
                const SizedBox(height: 8),
                if (type == 'GOV_SERVICE')
                  FutureBuilder<List<dynamic>>(
                    future: _api.getGovServices(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const LinearProgressIndicator();
                      }
                      if (snapshot.hasError) {
                        return ErrorView(error: snapshot.error!);
                      }
                      final services = (snapshot.data ?? [])
                          .map((e) => GovService.fromJson(e))
                          .toList();
                      return DropdownButtonFormField<String>(
                        value: selectedGovServiceId ??
                            (services.isNotEmpty ? services.first.id : null),
                        decoration: const InputDecoration(
                          labelText: 'Government Service',
                        ),
                        items: services
                            .map(
                              (s) => DropdownMenuItem(
                                value: s.id,
                                child: Text(s.name),
                              ),
                            )
                            .toList(),
                        onChanged: (value) {
                          setState(() {
                            selectedGovServiceId = value;
                          });
                        },
                      );
                    },
                  )
                else if (type == 'INTERNAL')
                  DropdownButtonFormField<String>(
                    value: internalTarget,
                    decoration: const InputDecoration(labelText: 'Target'),
                    items: const [
                      DropdownMenuItem(
                        value: 'QUICK_LINKS',
                        child: Text('Quick Links'),
                      ),
                      DropdownMenuItem(value: 'AI', child: Text('AI')),
                    ],
                    onChanged: (value) {
                      if (value == null) return;
                      setState(() => internalTarget = value);
                    },
                  )
                else
                  TextField(
                    controller: targetController,
                    decoration: const InputDecoration(labelText: 'Target'),
                  ),
                const SizedBox(height: 8),
                TextField(
                  controller: priceController,
                  decoration: const InputDecoration(
                    labelText: 'Price (KES)',
                    helperText: 'Leave blank for free',
                  ),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: imageUrlController,
                  decoration: const InputDecoration(
                    labelText: 'Picture URL (optional)',
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: iconController,
                  decoration: const InputDecoration(
                    labelText: 'Icon (optional)',
                  ),
                ),
                const SizedBox(height: 8),
                CheckboxListTile(
                  title: const Text('Active'),
                  value: isActive,
                  onChanged: (value) =>
                      setState(() => isActive = value ?? true),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final name = nameController.text.trim();
                final icon = iconController.text.trim();
                final imageUrl = imageUrlController.text.trim();
                final priceText = priceController.text.trim();
                int? price;
                if (priceText.isNotEmpty) {
                  price = int.tryParse(priceText);
                  if (price == null || price < 0) {
                    if (context.mounted) {
                      ErrorHandler.show(
                        context,
                        AppError(
                          type: AppErrorType.validation,
                          message: 'Price must be a valid number.',
                        ),
                      );
                    }
                    return;
                  }
                }
                String target;
                if (type == 'GOV_SERVICE') {
                  target = selectedGovServiceId ?? '';
                } else if (type == 'INTERNAL') {
                  target = internalTarget;
                } else {
                  target = targetController.text.trim();
                }

                if (name.isEmpty || target.isEmpty) {
                  if (context.mounted) {
                    ErrorHandler.show(
                      context,
                      AppError(
                        type: AppErrorType.validation,
                        message: 'Name and target are required.',
                      ),
                    );
                  }
                  return;
                }

                try {
                  if (shortcut == null) {
                    await _api.createShortcut({
                      'name': name,
                      'type': type,
                      'target': target,
                      'icon': icon.isEmpty ? null : icon,
                      'imageUrl': imageUrl.isEmpty ? null : imageUrl,
                      'price': price,
                      'isActive': isActive,
                    });
                  } else {
                    await _api.updateShortcut(shortcut.id, {
                      'name': name,
                      'type': type,
                      'target': target,
                      'icon': icon.isEmpty ? null : icon,
                      'imageUrl': imageUrl.isEmpty ? null : imageUrl,
                      'price': priceText.isEmpty ? null : price,
                      'isActive': isActive,
                    });
                  }
                  if (context.mounted) {
                    Navigator.of(context).pop();
                    _refreshShortcuts();
                  }
                } catch (error) {
                  if (context.mounted) {
                    ErrorHandler.show(context, error);
                  }
                }
              },
              child: Text(shortcut == null ? 'Add' : 'Save'),
            ),
          ],
        ),
      ),
    );
  }

  void _showUpdatePricingDialog(
    BuildContext context,
    WidgetRef ref,
    Map<String, dynamic> pricing,
  ) {
    final priceController = TextEditingController(
      text: pricing['pricePerMinute'].toString(),
    );
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
                decoration: const InputDecoration(
                  labelText: 'Price per minute',
                ),
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
                    await ref
                        .read(pricingsProvider.notifier)
                        .updatePricing(pricing['id'], price, active);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Pricing updated')),
                      );
                    }
                  } catch (error) {
                    if (context.mounted) {
                      ErrorHandler.show(context, error);
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

  void _showEditComputerDialog(
    BuildContext context,
    WidgetRef ref,
    Computer computer,
  ) {
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
                await ref
                    .read(apiServiceProvider)
                    .updateComputer(computer.id, nameController.text);
                ref.invalidate(computersProvider);
                if (context.mounted) {
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Computer updated')),
                  );
                }
              } catch (error) {
                if (context.mounted) {
                  ErrorHandler.show(context, error);
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
                await ref
                    .read(cyberCentersProvider.notifier)
                    .createCyberCenter(
                      nameController.text,
                      locationController.text.isEmpty
                          ? null
                          : locationController.text,
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
                  ErrorHandler.show(context, error);
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
    final fullNameController = TextEditingController();
    final emailController = TextEditingController();
    final phoneController = TextEditingController();
    final passwordController = TextEditingController();
    String role = 'STAFF';
    String status = 'ACTIVE';

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Add User'),
          content: Column(
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
                decoration: const InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              DropdownButtonFormField<String>(
                initialValue: role,
                items: ['ADMIN', 'STAFF', 'CUSTOMER', 'STUDENT']
                    .map((r) => DropdownMenuItem(value: r, child: Text(r)))
                    .toList(),
                onChanged: (value) => setState(() => role = value!),
                decoration: const InputDecoration(labelText: 'Role'),
              ),
              DropdownButtonFormField<String>(
                initialValue: status,
                items: ['ACTIVE', 'SUSPENDED']
                    .map((r) => DropdownMenuItem(value: r, child: Text(r)))
                    .toList(),
                onChanged: (value) => setState(() => status = value!),
                decoration: const InputDecoration(labelText: 'Status'),
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
                  await ref
                      .read(usersProvider.notifier)
                      .createUser(
                        fullName: fullNameController.text.trim(),
                        email: emailController.text.trim().isEmpty
                            ? null
                            : emailController.text.trim(),
                        phone: phoneController.text.trim().isEmpty
                            ? null
                            : phoneController.text.trim(),
                        password: passwordController.text.trim(),
                        role: role,
                        status: status,
                      );
                  if (context.mounted) {
                    Navigator.of(context).pop();
                    ScaffoldMessenger.of(
                      context,
                    ).showSnackBar(const SnackBar(content: Text('User added')));
                  }
                } catch (error) {
                  if (context.mounted) {
                    ErrorHandler.show(context, error);
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

  void _showEditUserDialog(
    BuildContext context,
    WidgetRef ref,
    Map<String, dynamic> user,
  ) {
    final fullNameController = TextEditingController(text: user['fullName']);
    final emailController = TextEditingController(text: user['email']);
    final phoneController = TextEditingController(text: user['phone']);
    final passwordController = TextEditingController();
    String role = user['role'];
    String status = user['status'] ?? 'ACTIVE';

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Edit User'),
          content: Column(
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
                decoration: const InputDecoration(
                  labelText: 'New Password (leave empty to keep)',
                ),
                obscureText: true,
              ),
              DropdownButtonFormField<String>(
                initialValue: role,
                items: ['ADMIN', 'STAFF', 'CUSTOMER', 'STUDENT']
                    .map((r) => DropdownMenuItem(value: r, child: Text(r)))
                    .toList(),
                onChanged: (value) => setState(() => role = value!),
                decoration: const InputDecoration(labelText: 'Role'),
              ),
              DropdownButtonFormField<String>(
                initialValue: status,
                items: ['ACTIVE', 'SUSPENDED']
                    .map((r) => DropdownMenuItem(value: r, child: Text(r)))
                    .toList(),
                onChanged: (value) => setState(() => status = value!),
                decoration: const InputDecoration(labelText: 'Status'),
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
                  await ref
                      .read(usersProvider.notifier)
                      .updateUser(
                        id: user['id'],
                        fullName: fullNameController.text.trim().isEmpty
                            ? null
                            : fullNameController.text.trim(),
                        email: emailController.text.trim().isEmpty
                            ? null
                            : emailController.text.trim(),
                        phone: phoneController.text.trim().isEmpty
                            ? null
                            : phoneController.text.trim(),
                        password: passwordController.text.trim().isEmpty
                            ? null
                            : passwordController.text.trim(),
                        role: role,
                        status: status,
                      );
                  if (context.mounted) {
                    Navigator.of(context).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('User updated')),
                    );
                  }
                } catch (error) {
                  if (context.mounted) {
                    ErrorHandler.show(context, error);
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
                  const SnackBar(
                    content: Text('Password changed (not implemented yet)'),
                  ),
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
    final controller = TextEditingController(
      text: await ConfigService.getServerUrl(),
    );
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
                  const SnackBar(
                    content: Text(
                      'Server URL updated. Restart the app to apply changes.',
                    ),
                  ),
                );
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showEditAiConfigDialog(BuildContext context) async {
    final currentProvider = await ConfigService.getAiProvider();
    final apiKeyController = TextEditingController(
      text: await ConfigService.getAiApiKey(),
    );
    String selectedProvider = currentProvider;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('AI Configuration'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButtonFormField<String>(
                value: selectedProvider,
                items: const [
                  DropdownMenuItem(value: 'CHATGPT', child: Text('ChatGPT')),
                  DropdownMenuItem(value: 'GEMINI', child: Text('Gemini')),
                  DropdownMenuItem(value: 'GROK', child: Text('Grok')),
                ],
                onChanged: (value) {
                  if (value == null) return;
                  setState(() => selectedProvider = value);
                },
                decoration: const InputDecoration(labelText: 'Provider'),
              ),
              TextField(
                controller: apiKeyController,
                decoration: const InputDecoration(labelText: 'API Key'),
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
                await ConfigService.setAiProvider(selectedProvider);
                await ConfigService.setAiApiKey(apiKeyController.text.trim());
                if (context.mounted) {
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('AI settings saved.')),
                  );
                }
              },
              child: const Text('Save'),
            ),
          ],
        ),
      ),
    );
  }
}
