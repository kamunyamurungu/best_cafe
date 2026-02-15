import { Injectable, ConflictException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrintJobSource, PrintJobStatus, PrintPricingType, TransactionType, TransactionStatus } from './billing.enums';
import { SocketsGateway } from './sockets.gateway';

@Injectable()
export class PrintJobsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => SocketsGateway))
    private socketsGateway: SocketsGateway,
  ) {}

  async reportJob(data: {
    computerId: string;
    sessionId?: string;
    externalJobId?: string;
    spoolJobId?: number;
    printerName: string;
    pages: number;
    isColor: boolean;
    paperSize: string;
  }) {
    const computer = await this.prisma.computer.findUnique({ where: { id: data.computerId } });
    if (!computer) {
      throw new NotFoundException('Computer not found');
    }

    if (data.sessionId) {
      const session = await this.prisma.session.findUnique({ where: { id: data.sessionId } });
      if (!session) {
        throw new NotFoundException('Session not found');
      }
    }

    const payload = {
      computerId: data.computerId,
      sessionId: data.sessionId,
      externalJobId: data.externalJobId,
      spoolJobId: data.spoolJobId,
      printerName: data.printerName,
      pages: data.pages,
      isColor: data.isColor,
      paperSize: data.paperSize,
      status: PrintJobStatus.PENDING,
      source: PrintJobSource.AGENT,
    } as any;

    // If externalJobId is provided, make this idempotent
    if (data.externalJobId) {
      return this.prisma.printJob.upsert({
        where: { externalJobId: data.externalJobId },
        update: {
          // Update mutable fields in case the report is retried
          spoolJobId: data.spoolJobId,
          printerName: data.printerName,
          pages: data.pages,
          isColor: data.isColor,
          paperSize: data.paperSize,
          sessionId: data.sessionId,
          computerId: data.computerId,
        },
        create: payload,
      });
    }

    return this.prisma.printJob.create({ data: payload });
  }

  async listJobs(filters: { status?: PrintJobStatus; computerId?: string; sessionId?: string }) {
    return this.prisma.printJob.findMany({
      where: {
        status: filters.status,
        computerId: filters.computerId,
        sessionId: filters.sessionId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveJob(id: string) {
    const job = await this.prisma.printJob.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Print job not found');
    }
    if (job.status !== PrintJobStatus.PENDING) {
      throw new ConflictException('Only pending jobs can be approved');
    }

    const pricingType = job.isColor ? PrintPricingType.COLOR : PrintPricingType.BW;
    const pricing = await this.prisma.printPricing.findFirst({
      where: { type: pricingType },
      orderBy: { createdAt: 'desc' },
    });

    if (!pricing) {
      throw new ConflictException('No print pricing configured');
    }

    const cost = job.pages * pricing.pricePerPage;

    const updatedJob = await this.prisma.printJob.update({
      where: { id },
      data: {
        status: PrintJobStatus.APPROVED,
        cost,
      },
    });

    const existingTransaction = await this.prisma.transaction.findFirst({
      where: {
        printJobId: id,
        type: TransactionType.PRINT,
      },
    });

    if (!existingTransaction) {
      await this.prisma.transaction.create({
        data: {
          type: TransactionType.PRINT,
          referenceId: id,
          printJobId: id,
          computerId: job.computerId,
          sessionId: job.sessionId ?? undefined,
          description: `Printing: ${job.pages} ${job.isColor ? 'Color' : 'B&W'} page(s)`,
          amount: cost,
          status: TransactionStatus.PENDING,
        },
      });
    }

    const spoolJobId = (job as any).spoolJobId as number | undefined;
    if (job.source === PrintJobSource.AGENT && spoolJobId && job.printerName) {
      await this.socketsGateway.sendCommandToComputer(job.computerId, 'PRINT_RELEASE', {
        printJobId: spoolJobId,
        printerName: job.printerName,
      });
    }

    return updatedJob;
  }

  async rejectJob(id: string) {
    const job = await this.prisma.printJob.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Print job not found');
    }
    if (job.status !== PrintJobStatus.PENDING) {
      throw new ConflictException('Only pending jobs can be rejected');
    }

    const updated = await this.prisma.printJob.update({
      where: { id },
      data: { status: PrintJobStatus.REJECTED },
    });

    const spoolJobId = (job as any).spoolJobId as number | undefined;
    if (job.source === PrintJobSource.AGENT && spoolJobId && job.printerName) {
      await this.socketsGateway.sendCommandToComputer(job.computerId, 'PRINT_CANCEL', {
        printJobId: spoolJobId,
        printerName: job.printerName,
      });
    }

    return updated;
  }

  async markPrinted(id: string) {
    const job = await this.prisma.printJob.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('Print job not found');
    }
    if (job.status !== PrintJobStatus.APPROVED) {
      throw new ConflictException('Only approved jobs can be marked as printed');
    }

    return this.prisma.printJob.update({
      where: { id },
      data: { status: PrintJobStatus.PRINTED },
    });
  }
}
