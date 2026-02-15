import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { execFile } from 'child_process';
import { PrismaService } from './prisma.service';
import { PrintJobSource, PrintJobStatus } from './billing.enums';

@Injectable()
export class PrintServerListenerService implements OnModuleInit {
  private readonly logger = new Logger(PrintServerListenerService.name);
  private timer?: NodeJS.Timeout;
  private processing = false;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const enabled = (process.env.PRINT_SERVER_ENABLED ?? 'false').toLowerCase() === 'true';
    if (!enabled) return;

    if (process.platform !== 'win32') {
      this.logger.warn('Print server listener enabled but not running on Windows. Skipping.');
      return;
    }

    const pollSeconds = Number(process.env.PRINT_SERVER_POLL_SECONDS ?? '10');
    const pollMs = Number.isFinite(pollSeconds) && pollSeconds > 1 ? pollSeconds * 1000 : 10000;

    this.timer = setInterval(() => this.poll(), pollMs);
    this.poll();
  }

  private async poll() {
    if (this.processing) return;
    this.processing = true;
    try {
      const host = (process.env.PRINT_SERVER_HOST ?? 'localhost').trim();
      const jobs = await this.fetchPrintJobs(host);
      if (jobs.length == 0) return;

      const computer = await this.ensurePrintServerComputer(host);

      for (const job of jobs) {
        const externalJobId = `${host}|${job.printerName}|${job.id}`;
        const existing = await this.prisma.printJob.findFirst({
          where: { externalJobId } as any,
        });
        if (existing) continue;

        const pages = job.totalPages > 0 ? job.totalPages : job.pagesPrinted > 0 ? job.pagesPrinted : 1;

        await this.prisma.printJob.create({
          data: {
            computerId: computer.id,
            externalJobId,
            spoolJobId: job.id,
            printerName: job.printerName,
            pages,
            isColor: false,
            paperSize: 'UNKNOWN',
            status: PrintJobStatus.PENDING,
            source: PrintJobSource.PRINT_SERVER,
          } as any,
        });
      }
    } catch (error) {
      this.logger.error('Print server poll failed', error as Error);
    } finally {
      this.processing = false;
    }
  }

  private async ensurePrintServerComputer(host: string) {
    const token = `PRINT_SERVER:${host}`;
    const existing = await this.prisma.computer.findUnique({ where: { deviceToken: token } });
    if (existing) return existing;

    return this.prisma.computer.create({
      data: {
        name: `Print Server (${host})`,
        deviceToken: token,
        status: 'AVAILABLE',
      },
    });
  }

  private fetchPrintJobs(host: string): Promise<PrintJobDto[]> {
    const cmd = [
      '-NoProfile',
      '-Command',
      `Get-PrintJob -ComputerName "${host}" | Select-Object Id,PrinterName,TotalPages,PagesPrinted,DocumentName,UserName,SubmittedTime | ConvertTo-Json`,
    ];

    return new Promise((resolve, reject) => {
      execFile('powershell.exe', cmd, { maxBuffer: 1024 * 1024 }, (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }
        const raw = stdout.trim();
        if (!raw) {
          resolve([]);
          return;
        }
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            resolve(parsed.map((j) => PrintJobDto.fromJson(j)));
          } else {
            resolve([PrintJobDto.fromJson(parsed)]);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}

class PrintJobDto {
  constructor(
    public id: number,
    public printerName: string,
    public totalPages: number,
    public pagesPrinted: number,
  ) {}

  static fromJson(json: Record<string, unknown>): PrintJobDto {
    return new PrintJobDto(
      Number(json['Id'] ?? json['id'] ?? 0),
      String(json['PrinterName'] ?? json['printerName'] ?? ''),
      Number(json['TotalPages'] ?? json['totalPages'] ?? 0),
      Number(json['PagesPrinted'] ?? json['pagesPrinted'] ?? 0),
    );
  }
}
