import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/bloc/sessions_bloc.dart';
import '../../core/models.dart';
import '../../core/ui/error_view.dart';
import '../../core/api_service.dart';

class SessionsScreen extends StatelessWidget {
  const SessionsScreen({super.key});

  String _generateTempPassword() {
    final now = DateTime.now().millisecondsSinceEpoch.toString();
    return 'Temp${now.substring(now.length - 6)}';
  }

  Future<Map<String, dynamic>?> _showQuickCreateAccountDialog(
    BuildContext context, {
    String? initialPhone,
    String? initialEmail,
  }) async {
    final api = ApiService();
    final messenger = ScaffoldMessenger.of(context);
    final fullNameController = TextEditingController();
    final phoneController = TextEditingController(text: initialPhone ?? '');
    final emailController = TextEditingController(text: initialEmail ?? '');
    final passwordController = TextEditingController(
      text: _generateTempPassword(),
    );

    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (dialogContext, setStateDialog) => AlertDialog(
          title: const Text('Create account'),
          content: SizedBox(
            width: 360,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: fullNameController,
                  decoration: const InputDecoration(labelText: 'Full name'),
                ),
                TextField(
                  controller: phoneController,
                  decoration: const InputDecoration(labelText: 'Phone (optional)'),
                  keyboardType: TextInputType.phone,
                ),
                TextField(
                  controller: emailController,
                  decoration: const InputDecoration(labelText: 'Email (optional)'),
                  keyboardType: TextInputType.emailAddress,
                ),
                TextField(
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: 'Temporary password',
                    suffixIcon: IconButton(
                      icon: const Icon(Icons.refresh),
                      onPressed: () {
                        setStateDialog(() {
                          passwordController.text = _generateTempPassword();
                        });
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final fullName = fullNameController.text.trim();
                final phone = phoneController.text.trim();
                final email = emailController.text.trim();
                final password = passwordController.text.trim();

                if (fullName.isEmpty) {
                  messenger.showSnackBar(
                    const SnackBar(content: Text('Full name is required.')),
                  );
                  return;
                }
                if (phone.isEmpty && email.isEmpty) {
                  messenger.showSnackBar(
                    const SnackBar(content: Text('Phone or email is required.')),
                  );
                  return;
                }
                if (password.isEmpty) {
                  messenger.showSnackBar(
                    const SnackBar(content: Text('Password is required.')),
                  );
                  return;
                }

                try {
                  final created = await api.createUser(
                    fullName: fullName,
                    password: password,
                    email: email.isEmpty ? null : email,
                    phone: phone.isEmpty ? null : phone,
                    role: 'CUSTOMER',
                    status: 'ACTIVE',
                  );
                  if (!dialogContext.mounted) return;
                  Navigator.of(dialogContext).pop(created);
                } catch (error) {
                  if (!dialogContext.mounted) return;
                  messenger.showSnackBar(
                    SnackBar(content: Text('Create failed: $error')),
                  );
                }
              },
              child: const Text('Create'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showRefundDialog(
    BuildContext context,
    Session session,
    int refundDue,
  ) async {
    final sessionsBloc = context.read<SessionsBloc>();
    final messenger = ScaffoldMessenger.of(context);
    final phoneController = TextEditingController();
    final emailController = TextEditingController();
    String method = 'CASH';
    await showDialog(
      context: context,
      builder: (dialogContext) => BlocProvider.value(
        value: sessionsBloc,
        child: StatefulBuilder(
          builder: (dialogContext, setStateDialog) => AlertDialog(
            title: const Text('Refund Prepaid Balance'),
            content: SizedBox(
              width: 360,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Refund due: KES $refundDue'),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    value: method,
                    decoration: const InputDecoration(labelText: 'Refund method'),
                    items: const [
                      DropdownMenuItem(value: 'CASH', child: Text('Cash')),
                      DropdownMenuItem(value: 'CREDIT', child: Text('Credit to user')),
                    ],
                    onChanged: (value) {
                      if (value == null) return;
                      setStateDialog(() => method = value);
                    },
                  ),
                  if (method == 'CREDIT') ...[
                    const SizedBox(height: 12),
                    TextField(
                      controller: phoneController,
                      decoration: const InputDecoration(
                        labelText: 'User phone number (optional)',
                      ),
                      keyboardType: TextInputType.phone,
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: emailController,
                      decoration: const InputDecoration(
                        labelText: 'User email (optional)',
                      ),
                      keyboardType: TextInputType.emailAddress,
                    ),
                  ],
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(),
                child: const Text('Cancel'),
              ),
              if (method == 'CREDIT')
                TextButton(
                  onPressed: () async {
                    final created = await _showQuickCreateAccountDialog(
                      dialogContext,
                      initialPhone: phoneController.text.trim(),
                      initialEmail: emailController.text.trim(),
                    );
                    if (created == null) return;
                    setStateDialog(() {
                      final createdPhone = created['phone']?.toString() ?? '';
                      final createdEmail = created['email']?.toString() ?? '';
                      if (createdPhone.isNotEmpty) {
                        phoneController.text = createdPhone;
                      }
                      if (createdEmail.isNotEmpty) {
                        emailController.text = createdEmail;
                      }
                    });
                    messenger.showSnackBar(
                      const SnackBar(content: Text('Account created.')),
                    );
                  },
                  child: const Text('Create account'),
                ),
              ElevatedButton(
                onPressed: () async {
                  final phone = phoneController.text.trim();
                  final email = emailController.text.trim();
                  if (method == 'CREDIT' && phone.isEmpty && email.isEmpty) {
                    messenger.showSnackBar(
                      const SnackBar(content: Text('Phone or email is required.')),
                    );
                    return;
                  }
                  try {
                    await ApiService().refundPrepaidSession(
                      sessionId: session.id,
                      refundMethod: method,
                      phone: method == 'CREDIT' ? phone : null,
                      email: method == 'CREDIT' ? email : null,
                    );
                    if (!context.mounted) return;
                    Navigator.of(dialogContext).pop();
                    sessionsBloc.add(const SessionsRequested());
                    messenger.showSnackBar(
                      const SnackBar(content: Text('Refund processed.')),
                    );
                  } catch (e) {
                    if (!context.mounted) return;
                    messenger.showSnackBar(
                      SnackBar(content: Text('Refund failed: $e')),
                    );
                  }
                },
                child: const Text('Process Refund'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {

    return BlocBuilder<SessionsBloc, SessionsState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('All Sessions'),
            actions: [
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () => context.read<SessionsBloc>().add(const SessionsRequested()),
              ),
            ],
          ),
          body: switch (state) {
            SessionsLoading() => const Center(child: CircularProgressIndicator()),
            SessionsFailure(:final message) => ErrorView(error: Exception(message)),
            SessionsLoaded(:final items) => ListView.builder(
                padding: const EdgeInsets.all(16.0),
                itemCount: items.length,
                itemBuilder: (context, index) {
                  final session = items[index];
                  final prepaidAmount = session.prepaidAmount;
                  final refundDue = (prepaidAmount != null && session.totalCost != null)
                      ? (prepaidAmount - session.totalCost!).clamp(0, 1 << 31)
                      : 0;
                  final isRefunded = session.refundApplied == true;
                  final canRefund =
                      session.status == 'ENDED' && refundDue > 0 && !isRefunded;
                  return Card(
                    margin: const EdgeInsets.only(bottom: 8.0),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Session ${session.id}', style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: 4),
                          Text('Computer: ${session.computerId} | Status: ${session.status}'),
                          const SizedBox(height: 8),
                          if (session.status == 'PAUSED')
                            Row(
                              children: [
                                ElevatedButton.icon(
                                  onPressed: () async {
                                    try {
                                      await ApiService().resumeSession(session.id);
                                      // socket event will update state; optionally reload
                                    } catch (e) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(content: Text('Failed to resume: $e')),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.play_arrow),
                                  label: const Text('Reopen Computer'),
                                ),
                                const SizedBox(width: 12),
                                OutlinedButton.icon(
                                  onPressed: () async {
                                    try {
                                      await ApiService().endSession(session.id);
                                    } catch (e) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        SnackBar(content: Text('Failed to close: $e')),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.stop),
                                  label: const Text('Close Session'),
                                ),
                              ],
                            )
                          else
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Cost: KES ${session.cost}'),
                                if (isRefunded)
                                  Text(
                                    'Refunded: KES ${session.refundAmount ?? refundDue}',
                                    style: const TextStyle(color: Colors.green),
                                  ),
                                if (canRefund)
                                  OutlinedButton.icon(
                                    onPressed: () => _showRefundDialog(context, session, refundDue),
                                    icon: const Icon(Icons.currency_exchange),
                                    label: const Text('Refund'),
                                  ),
                              ],
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            _ => const SizedBox.shrink(),
          },
        );
      },
    );
  }
}