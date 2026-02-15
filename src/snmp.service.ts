import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as snmp from 'net-snmp';
import { PrismaService } from './prisma.service';

@Injectable()
export class SnmpService implements OnModuleInit {
  private readonly logger = new Logger(SnmpService.name);
  private timer?: NodeJS.Timeout;
  private processing = false;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const enabled = (process.env.SNMP_ENABLED ?? 'false').toLowerCase() === 'true';
    if (!enabled) return;

    const pollSeconds = Number(process.env.SNMP_POLL_SECONDS ?? '60');
    const pollMs = Number.isFinite(pollSeconds) && pollSeconds > 5 ? pollSeconds * 1000 : 60000;

    this.timer = setInterval(() => this.poll(), pollMs);
    this.poll();
  }

  private async poll() {
    if (this.processing) return;
    this.processing = true;
    try {
      const devices = await this.prisma.printerDevice.findMany({ where: { enabled: true } });
      for (const device of devices) {
        await this.pollDevice(device.id, device.host, device.community, device.scanOid, device.copyOid);
      }
    } catch (error) {
      this.logger.error('SNMP poll failed', error as Error);
    } finally {
      this.processing = false;
    }
  }

  private async pollDevice(
    deviceId: string,
    host: string,
    community: string,
    scanOid: string,
    copyOid: string,
  ) {
    const session = snmp.createSession(host, community, { timeout: 2000, retries: 1 });
    const oids = [scanOid, copyOid];

    const values = await new Promise<number[]>((resolve) => {
      session.get(oids, (error, varbinds) => {
        if (error || !varbinds) {
          this.logger.warn(`SNMP get failed for ${host}: ${error?.message ?? 'unknown'}`);
          session.close();
          return resolve([NaN, NaN]);
        }
        const scanVal = Number(varbinds[0]?.value ?? NaN);
        const copyVal = Number(varbinds[1]?.value ?? NaN);
        session.close();
        resolve([scanVal, copyVal]);
      });
    });

    if (!Number.isFinite(values[0]) && !Number.isFinite(values[1])) return;

    const device = await this.prisma.printerDevice.findUnique({ where: { id: deviceId } });
    if (!device) return;

    const updates: Record<string, number> = {};

    if (Number.isFinite(values[0])) {
      const current = values[0];
      const last = device.lastScanCount ?? current;
      const delta = current >= last ? current - last : 0;
      updates.lastScanCount = current;
      if (delta > 0) {
        await this.prisma.scanCopyMetric.create({
          data: {
            deviceId,
            type: 'SCAN',
            count: delta,
          },
        });
      }
    }

    if (Number.isFinite(values[1])) {
      const current = values[1];
      const last = device.lastCopyCount ?? current;
      const delta = current >= last ? current - last : 0;
      updates.lastCopyCount = current;
      if (delta > 0) {
        await this.prisma.scanCopyMetric.create({
          data: {
            deviceId,
            type: 'COPY',
            count: delta,
          },
        });
      }
    }

    if (Object.keys(updates).length > 0) {
      await this.prisma.printerDevice.update({ where: { id: deviceId }, data: updates });
    }
  }

  async listDevices() {
    return this.prisma.printerDevice.findMany({ orderBy: { name: 'asc' } });
  }

  async createDevice(data: {
    name: string;
    host: string;
    community?: string;
    scanOid: string;
    copyOid: string;
  }) {
    return this.prisma.printerDevice.create({
      data: {
        name: data.name,
        host: data.host,
        community: data.community ?? 'public',
        scanOid: data.scanOid,
        copyOid: data.copyOid,
      },
    });
  }

  async updateDevice(id: string, data: {
    name?: string;
    host?: string;
    community?: string;
    scanOid?: string;
    copyOid?: string;
    enabled?: boolean;
  }) {
    return this.prisma.printerDevice.update({ where: { id }, data });
  }

  async getDailyTotals(date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    const metrics = await this.prisma.scanCopyMetric.findMany({
      where: { recordedAt: { gte: start, lte: end } },
    });

    const totals = metrics.reduce(
      (acc, metric) => {
        if (metric.type === 'SCAN') acc.scans += metric.count;
        if (metric.type === 'COPY') acc.copies += metric.count;
        return acc;
      },
      { scans: 0, copies: 0 },
    );

    return { date: start.toISOString().slice(0, 10), ...totals };
  }
}
