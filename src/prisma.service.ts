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
  get user() { return this.prisma.user; }
  get event() { return this.prisma.event; }
  get command() { return this.prisma.command; }
}