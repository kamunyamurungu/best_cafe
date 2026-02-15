import 'package:flutter/material.dart';
import '../errors/app_error.dart';
import '../errors/error_mapper.dart';

class ErrorHandler {
  static final Map<String, DateTime> _lastShown = {};
  static const Duration _minInterval = Duration(seconds: 5);

  static void show(BuildContext context, Object error) {
    final appError = error is AppError
        ? error
        : ErrorMapper.fromException(error);
    final key = '${appError.type}:${appError.message}';
    final now = DateTime.now();
    final last = _lastShown[key];
    if (last != null && now.difference(last) < _minInterval) {
      return;
    }
    _lastShown[key] = now;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(appError.message), backgroundColor: Colors.red),
    );
  }
}
