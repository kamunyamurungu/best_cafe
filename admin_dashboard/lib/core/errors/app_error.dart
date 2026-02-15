enum AppErrorType {
  network,
  unauthorized,
  forbidden,
  notFound,
  validation,
  server,
  timeout,
  unknown,
}

class AppError implements Exception {
  final AppErrorType type;
  final String message;
  final int? statusCode;

  AppError({required this.type, required this.message, this.statusCode});

  @override
  String toString() => message;
}
