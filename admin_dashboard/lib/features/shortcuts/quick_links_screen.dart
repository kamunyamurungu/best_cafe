import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../core/api_service.dart';
import '../../core/models.dart';
import '../../core/ui/error_view.dart';
import '../ai/ai_screen.dart';

class QuickLinksScreen extends StatefulWidget {
  const QuickLinksScreen({super.key});

  @override
  State<QuickLinksScreen> createState() => _QuickLinksScreenState();
}

class _QuickLinksScreenState extends State<QuickLinksScreen> {
  final ApiService _api = ApiService();
  late Future<List<ShortcutItem>> _shortcutsFuture;

  @override
  void initState() {
    super.initState();
    _shortcutsFuture = _loadShortcuts();
  }

  Future<List<ShortcutItem>> _loadShortcuts() async {
    final items = await _api.getShortcuts();
    return items
        .map((e) => ShortcutItem.fromJson(e))
        .where((s) => s.isActive)
        .toList();
  }

  void _reload() {
    setState(() {
      _shortcutsFuture = _loadShortcuts();
    });
  }

  Future<void> _handleShortcutTap(ShortcutItem shortcut) async {
    try {
      final usage = await _api.useShortcut(shortcut.id);
      final resolvedTarget =
          usage['resolvedTarget']?.toString() ?? shortcut.target;
      final transactionId = usage['transactionId']?.toString();
      if (transactionId != null && transactionId.isNotEmpty && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Transaction created.')),
        );
      }

      switch (shortcut.type) {
        case 'URL':
        case 'GOV_SERVICE':
          if (resolvedTarget.isEmpty) {
            if (!mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Shortcut URL is missing.')),
            );
            return;
          }
          await launchUrl(
            Uri.parse(resolvedTarget),
            mode: LaunchMode.externalApplication,
          );
          break;
        case 'AI_SERVICE':
          if (!mounted) return;
          Navigator.of(
            context,
          ).push(MaterialPageRoute(builder: (_) => const AiScreen()));
          break;
        case 'INTERNAL':
          if (!mounted) return;
          if (shortcut.target == 'AI') {
            Navigator.of(
              context,
            ).push(MaterialPageRoute(builder: (_) => const AiScreen()));
          } else if (shortcut.target == 'QUICK_LINKS' ||
              shortcut.target == 'GOV_SERVICES') {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('You are already here.')),
            );
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Shortcut target not configured.')),
            );
          }
          break;
        default:
          if (!mounted) return;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Unsupported shortcut type.')),
          );
      }
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to open shortcut: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quick Links'),
        actions: [
          IconButton(onPressed: _reload, icon: const Icon(Icons.refresh)),
        ],
      ),
      body: FutureBuilder<List<ShortcutItem>>(
        future: _shortcutsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return ErrorView(error: snapshot.error!);
          }
          final items = snapshot.data ?? [];
          if (items.isEmpty) {
            return const Center(child: Text('No quick links configured.'));
          }

          return GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.15,
            ),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final shortcut = items[index];
              final price = shortcut.price ?? 0;
              return InkWell(
                onTap: () => _handleShortcutTap(shortcut),
                child: Card(
                  elevation: 1,
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: shortcut.imageUrl != null &&
                                    shortcut.imageUrl!.isNotEmpty
                                ? Image.network(
                                    shortcut.imageUrl!,
                                    width: double.infinity,
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) {
                                      return Container(
                                        color: Colors.grey.shade200,
                                        child: const Center(
                                          child: Icon(
                                            Icons.link,
                                            size: 36,
                                            color: Colors.black54,
                                          ),
                                        ),
                                      );
                                    },
                                  )
                                : Container(
                                    color: Colors.grey.shade100,
                                    child: const Center(
                                      child: Icon(
                                        Icons.link,
                                        size: 36,
                                        color: Colors.black54,
                                      ),
                                    ),
                                  ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          shortcut.name,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          price > 0 ? 'KES $price' : 'Free',
                          style: TextStyle(
                            color: price > 0
                                ? Colors.green.shade700
                                : Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
