import 'package:flutter/foundation.dart';

class AppLogger {
  static void log(String message, [Object? error, StackTrace? stackTrace]) {
    debugPrint('[AppLogger] $message');
    if (error != null) {
      debugPrint('Error: $error');
    }
    if (stackTrace != null) {
      debugPrint(stackTrace.toString());
    }
  }
}
