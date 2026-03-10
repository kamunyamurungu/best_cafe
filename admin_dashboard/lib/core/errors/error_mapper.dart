import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../logger/app_logger.dart';
import 'app_error.dart';

class ErrorMapper {
  static AppError fromResponse(http.Response response) {
    final status = response.statusCode;
    AppLogger.log('HTTP error $status', response.body);
    String? apiMessage;

    try {
      final data = json.decode(response.body);
      if (data is Map) {
        final message = data['message'];
        if (message is List) {
          apiMessage = message.join(' ');
        } else if (message != null) {
          apiMessage = message.toString();
        }
      }
    } catch (_) {}

    if (status == 400 || status == 422) {
      return AppError(
        type: AppErrorType.validation,
        message: apiMessage ?? 'Invalid input. Please check and try again.',
        statusCode: status,
      );
    }
    if (status == 401) {
      return AppError(
        type: AppErrorType.unauthorized,
        message: apiMessage ?? 'Session expired. Please login again.',
        statusCode: status,
      );
    }
    if (status == 403) {
      return AppError(
        type: AppErrorType.forbidden,
        message: apiMessage ?? "You don’t have permission to perform this action.",
        statusCode: status,
      );
    }
    if (status == 404) {
      return AppError(
        type: AppErrorType.notFound,
        message: apiMessage ?? 'Requested resource was not found.',
        statusCode: status,
      );
    }
    if (status >= 500) {
      return AppError(
        type: AppErrorType.server,
        message: apiMessage ?? 'Server error. Please try again later.',
        statusCode: status,
      );
    }

    return AppError(
      type: AppErrorType.unknown,
      message: apiMessage ?? 'Something went wrong. Please try again.',
      statusCode: status,
    );
  }

  static AppError fromException(Object error, [StackTrace? stackTrace]) {
    AppLogger.log('Unhandled exception', error, stackTrace);

    if (error is AppError) {
      return error;
    }

    if (error is SocketException) {
      return AppError(
        type: AppErrorType.network,
        message: 'No internet connection. Please check your network.',
      );
    }

    if (error is TimeoutException) {
      return AppError(
        type: AppErrorType.timeout,
        message: 'Connection timed out. Please try again.',
      );
    }

    return AppError(
      type: AppErrorType.unknown,
      message: 'Something went wrong. Please try again.',
    );
  }
}
