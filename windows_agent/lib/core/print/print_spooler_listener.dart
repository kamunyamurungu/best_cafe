import 'dart:async';
import 'dart:convert';
import 'dart:ffi';
import 'package:ffi/ffi.dart';
import 'package:http/http.dart' as http;
import 'package:win32/win32.dart';
import '../config/config.dart';
import '../log/logger.dart';
import '../errors/error_mapper.dart';

const int jobControlPause = 1;
const int jobControlResume = 2;
const int jobControlCancel = 3;

class PrintJobInfo {
  final int jobId;
  final String printerName;
  final int totalPages;
  final int pagesPrinted;
  final String? document;
  final String? datatype;

  const PrintJobInfo({
    required this.jobId,
    required this.printerName,
    required this.totalPages,
    required this.pagesPrinted,
    this.document,
    this.datatype,
  });
}

class PrintSpoolerListener {
  final Future<String?> Function() getComputerId;
  final void Function(Object error)? onError;
  final Duration interval;
  Timer? _timer;
  bool _polling = false;
  final Set<String> _seenJobs = <String>{};
  final Set<String> _releasedJobs = <String>{};

  PrintSpoolerListener({
    required this.getComputerId,
    this.onError,
    this.interval = const Duration(seconds: 5),
  });

  void start() {
    if (_timer != null) return;
    _timer = Timer.periodic(interval, (_) => _poll());
    _poll();
  }

  void stop() {
    _timer?.cancel();
    _timer = null;
  }

  Future<void> _poll() async {
    if (_polling) return;
    _polling = true;
    try {
      final computerId = await getComputerId();
      if (computerId == null || computerId.trim().isEmpty) return;

      final sessionId = await _fetchActiveSessionId(computerId);
      final printers = _listPrinters();
      for (final printer in printers) {
        final jobs = _listJobs(printer);
        for (final job in jobs) {
          final key = '${job.printerName}|${job.jobId}';
          if (_seenJobs.contains(key)) continue;
          _seenJobs.add(key);
          pauseJob(job.printerName, job.jobId);
          await _reportJob(computerId, sessionId, job);
        }
      }

      if (_seenJobs.length > 1000) {
        _seenJobs.remove(_seenJobs.first);
      }

      await _releaseApprovedJobs(computerId);
      if (_releasedJobs.length > 1000) {
        _releasedJobs.remove(_releasedJobs.first);
      }
    } catch (e) {
      await Logger.log('Print spooler poll error: $e');
      onError?.call(ErrorMapper.fromException(e));
    } finally {
      _polling = false;
    }
  }

  Future<void> _releaseApprovedJobs(String computerId) async {
    try {
      final url = '${await Config.serverUrl}/print-jobs?status=APPROVED&computerId=$computerId';
      final response = await http.get(Uri.parse(url));
      if (response.statusCode != 200) {
        if (response.statusCode >= 500) {
          onError?.call(ErrorMapper.fromResponse(response));
        }
        return;
      }
      final body = response.body.trim();
      if (body.isEmpty) return;
      final decoded = jsonDecode(body);
      if (decoded is! List) return;

      for (final item in decoded) {
        if (item is! Map<String, dynamic>) continue;
        final jobId = item['id']?.toString();
        if (jobId == null || _releasedJobs.contains(jobId)) continue;

        final printerName = item['printerName']?.toString();
        final spoolJobRaw = item['spoolJobId'];
        final int? spoolJobId = spoolJobRaw is int
            ? spoolJobRaw
            : int.tryParse(spoolJobRaw?.toString() ?? '');

        if (printerName == null || printerName.isEmpty || spoolJobId == null) {
          continue;
        }

        final resumed = resumeJob(printerName, spoolJobId);
        if (resumed) {
          _releasedJobs.add(jobId);
        }
      }
    } catch (e) {
      await Logger.log('Release approved jobs error: $e');
      onError?.call(ErrorMapper.fromException(e));
    }
  }

  List<String> _listPrinters() {
    final printers = <String>[];
    final pcbNeeded = calloc<DWORD>();
    final pcReturned = calloc<DWORD>();
    try {
      final flags = PRINTER_ENUM_LOCAL | PRINTER_ENUM_CONNECTIONS;
      EnumPrinters(flags, nullptr, 2, nullptr, 0, pcbNeeded, pcReturned);
      final bytesNeeded = pcbNeeded.value;
      if (bytesNeeded == 0) return printers;

      final buffer = calloc<BYTE>(bytesNeeded);
      try {
        final success = EnumPrinters(flags, nullptr, 2, buffer, bytesNeeded, pcbNeeded, pcReturned);
        if (success == 0) return printers;

        final count = pcReturned.value;
        final pInfo = buffer.cast<PRINTER_INFO_2>();
        for (var i = 0; i < count; i++) {
          final info = pInfo.elementAt(i).ref;
          final namePtr = info.pPrinterName;
          if (namePtr != nullptr) {
            printers.add(namePtr.toDartString());
          }
        }
      } finally {
        free(buffer);
      }
    } finally {
      free(pcbNeeded);
      free(pcReturned);
    }
    return printers;
  }

  static List<String> listPrintersStatic() {
    return PrintSpoolerListener(getComputerId: () async => null)._listPrinters();
  }

  List<PrintJobInfo> _listJobs(String printerName) {
    final jobs = <PrintJobInfo>[];
    final printerNamePtr = printerName.toNativeUtf16();
    final phPrinter = calloc<HANDLE>();
    final pcbNeeded = calloc<DWORD>();
    final pcReturned = calloc<DWORD>();

    try {
      final opened = OpenPrinter(printerNamePtr, phPrinter, nullptr);
      if (opened == 0) return jobs;
      final hPrinter = phPrinter.value;

      EnumJobs(hPrinter, 0, 256, 1, nullptr, 0, pcbNeeded, pcReturned);
      final bytesNeeded = pcbNeeded.value;
      if (bytesNeeded == 0) return jobs;

      final buffer = calloc<BYTE>(bytesNeeded);
      try {
        final success = EnumJobs(hPrinter, 0, 256, 1, buffer, bytesNeeded, pcbNeeded, pcReturned);
        if (success == 0) return jobs;

        final count = pcReturned.value;
        final pJob = buffer.cast<JOB_INFO_1>();
        for (var i = 0; i < count; i++) {
          final job = pJob.elementAt(i).ref;
          jobs.add(
            PrintJobInfo(
              jobId: job.JobId,
              printerName: printerName,
              totalPages: job.TotalPages,
              pagesPrinted: job.PagesPrinted,
              document: job.pDocument == nullptr ? null : job.pDocument.toDartString(),
              datatype: job.pDatatype == nullptr ? null : job.pDatatype.toDartString(),
            ),
          );
        }
      } finally {
        free(buffer);
      }
      ClosePrinter(hPrinter);
    } finally {
      free(printerNamePtr);
      free(phPrinter);
      free(pcbNeeded);
      free(pcReturned);
    }

    return jobs;
  }

  Future<String?> _fetchActiveSessionId(String computerId) async {
    try {
      final url = '${await Config.serverUrl}/sessions/active/$computerId';
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final body = response.body.trim();
        if (body.isEmpty || body == 'null') return null;
        final decoded = jsonDecode(body);
        if (decoded is Map<String, dynamic>) {
          return decoded['id']?.toString();
        }
      }
    } catch (e) {
      await Logger.log('Fetch active session failed: $e');
      onError?.call(ErrorMapper.fromException(e));
    }
    return null;
  }

  Future<void> _reportJob(String computerId, String? sessionId, PrintJobInfo job) async {
    final pages = job.totalPages > 0
        ? job.totalPages
        : (job.pagesPrinted > 0 ? job.pagesPrinted : 1);
    final isColor = _detectColor(job);
    final paperSize = _detectPaperSize(job) ?? 'UNKNOWN';
    final externalJobId = '${job.printerName}|${job.jobId}';

    final payload = {
      'computerId': computerId,
      'sessionId': sessionId,
      'externalJobId': externalJobId,
      'spoolJobId': job.jobId,
      'printerName': job.printerName,
      'pages': pages,
      'isColor': isColor,
      'paperSize': paperSize,
    };

    try {
      final url = '${await Config.serverUrl}/print-jobs/report';
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(payload),
      );
      await Logger.log('Print job report ${job.jobId} -> ${response.statusCode}');
      if (response.statusCode >= 500) {
        onError?.call(ErrorMapper.fromResponse(response));
      }
    } catch (e) {
      await Logger.log('Report print job failed: $e');
      onError?.call(ErrorMapper.fromException(e));
    }
  }

  bool _detectColor(PrintJobInfo job) {
    final haystack = '${job.datatype ?? ''} ${job.document ?? ''}'.toLowerCase();
    if (haystack.contains('color') || haystack.contains('colour')) return true;
    if (haystack.contains('cmyk') || haystack.contains('rgb')) return true;
    return false;
  }

  String? _detectPaperSize(PrintJobInfo job) {
    final text = '${job.document ?? ''}'.toUpperCase();
    const sizes = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'LETTER', 'LEGAL', 'TABLOID'];
    for (final size in sizes) {
      if (text.contains(size)) return size;
    }
    return null;
  }

  static bool pauseJob(String printerName, int jobId) {
    final printerNamePtr = printerName.toNativeUtf16();
    final phPrinter = calloc<HANDLE>();
    try {
      final opened = OpenPrinter(printerNamePtr, phPrinter, nullptr);
      if (opened == 0) return false;
      final hPrinter = phPrinter.value;
      final result = SetJob(hPrinter, jobId, 0, nullptr, jobControlPause);
      ClosePrinter(hPrinter);
      return result != 0;
    } finally {
      free(printerNamePtr);
      free(phPrinter);
    }
  }

  static bool resumeJob(String printerName, int jobId) {
    final printerNamePtr = printerName.toNativeUtf16();
    final phPrinter = calloc<HANDLE>();
    try {
      final opened = OpenPrinter(printerNamePtr, phPrinter, nullptr);
      if (opened == 0) return false;
      final hPrinter = phPrinter.value;
      final result = SetJob(hPrinter, jobId, 0, nullptr, jobControlResume);
      ClosePrinter(hPrinter);
      return result != 0;
    } finally {
      free(printerNamePtr);
      free(phPrinter);
    }
  }

  static bool cancelJob(String printerName, int jobId) {
    final printerNamePtr = printerName.toNativeUtf16();
    final phPrinter = calloc<HANDLE>();
    try {
      final opened = OpenPrinter(printerNamePtr, phPrinter, nullptr);
      if (opened == 0) return false;
      final hPrinter = phPrinter.value;
      final result = SetJob(hPrinter, jobId, 0, nullptr, jobControlCancel);
      ClosePrinter(hPrinter);
      return result != 0;
    } finally {
      free(printerNamePtr);
      free(phPrinter);
    }
  }
}
