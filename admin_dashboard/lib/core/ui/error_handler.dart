import 'package:flutter/material.dart';
import '../errors/app_error.dart';

class ErrorHandler {
  static void show(BuildContext context, Object error) {
    final message = error is AppError ? error.message : 'Something went wrong.';
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }
}
