import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAiTemplateDto } from './dto/create-ai-template.dto';
import { UpdateAiTemplateDto } from './dto/update-ai-template.dto';
import { CreateAiJobDto } from './dto/create-ai-job.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { TransactionStatus, TransactionType } from '../billing.enums';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async listServices(category?: string) {
    return this.prisma.service.findMany({
      where: category ? { category: category as any } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createService(data: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: data.name,
        category: data.category as any,
        pricingModel: data.pricingModel as any,
        unitPrice: data.unitPrice,
        aiTemplateId: data.aiTemplateId ?? null,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateService(id: string, data: UpdateServiceDto) {
    const existing = await this.prisma.service.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Service not found');
    return this.prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category as any,
        pricingModel: data.pricingModel as any,
        unitPrice: data.unitPrice,
        aiTemplateId: data.aiTemplateId === null ? null : data.aiTemplateId,
        isActive: data.isActive,
      },
    });
  }

  async listTemplates() {
    return this.prisma.aiTemplate.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createTemplate(data: CreateAiTemplateDto) {
    return this.prisma.aiTemplate.create({
      data: {
        name: data.name,
        systemPrompt: data.systemPrompt,
        userPromptSchema: data.userPromptSchema as any,
        outputFormat: data.outputFormat as any,
        version: data.version ?? 1,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateTemplate(id: string, data: UpdateAiTemplateDto) {
    const existing = await this.prisma.aiTemplate.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Template not found');
    return this.prisma.aiTemplate.update({
      where: { id },
      data: {
        name: data.name,
        systemPrompt: data.systemPrompt,
        userPromptSchema: data.userPromptSchema as any,
        outputFormat: data.outputFormat as any,
        version: data.version,
        isActive: data.isActive,
      },
    });
  }

  async listJobs() {
    return this.prisma.aiJob.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getJob(id: string) {
    const job = await this.prisma.aiJob.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('AI job not found');
    return job;
  }

  async createJob(data: CreateAiJobDto) {
    const service = await this.prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service || !service.isActive) {
      throw new NotFoundException('Service not found or inactive');
    }

    const templateId = data.templateId ?? service.aiTemplateId;
    if (!templateId) {
      throw new BadRequestException('Template is required for AI service');
    }

    const template = await this.prisma.aiTemplate.findUnique({ where: { id: templateId } });
    if (!template || !template.isActive) {
      throw new NotFoundException('Template not found or inactive');
    }

    this.validateInput(template.userPromptSchema as any, data.inputData);

    const job = await this.prisma.aiJob.create({
      data: {
        serviceId: service.id,
        templateId: template.id,
        inputData: data.inputData as any,
        status: 'PENDING' as any,
        createdById: data.createdById ?? null,
      },
    });

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.AI,
        referenceId: job.id,
        description: `AI Service: ${service.name}`,
        amount: service.unitPrice,
        status: TransactionStatus.PENDING,
      },
    });

    setImmediate(() => this.processJob(job.id));

    return job;
  }

  private validateInput(schema: Record<string, string>, input: Record<string, any>) {
    if (!schema || typeof schema !== 'object') return;
    for (const key of Object.keys(schema)) {
      const value = input?.[key];
      if (value === undefined || value === null || `${value}`.trim().length === 0) {
        throw new BadRequestException(`Missing required field: ${key}`);
      }
    }
  }

  private async processJob(jobId: string) {
    const job = await this.prisma.aiJob.findUnique({ where: { id: jobId } });
    if (!job) return;

    await this.prisma.aiJob.update({
      where: { id: jobId },
      data: { status: 'PROCESSING' as any },
    });

    try {
      const template = await this.prisma.aiTemplate.findUnique({ where: { id: job.templateId } });
      if (!template) throw new Error('Template missing');

      const outputText = this.renderOutput(template.systemPrompt, job.inputData as any);
      const filePath = await this.writeOutputFile(template.name, job.id, outputText, template.outputFormat as any);

      const transaction = await this.prisma.transaction.findFirst({
        where: { referenceId: job.id, type: TransactionType.AI },
      });
      if (!transaction) {
        throw new Error('Linked transaction not found');
      }

      const record = await this.prisma.record.create({
        data: {
          type: 'AI_DOCUMENT' as any,
          title: template.name,
          filePath,
          linkedTransactionId: transaction.id,
          createdById: job.createdById ?? null,
        },
      });

      await this.prisma.aiJob.update({
        where: { id: jobId },
        data: {
          status: 'DONE' as any,
          outputText,
          outputFilePath: filePath,
          recordId: record.id,
        },
      });
    } catch (error) {
      await this.prisma.aiJob.update({
        where: { id: jobId },
        data: {
          status: 'FAILED' as any,
          error: (error as Error).message,
        },
      });
    }
  }

  private renderOutput(systemPrompt: string, inputData: Record<string, any>) {
    const lines = [systemPrompt.trim(), '', 'INPUT DATA:', JSON.stringify(inputData, null, 2)];
    return lines.join('\n');
  }

  private async writeOutputFile(templateName: string, jobId: string, content: string, format: string) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const dirRoot = process.env.AI_RECORDS_DIR || path.join(process.cwd(), 'data', 'records', 'ai');
    const dirPath = path.join(dirRoot, year, month);
    await fs.mkdir(dirPath, { recursive: true });

    const safeName = templateName.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    const ext = format === 'PDF' ? 'pdf' : format === 'DOCX' ? 'docx' : 'txt';
    const fileName = `${safeName}_${jobId}.${ext}`;
    const fullPath = path.join(dirPath, fileName);

    await fs.writeFile(fullPath, content, 'utf8');
    return fullPath;
  }
}
