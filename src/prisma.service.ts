import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit {
  public prisma: PrismaClient;
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Create a PostgreSQL connection pool
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/best_cafe?schema=public';
    const pool = new Pool({ connectionString });

    // Create the PrismaPg adapter
    const adapter = new PrismaPg(pool);

    this.prisma = new PrismaClient({
      adapter,
    });
  }

  async onModuleInit() {
    try {
      await this.prisma.$connect();
      this.logger.log('Database connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      // Don't throw error to allow app to start without DB
    }
  }

  // Delegate methods to prisma
  get $connect() { return this.prisma.$connect.bind(this.prisma); }
  get $disconnect() { return this.prisma.$disconnect.bind(this.prisma); }
  get organization() { return this.prisma.organization; }
  get cyberCenter() { return this.prisma.cyberCenter; }
  get computer() { return this.prisma.computer; }
  get session() { return this.prisma.session; }
  get pricing() { return this.prisma.pricing; }
  get printPricing() { return this.prisma.printPricing; }
  get printJob() { return this.prisma.printJob; }
  get transaction() { return this.prisma.transaction; }
  get receipt() { return this.prisma.receipt; }
  get printer() { return this.prisma.printer; }
  get printerDevice() { return this.prisma.printerDevice; }
  get scanCopyMetric() { return this.prisma.scanCopyMetric; }
  get service() { return this.prisma.service; }
  get aiTemplate() { return this.prisma.aiTemplate; }
  get aiJob() { return this.prisma.aiJob; }
  get record() { return this.prisma.record; }
  get user() { return this.prisma.user; }
  get studentProfile() { return this.prisma.studentProfile; }
  get auditLog() { return this.prisma.auditLog; }
  get govService() { return this.prisma.govService; }
  get govServiceUsage() { return this.prisma.govServiceUsage; }
  get shortcut() { return this.prisma.shortcut; }
  get event() { return this.prisma.event; }
  get command() { return this.prisma.command; }
}