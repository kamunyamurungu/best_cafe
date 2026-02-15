import 'package:flutter/material.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_view.dart';

class BillingScreen extends StatefulWidget {
  const BillingScreen({super.key});

  @override
  State<BillingScreen> createState() => _BillingScreenState();
}

class _BillingScreenState extends State<BillingScreen> {
  final ApiService _api = ApiService();
  late Future<List<dynamic>> _pendingTransactions;
  late Future<List<dynamic>> _receipts;
  late Future<Map<String, dynamic>> _dailyTotals;
  final Set<String> _selected = <String>{};
  String _paymentMethod = 'CASH';

  @override
  void initState() {
    super.initState();
    _reload();
  }

  void _reload() {
    _pendingTransactions = _api.getTransactions(status: 'PENDING');
    _receipts = _api.getReceipts();
    _dailyTotals = _api.getDailyTotals();
    setState(() {});
  }

  Future<void> _issueReceipt() async {
    if (_selected.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Select transactions to receipt.')),
      );
      return;
    }

    await _api.createReceipt(
      transactionIds: _selected.toList(),
      paymentMethod: _paymentMethod,
    );
    _selected.clear();
    _reload();
  }

  void _showReceiptDetails(Map<String, dynamic> receipt) {
    final items = (receipt['transactions'] as List<dynamic>?) ?? [];
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Receipt Details'),
        content: SizedBox(
          width: 420,
          child: ListView(
            shrinkWrap: true,
            children: [
              Text('Receipt: ${receipt['id']}'),
              Text('Total: KES ${receipt['totalAmount']}'),
              Text('Payment: ${receipt['paymentMethod']}'),
              const SizedBox(height: 12),
              ...items.map((t) {
                final m = t as Map<String, dynamic>;
                return ListTile(
                  title: Text(m['description'] ?? 'Transaction'),
                  subtitle: Text('Amount: KES ${m['amount']}'),
                );
              }),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Billing'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _reload,
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            FutureBuilder<Map<String, dynamic>>(
              future: _dailyTotals,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                }
                if (snapshot.hasError) {
                  return ErrorView(error: snapshot.error!);
                }
                final stats = snapshot.data ?? {};
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Today: ${stats['date'] ?? ''}'),
                        Text('Receipts: ${stats['count'] ?? 0}'),
                        Text('Total: KES ${stats['totalAmount'] ?? 0}'),
                      ],
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            const Text(
              'Pending Transactions',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: FutureBuilder<List<dynamic>>(
                future: _pendingTransactions,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return ErrorView(error: snapshot.error!);
                  }
                  final items = snapshot.data ?? [];
                  if (items.isEmpty) {
                    return const Center(child: Text('No pending transactions.'));
                  }
                  return ListView.builder(
                    itemCount: items.length,
                    itemBuilder: (context, index) {
                      final t = items[index] as Map<String, dynamic>;
                      final id = t['id']?.toString() ?? '';
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: CheckboxListTile(
                          value: _selected.contains(id),
                          onChanged: (checked) {
                            setState(() {
                              if (checked == true) {
                                _selected.add(id);
                              } else {
                                _selected.remove(id);
                              }
                            });
                          },
                          title: Text(t['description'] ?? 'Transaction'),
                          subtitle: Text('Type: ${t['type']} • Amount: KES ${t['amount']}'),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                DropdownButton<String>(
                  value: _paymentMethod,
                  items: const [
                    DropdownMenuItem(value: 'CASH', child: Text('Cash')),
                    DropdownMenuItem(value: 'MPESA', child: Text('M-Pesa')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => _paymentMethod = value);
                  },
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: _issueReceipt,
                  child: const Text('Issue Receipt'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Text(
              'Receipts',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 200,
              child: FutureBuilder<List<dynamic>>(
                future: _receipts,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return ErrorView(error: snapshot.error!);
                  }
                  final receipts = snapshot.data ?? [];
                  if (receipts.isEmpty) {
                    return const Center(child: Text('No receipts yet.'));
                  }
                  return ListView.builder(
                    itemCount: receipts.length,
                    itemBuilder: (context, index) {
                      final r = receipts[index] as Map<String, dynamic>;
                      return ListTile(
                        title: Text('Receipt ${r['id']}'),
                        subtitle: Text('Total: KES ${r['totalAmount']} • ${r['paymentMethod']}'),
                        trailing: TextButton(
                          onPressed: () => _showReceiptDetails(r),
                          child: const Text('View'),
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
