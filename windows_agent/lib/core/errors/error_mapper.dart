import 'dart:async';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../log/logger.dart';
import 'app_error.dart';

class ErrorMapper {
  static AppError fromResponse(http.Response response) {
    final status = response.statusCode;
    Logger.log('HTTP error $status: ${response.body}');

    if (status == 400 || status == 422) {
      return AppError(
        type: AppErrorType.validation,
        message: 'Invalid input. Please check and try again.',
        statusCode: status,
      );
    }
    if (status == 401) {
      return AppError(
        type: AppErrorType.unauthorized,
        message: 'Session expired. Please login again.',
        statusCode: status,
      );
    }
    if (status == 403) {
      return AppError(
        type: AppErrorType.forbidden,
        message: "You don’t have permission to perform this action.",
        statusCode: status,
      );
    }
    if (status == 404) {
      return AppError(
        type: AppErrorType.notFound,
        message: 'Requested resource was not found.',
        statusCode: status,
      );
    }
    if (status >= 500) {
      return AppError(
        type: AppErrorType.server,
        message: 'Server error. Please try again later.',
        statusCode: status,
      );
    }

    return AppError(
      type: AppErrorType.unknown,
      message: 'Something went wrong. Please try again.',
      statusCode: status,
    );
  }

  static AppError fromException(Object error, [StackTrace? stackTrace]) {
    Logger.log('Unhandled exception: $error');

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
