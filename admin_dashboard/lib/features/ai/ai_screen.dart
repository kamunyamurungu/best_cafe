import 'package:flutter/material.dart';
import '../../core/api_service.dart';
import '../../core/ui/error_handler.dart';
import '../../core/ui/error_view.dart';

class AiScreen extends StatefulWidget {
  const AiScreen({super.key});

  @override
  State<AiScreen> createState() => _AiScreenState();
}

class _AiScreenState extends State<AiScreen>
    with SingleTickerProviderStateMixin {
  final ApiService _api = ApiService();
  late TabController _tabController;
  late Future<List<dynamic>> _services;
  late Future<List<dynamic>> _templates;
  late Future<List<dynamic>> _jobs;
  late Future<List<dynamic>> _records;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _reload();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _reload() {
    _services = _api.getAiServices(category: 'AI');
    _templates = _api.getAiTemplates();
    _jobs = _api.getAiJobs();
    _records = _api.getRecords(type: 'AI_DOCUMENT');
    setState(() {});
  }

  Future<void> _showCreateServiceDialog({Map<String, dynamic>? service}) async {
    final nameController = TextEditingController(
      text: service?['name']?.toString() ?? '',
    );
    final unitPriceController = TextEditingController(
      text: service?['unitPrice']?.toString() ?? '',
    );
    String pricingModel = service?['pricingModel']?.toString() ?? 'FLAT';
    String? templateId = service?['aiTemplateId']?.toString();
    bool isActive = service?['isActive'] == true;

    List<dynamic> templates = [];
    try {
      templates = await _templates;
    } catch (e) {
      if (mounted) {
        ErrorHandler.show(context, e);
      }
    }

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(service == null ? 'Add AI Service' : 'Edit AI Service'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: unitPriceController,
                decoration: const InputDecoration(
                  labelText: 'Unit Price (KES)',
                ),
                keyboardType: TextInputType.number,
              ),
              DropdownButtonFormField<String>(
                value: pricingModel,
                items: const [
                  DropdownMenuItem(value: 'FLAT', child: Text('Flat')),
                  DropdownMenuItem(value: 'PER_PAGE', child: Text('Per Page')),
                  DropdownMenuItem(
                    value: 'PER_MINUTE',
                    child: Text('Per Minute'),
                  ),
                ],
                onChanged: (value) {
                  if (value == null) return;
                  setState(() => pricingModel = value);
                },
                decoration: const InputDecoration(labelText: 'Pricing Model'),
              ),
              DropdownButtonFormField<String>(
                value: templateId,
                items: [
                  const DropdownMenuItem(
                    value: null,
                    child: Text('No Template'),
                  ),
                  ...templates.map(
                    (t) => DropdownMenuItem(
                      value: t['id']?.toString(),
                      child: Text(t['name']?.toString() ?? 'Template'),
                    ),
                  ),
                ],
                onChanged: (value) => setState(() => templateId = value),
                decoration: const InputDecoration(labelText: 'AI Template'),
              ),
              SwitchListTile(
                value: isActive,
                onChanged: (value) => setState(() => isActive = value),
                title: const Text('Active'),
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
              final unitPrice = int.tryParse(unitPriceController.text.trim());
              if (name.isEmpty || unitPrice == null) {
                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Name and unit price are required.'),
                  ),
                );
                return;
              }
              try {
                if (service == null) {
                  await _api.createAiService(
                    name: name,
                    category: 'AI',
                    pricingModel: pricingModel,
                    unitPrice: unitPrice,
                    aiTemplateId: templateId,
                    isActive: isActive,
                  );
                } else {
                  await _api.updateAiService(
                    id: service['id']?.toString() ?? '',
                    name: name,
                    pricingModel: pricingModel,
                    unitPrice: unitPrice,
                    aiTemplateId: templateId,
                    isActive: isActive,
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

  Future<void> _showCreateTemplateDialog({
    Map<String, dynamic>? template,
  }) async {
    final nameController = TextEditingController(
      text: template?['name']?.toString() ?? '',
    );
    final systemPromptController = TextEditingController(
      text: template?['systemPrompt']?.toString() ?? '',
    );
    final schemaController = TextEditingController(
      text: template?['userPromptSchema'] != null
          ? (template!['userPromptSchema'] as Map).entries
                .map((e) => '${e.key}:${e.value}')
                .join('\n')
          : '',
    );
    String outputFormat = template?['outputFormat']?.toString() ?? 'TEXT';
    bool isActive = template?['isActive'] == true;

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(template == null ? 'Add AI Template' : 'Edit AI Template'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: systemPromptController,
                decoration: const InputDecoration(labelText: 'System Prompt'),
                maxLines: 4,
              ),
              TextField(
                controller: schemaController,
                decoration: const InputDecoration(
                  labelText: 'Schema (key:type per line)',
                  helperText: 'Example:\nfullName:string\njobTitle:string',
                ),
                maxLines: 6,
              ),
              DropdownButtonFormField<String>(
                value: outputFormat,
                items: const [
                  DropdownMenuItem(value: 'TEXT', child: Text('Text')),
                  DropdownMenuItem(value: 'DOCX', child: Text('DOCX')),
                  DropdownMenuItem(value: 'PDF', child: Text('PDF')),
                ],
                onChanged: (value) =>
                    setState(() => outputFormat = value ?? 'TEXT'),
                decoration: const InputDecoration(labelText: 'Output Format'),
              ),
              SwitchListTile(
                value: isActive,
                onChanged: (value) => setState(() => isActive = value),
                title: const Text('Active'),
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
              final systemPrompt = systemPromptController.text.trim();
              final schemaText = schemaController.text.trim();
              if (name.isEmpty || systemPrompt.isEmpty || schemaText.isEmpty) {
                if (!mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('All fields are required.')),
                );
                return;
              }
              final schema = <String, String>{};
              for (final line in schemaText.split('\n')) {
                final parts = line.split(':');
                if (parts.length < 2) continue;
                schema[parts[0].trim()] = parts.sublist(1).join(':').trim();
              }
              try {
                if (template == null) {
                  await _api.createAiTemplate(
                    name: name,
                    systemPrompt: systemPrompt,
                    userPromptSchema: schema,
                    outputFormat: outputFormat,
                    isActive: isActive,
                  );
                } else {
                  await _api.updateAiTemplate(
                    id: template['id']?.toString() ?? '',
                    name: name,
                    systemPrompt: systemPrompt,
                    userPromptSchema: schema,
                    outputFormat: outputFormat,
                    isActive: isActive,
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

  Future<void> _showCreateJobDialog() async {
    List<dynamic> services = [];
    List<dynamic> templates = [];
    try {
      services = await _services;
    } catch (e) {
      if (mounted) {
        ErrorHandler.show(context, e);
      }
    }
    try {
      templates = await _templates;
    } catch (e) {
      if (mounted) {
        ErrorHandler.show(context, e);
      }
    }
    if (services.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No AI services configured.')),
      );
      return;
    }

    String? serviceId = services.first['id']?.toString();
    String? templateId = services.first['aiTemplateId']?.toString();
    final inputControllers = <String, TextEditingController>{};

    Map<String, dynamic>? selectedTemplate;
    if (templateId != null) {
      selectedTemplate = templates.firstWhere(
        (t) => t['id']?.toString() == templateId,
        orElse: () => null,
      );
    }

    Map<String, dynamic> schema = {};
    if (selectedTemplate != null) {
      schema = Map<String, dynamic>.from(
        selectedTemplate['userPromptSchema'] ?? {},
      );
    }

    await showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('New AI Job'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<String>(
                  value: serviceId,
                  items: services
                      .map(
                        (s) => DropdownMenuItem(
                          value: s['id']?.toString(),
                          child: Text(s['name']?.toString() ?? 'Service'),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value == null) return;
                    final service = services.firstWhere(
                      (s) => s['id']?.toString() == value,
                    );
                    setState(() {
                      serviceId = value;
                      templateId = service['aiTemplateId']?.toString();
                      selectedTemplate = templates.firstWhere(
                        (t) => t['id']?.toString() == templateId,
                        orElse: () => null,
                      );
                      schema = selectedTemplate != null
                          ? Map<String, dynamic>.from(
                              selectedTemplate!['userPromptSchema'] ?? {},
                            )
                          : {};
                      inputControllers.clear();
                    });
                  },
                  decoration: const InputDecoration(labelText: 'Service'),
                ),
                DropdownButtonFormField<String>(
                  value: templateId,
                  items: templates
                      .map(
                        (t) => DropdownMenuItem(
                          value: t['id']?.toString(),
                          child: Text(t['name']?.toString() ?? 'Template'),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      templateId = value;
                      selectedTemplate = templates.firstWhere(
                        (t) => t['id']?.toString() == templateId,
                        orElse: () => null,
                      );
                      schema = selectedTemplate != null
                          ? Map<String, dynamic>.from(
                              selectedTemplate!['userPromptSchema'] ?? {},
                            )
                          : {};
                      inputControllers.clear();
                    });
                  },
                  decoration: const InputDecoration(labelText: 'Template'),
                ),
                const SizedBox(height: 8),
                ...schema.keys.map((key) {
                  inputControllers[key] ??= TextEditingController();
                  return TextField(
                    controller: inputControllers[key],
                    decoration: InputDecoration(labelText: key),
                  );
                }).toList(),
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
                if (serviceId == null) return;
                final inputData = <String, dynamic>{};
                for (final entry in inputControllers.entries) {
                  inputData[entry.key] = entry.value.text.trim();
                }
                try {
                  await _api.createAiJob(
                    serviceId: serviceId!,
                    templateId: templateId,
                    inputData: inputData,
                  );
                  if (!mounted) return;
                  Navigator.of(context).pop();
                  _reload();
                } catch (e) {
                  if (!mounted) return;
                  ErrorHandler.show(context, e);
                }
              },
              child: const Text('Generate'),
            ),
          ],
        ),
      ),
    );
  }

  void _showJobDetails(Map<String, dynamic> job) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('AI Job ${job['id']}'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Status: ${job['status'] ?? ''}'),
              const SizedBox(height: 8),
              if (job['outputText'] != null) ...[
                const Text('Output:'),
                const SizedBox(height: 6),
                Text(job['outputText'].toString()),
              ],
              if (job['outputFilePath'] != null) ...[
                const SizedBox(height: 8),
                Text('File: ${job['outputFilePath']}'),
              ],
              if (job['error'] != null) ...[
                const SizedBox(height: 8),
                const Text('Generation failed. Please retry.'),
              ],
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
        title: const Text('AI Services'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Services'),
            Tab(text: 'Templates'),
            Tab(text: 'Jobs'),
            Tab(text: 'Records'),
          ],
        ),
        actions: [
          IconButton(onPressed: _reload, icon: const Icon(Icons.refresh)),
          if (_tabController.index == 0)
            IconButton(
              onPressed: () => _showCreateServiceDialog(),
              icon: const Icon(Icons.add),
            ),
          if (_tabController.index == 1)
            IconButton(
              onPressed: () => _showCreateTemplateDialog(),
              icon: const Icon(Icons.add),
            ),
          if (_tabController.index == 2)
            IconButton(
              onPressed: _showCreateJobDialog,
              icon: const Icon(Icons.add_circle_outline),
            ),
        ],
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildServicesTab(),
          _buildTemplatesTab(),
          _buildJobsTab(),
          _buildRecordsTab(),
        ],
      ),
    );
  }

  Widget _buildServicesTab() {
    return FutureBuilder<List<dynamic>>(
      future: _services,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return ErrorView(error: snapshot.error!);
        }
        final services = snapshot.data ?? [];
        if (services.isEmpty) {
          return const Center(child: Text('No AI services configured.'));
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: services.length,
          itemBuilder: (context, index) {
            final service = services[index] as Map<String, dynamic>;
            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text(service['name']?.toString() ?? 'Service'),
                subtitle: Text(
                  'Price: KES ${service['unitPrice']} • Model: ${service['pricingModel']}',
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => _showCreateServiceDialog(service: service),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildTemplatesTab() {
    return FutureBuilder<List<dynamic>>(
      future: _templates,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return ErrorView(error: snapshot.error!);
        }
        final templates = snapshot.data ?? [];
        if (templates.isEmpty) {
          return const Center(child: Text('No templates configured.'));
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: templates.length,
          itemBuilder: (context, index) {
            final template = templates[index] as Map<String, dynamic>;
            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text(template['name']?.toString() ?? 'Template'),
                subtitle: Text(
                  'Format: ${template['outputFormat']} • Active: ${template['isActive'] == true ? 'Yes' : 'No'}',
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () =>
                      _showCreateTemplateDialog(template: template),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildJobsTab() {
    return FutureBuilder<List<dynamic>>(
      future: _jobs,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return ErrorView(error: snapshot.error!);
        }
        final jobs = snapshot.data ?? [];
        if (jobs.isEmpty) {
          return const Center(child: Text('No AI jobs yet.'));
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: jobs.length,
          itemBuilder: (context, index) {
            final job = jobs[index] as Map<String, dynamic>;
            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text('Job ${job['id']}'),
                subtitle: Text('Status: ${job['status']}'),
                trailing: IconButton(
                  icon: const Icon(Icons.visibility),
                  onPressed: () => _showJobDetails(job),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildRecordsTab() {
    return FutureBuilder<List<dynamic>>(
      future: _records,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return ErrorView(error: snapshot.error!);
        }
        final records = snapshot.data ?? [];
        if (records.isEmpty) {
          return const Center(child: Text('No AI records yet.'));
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: records.length,
          itemBuilder: (context, index) {
            final record = records[index] as Map<String, dynamic>;
            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                title: Text(record['title']?.toString() ?? 'Record'),
                subtitle: Text('File: ${record['filePath'] ?? ''}'),
              ),
            );
          },
        );
      },
    );
  }
}
