import 'dart:io';
// Lightweight path join to avoid extra dependency

class Logger {
  static File? _file;

  static Future<void> init({String? dirPath}) async {
    try {
      final dir = dirPath != null ? Directory(dirPath) : Directory.current;
      if (!await dir.exists()) {
        await dir.create(recursive: true);
      }
      final logsDir = Directory(_join(dir.path, 'logs'));
      if (!await logsDir.exists()) {
        await logsDir.create(recursive: true);
      }
      _file = File(_join(logsDir.path, 'app.log'));
      if (!await _file!.exists()) {
        await _file!.create(recursive: true);
      }
      await log('Logger initialized at: ${_file!.path}');
    } catch (e) {
      // If logging setup fails, do nothing.
    }
  }

  static String _join(String a, String b) {
    if (a.endsWith(Platform.pathSeparator)) {
      return a + b;
    }
    return a + Platform.pathSeparator + b;
  }

  static Future<void> log(String message) async {
    try {
      final ts = DateTime.now().toIso8601String();
      final line = '[$ts] $message\n';
      if (_file != null) {
        await _file!.writeAsString(line, mode: FileMode.append, flush: false);
      }
    } catch (_) {
      // swallow logging errors
    }
  }
}
