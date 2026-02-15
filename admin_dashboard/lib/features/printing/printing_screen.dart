import 'package:flutter/material.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_view.dart';

class PrintingScreen extends StatefulWidget {
  const PrintingScreen({super.key});

  @override
  State<PrintingScreen> createState() => _PrintingScreenState();
}

class _PrintingScreenState extends State<PrintingScreen> {
  final ApiService _api = ApiService();
  late Future<List<dynamic>> _pendingJobs;
  late Future<List<dynamic>> _pricing;
  late Future<List<dynamic>> _computers;
  late Future<List<dynamic>> _printers;
  String? _selectedComputerId;

  @override
  void initState() {
    super.initState();
    _reload();
  }

  void _reload() {
    _pendingJobs = _api.getPendingPrintJobs();
    _pricing = _api.getPrintPricing();
    _computers = _api.getComputers();
    if (_selectedComputerId != null) {
      _printers = _api.getPrinters(computerId: _selectedComputerId!);
    } else {
      _printers = Future.value([]);
    }
    setState(() {});
  }

  Future<void> _approveJob(String id) async {
    await _api.approvePrintJob(id);
    _reload();
  }

  Future<void> _rejectJob(String id) async {
    await _api.rejectPrintJob(id);
    _reload();
  }

  void _showAddPricingDialog(String type) {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add $type Pricing'),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Price per page (KES)'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              final price = int.tryParse(controller.text);
              if (price != null) {
                await _api.createPrintPricing(type, price);
                if (mounted) {
                  Navigator.of(context).pop();
                  _reload();
                }
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Printing'),
        actions: [
          IconButton(icon: const Icon(Icons.refresh), onPressed: _reload),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pending Print Jobs',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: FutureBuilder<List<dynamic>>(
                future: _pendingJobs,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return ErrorView(error: snapshot.error!);
                  }
                  final jobs = snapshot.data ?? [];
                  if (jobs.isEmpty) {
                    return const Center(child: Text('No pending jobs.'));
                  }
                  return ListView.builder(
                    itemCount: jobs.length,
                    itemBuilder: (context, index) {
                      final job = jobs[index] as Map<String, dynamic>;
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          title: Text(
                            '${job['printerName']} • ${job['pages']} page(s)',
                          ),
                          subtitle: Text(
                            'Color: ${job['isColor'] == true ? 'Yes' : 'No'} • Paper: ${job['paperSize']}',
                          ),
                          trailing: Wrap(
                            spacing: 8,
                            children: [
                              OutlinedButton(
                                onPressed: () => _rejectJob(job['id']),
                                child: const Text('Reject'),
                              ),
                              ElevatedButton(
                                onPressed: () => _approveJob(job['id']),
                                child: const Text('Approve'),
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
            const SizedBox(height: 16),
            const Text(
              'Print Pricing',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            FutureBuilder<List<dynamic>>(
              future: _pricing,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final items = snapshot.data ?? [];
                return Column(
                  children: [
                    ...items.map((p) {
                      final map = p as Map<String, dynamic>;
                      return ListTile(
                        title: Text(
                          '${map['type']} - KES ${map['pricePerPage']}',
                        ),
                        subtitle: Text('Created: ${map['createdAt'] ?? ''}'),
                      );
                    }),
                    Row(
                      children: [
                        ElevatedButton(
                          onPressed: () => _showAddPricingDialog('BW'),
                          child: const Text('Add B&W Pricing'),
                        ),
                        const SizedBox(width: 12),
                        ElevatedButton(
                          onPressed: () => _showAddPricingDialog('COLOR'),
                          child: const Text('Add Color Pricing'),
                        ),
                      ],
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: 16),
            const Text(
              'Printers',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            FutureBuilder<List<dynamic>>(
              future: _computers,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final computers = snapshot.data ?? [];
                if (computers.isEmpty) {
                  return const Text('No computers found.');
                }
                _selectedComputerId ??= computers.first['id']?.toString();
                return Row(
                  children: [
                    const Text('Computer: '),
                    const SizedBox(width: 8),
                    DropdownButton<String>(
                      value: _selectedComputerId,
                      items: computers
                          .map(
                            (c) => DropdownMenuItem<String>(
                              value: c['id']?.toString(),
                              child: Text(c['name']?.toString() ?? 'Unknown'),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value == null) return;
                        setState(() {
                          _selectedComputerId = value;
                          _printers = _api.getPrinters(computerId: value);
                        });
                      },
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: 8),
            FutureBuilder<List<dynamic>>(
              future: _printers,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final printers = snapshot.data ?? [];
                if (printers.isEmpty) {
                  return const Text('No printers reported by agent.');
                }
                return Column(
                  children: printers.map((p) {
                    final map = p as Map<String, dynamic>;
                    final isDefault = map['isDefault'] == true;
                    return ListTile(
                      title: Text(map['name']?.toString() ?? 'Printer'),
                      subtitle: Text(isDefault ? 'Default' : 'Not default'),
                      trailing: isDefault
                          ? const Icon(Icons.check_circle, color: Colors.green)
                          : TextButton(
                              onPressed: () async {
                                final cid = _selectedComputerId;
                                if (cid == null) return;
                                await _api.setDefaultPrinter(
                                  cid,
                                  map['name']?.toString() ?? '',
                                );
                                _printers = _api.getPrinters(computerId: cid);
                                setState(() {});
                              },
                              child: const Text('Set Default'),
                            ),
                    );
                  }).toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
