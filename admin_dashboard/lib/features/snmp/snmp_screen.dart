import 'package:flutter/material.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_handler.dart';
import '../../core/ui/error_view.dart';
import '../../core/ui/error_view.dart';

class SnmpScreen extends StatefulWidget {
  const SnmpScreen({super.key});

  @override
  State<SnmpScreen> createState() => _SnmpScreenState();
}

class _SnmpScreenState extends State<SnmpScreen> {
  final ApiService _api = ApiService();
  late Future<List<dynamic>> _devices;

  @override
  void initState() {
    super.initState();
    _reload();
  }

  void _reload() {
    _devices = _api.getSnmpDevices();
    setState(() {});
  }

  Future<void> _showDeviceDialog({Map<String, dynamic>? device}) async {
    final nameController = TextEditingController(
      text: device?['name']?.toString() ?? '',
    );
    final hostController = TextEditingController(
      text: device?['host']?.toString() ?? '',
    );
    final communityController = TextEditingController(
      text: device?['community']?.toString() ?? 'public',
    );
    final scanOidController = TextEditingController(
      text: device?['scanOid']?.toString() ?? '',
    );
    final copyOidController = TextEditingController(
      text: device?['copyOid']?.toString() ?? '',
    );

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(device == null ? 'Add SNMP Printer' : 'Edit SNMP Printer'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: hostController,
                decoration: const InputDecoration(labelText: 'Host / IP'),
              ),
              TextField(
                controller: communityController,
                decoration: const InputDecoration(labelText: 'Community'),
              ),
              TextField(
                controller: scanOidController,
                decoration: const InputDecoration(labelText: 'Scan OID'),
              ),
              TextField(
                controller: copyOidController,
                decoration: const InputDecoration(labelText: 'Copy OID'),
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
              final host = hostController.text.trim();
              final community = communityController.text.trim().isEmpty
                  ? 'public'
                  : communityController.text.trim();
              final scanOid = scanOidController.text.trim();
              final copyOid = copyOidController.text.trim();

              if (name.isEmpty ||
                  host.isEmpty ||
                  scanOid.isEmpty ||
                  copyOid.isEmpty) {
                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Please fill all required fields.'),
                  ),
                );
                return;
              }

              try {
                if (device == null) {
                  await _api.createSnmpDevice(
                    name: name,
                    host: host,
                    community: community,
                    scanOid: scanOid,
                    copyOid: copyOid,
                  );
                } else {
                  await _api.updateSnmpDevice(
                    id: device['id']?.toString() ?? '',
                    name: name,
                    host: host,
                    community: community,
                    scanOid: scanOid,
                    copyOid: copyOid,
                  );
                }
                if (!mounted) return;
                Navigator.of(context).pop();
                _reload();
              } catch (e) {
                if (!mounted) return;
                ErrorHandler.show(context, e);
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  Future<void> _toggleEnabled(Map<String, dynamic> device, bool enabled) async {
    try {
      await _api.updateSnmpDevice(
        id: device['id']?.toString() ?? '',
        enabled: enabled,
      );
      _reload();
    } catch (e) {
      if (!mounted) return;
      ErrorHandler.show(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SNMP Printers'),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: _reload),
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => _showDeviceDialog(),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: FutureBuilder<List<dynamic>>(
          future: _devices,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasError) {
              return ErrorView(error: snapshot.error!);
            }
            final devices = snapshot.data ?? [];
            if (devices.isEmpty) {
              return const Center(child: Text('No SNMP printers configured.'));
            }
            return ListView.builder(
              itemCount: devices.length,
              itemBuilder: (context, index) {
                final device = devices[index] as Map<String, dynamic>;
                final enabled = device['enabled'] == true;
                return Card(
                  margin: const EdgeInsets.only(bottom: 8),
                  child: ListTile(
                    title: Text(device['name']?.toString() ?? 'Printer'),
                    subtitle: Text(
                      'Host: ${device['host'] ?? ''}\nCommunity: ${device['community'] ?? ''}\nScan OID: ${device['scanOid'] ?? ''}\nCopy OID: ${device['copyOid'] ?? ''}',
                    ),
                    isThreeLine: true,
                    trailing: Wrap(
                      spacing: 8,
                      children: [
                        Switch(
                          value: enabled,
                          onChanged: (value) => _toggleEnabled(device, value),
                        ),
                        IconButton(
                          icon: const Icon(Icons.edit),
                          onPressed: () => _showDeviceDialog(device: device),
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
    );
  }
}
