import 'dart:async';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../core/api_service.dart';
import '../../core/models.dart';
import '../../core/ui/error_view.dart';

class GovernmentServicesScreen extends StatefulWidget {
  const GovernmentServicesScreen({super.key});

  @override
  State<GovernmentServicesScreen> createState() =>
      _GovernmentServicesScreenState();
}

class _GovernmentServicesScreenState extends State<GovernmentServicesScreen>
    with SingleTickerProviderStateMixin {
  final ApiService _api = ApiService();
  late Future<List<GovService>> _servicesFuture;
  GovServiceUsage? _activeUsage;
  Timer? _timer;
  Duration _elapsed = Duration.zero;

  static const List<String> _categoryOrder = [
    'ID',
    'VEHICLE',
    'TAX',
    'EDUCATION',
    'HEALTH',
    'OTHER',
  ];

  @override
  void initState() {
    super.initState();
    _servicesFuture = _loadServices();
    _loadActiveUsage();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<List<GovService>> _loadServices() async {
    final raw = await _api.getGovServices();
    return raw.map((e) => GovService.fromJson(e)).toList();
  }

  Future<void> _loadActiveUsage() async {
    try {
      final raw = await _api.getActiveGovUsage();
      if (!mounted) return;
      if (raw.isEmpty) {
        setState(() => _activeUsage = null);
        return;
      }
      final usage = GovServiceUsage.fromJson(raw.first as Map<String, dynamic>);
      setState(() => _activeUsage = usage);
      _startTimer(usage.startedAt);
    } catch (_) {
      // Ignore; active usage is optional
    }
  }

  void _startTimer(DateTime startedAt) {
    _timer?.cancel();
    _elapsed = DateTime.now().difference(startedAt);
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      setState(() {
        _elapsed = DateTime.now().difference(startedAt);
      });
    });
  }

  Future<void> _launchService(GovService service) async {
    try {
      final result = await _api.startGovService(service.id);
      final url = result['officialUrl']?.toString() ?? service.officialUrl;
      final pricingModel =
          result['pricingModel']?.toString() ?? service.pricingModel;
      final startedAtRaw = result['startedAt']?.toString();
      final usageId = result['usageId']?.toString();

      if (url.isNotEmpty) {
        final uri = Uri.parse(url);
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      }

      if (pricingModel == 'PER_MINUTE' && usageId != null) {
        final startedAt = startedAtRaw != null
            ? DateTime.parse(startedAtRaw)
            : DateTime.now();
        setState(() {
          _activeUsage = GovServiceUsage(
            id: usageId,
            govServiceId: service.id,
            staffId: '',
            startedAt: startedAt,
            govService: service,
          );
        });
        _startTimer(startedAt);
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('${service.name} launched.')));
      }
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to launch: $error')));
    }
  }

  Future<void> _finishUsage() async {
    final usage = _activeUsage;
    if (usage == null) return;
    try {
      final result = await _api.endGovService(usage.id);
      _timer?.cancel();
      if (!mounted) return;
      setState(() => _activeUsage = null);
      final amount = result['amount'] ?? 0;
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Service Ended'),
          content: Text('Amount: KES $amount'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to end usage: $error')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<GovService>>(
      future: _servicesFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return ErrorView(error: snapshot.error!);
        }

        final services = snapshot.data ?? [];
        final categories = _buildCategories(services);

        return DefaultTabController(
          length: categories.length,
          child: Scaffold(
            appBar: AppBar(
              title: const Text('Government Services'),
              bottom: TabBar(
                isScrollable: true,
                tabs: categories.map((c) => Tab(text: c)).toList(),
              ),
              actions: [
                IconButton(
                  icon: const Icon(Icons.refresh),
                  onPressed: () {
                    setState(() {
                      _servicesFuture = _loadServices();
                    });
                    _loadActiveUsage();
                  },
                ),
              ],
            ),
            body: Column(
              children: [
                if (_activeUsage != null) _buildActiveTimerBar(),
                Expanded(
                  child: TabBarView(
                    children: categories.map((category) {
                      final items = services
                          .where((s) => s.category == category)
                          .toList();
                      return _buildServiceGrid(items);
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  List<String> _buildCategories(List<GovService> services) {
    final found = services.map((s) => s.category).toSet();
    final ordered = _categoryOrder.where(found.contains).toList();
    final remaining = found.difference(_categoryOrder.toSet()).toList()..sort();
    return [...ordered, ...remaining];
  }

  Widget _buildServiceGrid(List<GovService> services) {
    if (services.isEmpty) {
      return const Center(child: Text('No services in this category.'));
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: GridView.builder(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.4,
        ),
        itemCount: services.length,
        itemBuilder: (context, index) {
          final service = services[index];
          return Card(
            elevation: 2,
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.public),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          service.name,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    service.description ?? 'No description',
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: Colors.grey),
                  ),
                  const Spacer(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Chip(label: Text(service.pricingBadge)),
                      ElevatedButton(
                        onPressed: service.isActive
                            ? () => _launchService(service)
                            : null,
                        child: const Text('Launch'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildActiveTimerBar() {
    final usage = _activeUsage!;
    final minutes = _elapsed.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = _elapsed.inSeconds.remainder(60).toString().padLeft(2, '0');
    final label = usage.govService?.name ?? 'Service Usage';

    return Container(
      color: Colors.blue.shade50,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          const Icon(Icons.timer, color: Colors.blue),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              '$label • $minutes:$seconds',
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
          ),
          ElevatedButton(onPressed: _finishUsage, child: const Text('Finish')),
        ],
      ),
    );
  }
}
