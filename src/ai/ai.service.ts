import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAiTemplateDto } from './dto/create-ai-template.dto';
import { UpdateAiTemplateDto } from './dto/update-ai-template.dto';
import { CreateAiJobDto } from './dto/create-ai-job.dto';
import { CreateAiPreviewDto } from './dto/create-ai-preview.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { TransactionStatus, TransactionType } from '../billing.enums';
import { SettingsService } from '../settings/settings.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph } from 'docx';

@Injectable()
export class AiService {
  constructor(
    private prisma: PrismaService,
    private settingsService: SettingsService,
  ) {}

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

  async testConnection() {
    const outputText = await this.generateText(
      'Reply with a single word: OK',
    );
    return { ok: true, outputText };
  }

  async listModels() {
    const config = await this.getAiConfig();
    const provider = (config.provider || 'GEMINI').toUpperCase();
    if (provider !== 'GEMINI') {
      throw new Error(`Unsupported AI provider: ${provider}`);
    }
    if (!config.apiKey) {
      throw new Error('AI API key not configured');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${config.apiKey}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini error: ${response.status} ${errorText}`);
    }

    const payload = await response.json();
    const models = Array.isArray(payload?.models) ? payload.models : [];
    const supported = models
      .filter((model: { supportedGenerationMethods?: string[] }) =>
        (model.supportedGenerationMethods || []).includes('generateContent'),
      )
      .map((model: { name?: string }) => (model.name || '').replace('models/', ''))
      .filter((name: string) => name.length > 0);

    return { provider: 'GEMINI', models: supported };
  }

  async previewJob(data: CreateAiPreviewDto) {
    const template = await this.prisma.aiTemplate.findUnique({ where: { id: data.templateId } });
    if (!template || !template.isActive) {
      throw new NotFoundException('Template not found or inactive');
    }

    this.validateInput(template.userPromptSchema as any, data.inputData);

    const prompt = this.buildPrompt(template.systemPrompt, data.inputData as any);
    const outputText = await this.generateText(prompt);

    return { outputText };
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

    if (data.previewText && data.previewText.trim().length > 0) {
      try {
        await this.prisma.aiJob.update({
          where: { id: job.id },
          data: { status: 'PROCESSING' as any },
        });

        const outputFormat = (data.outputFormat ?? template.outputFormat) as any;
        await this.finalizeJob(job.id, template, data.previewText, outputFormat, job.createdById ?? null);
      } catch (error) {
        await this.prisma.aiJob.update({
          where: { id: job.id },
          data: {
            status: 'FAILED' as any,
            error: (error as Error).message,
          },
        });
      }
      return this.getJob(job.id);
    }

    setImmediate(() => this.processJob(job.id, data.outputFormat));

    return job;
  }

  private validateInput(schema: Record<string, string>, input: Record<string, any>) {
    if (!schema || typeof schema !== 'object') return;
    for (const key of Object.keys(schema)) {
      const type = `${schema[key] ?? ''}`.trim();
      const isOptional = type.endsWith('?');
      const value = input?.[key];
      if (isOptional) {
        continue;
      }
      if (value === undefined || value === null || `${value}`.trim().length === 0) {
        throw new BadRequestException(`Missing required field: ${key}`);
      }
    }
  }

  private async processJob(jobId: string, outputFormat?: string) {
    const job = await this.prisma.aiJob.findUnique({ where: { id: jobId } });
    if (!job) return;

    await this.prisma.aiJob.update({
      where: { id: jobId },
      data: { status: 'PROCESSING' as any },
    });

    try {
      const template = await this.prisma.aiTemplate.findUnique({ where: { id: job.templateId } });
      if (!template) throw new Error('Template missing');

      const prompt = this.buildPrompt(template.systemPrompt, job.inputData as any);
      const outputText = await this.generateText(prompt);
      const finalFormat = (outputFormat ?? template.outputFormat) as any;
      await this.finalizeJob(
        jobId,
        template,
        outputText,
        finalFormat,
        job.createdById ?? null,
      );
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

  private buildPrompt(systemPrompt: string, inputData: Record<string, any>) {
    const header = systemPrompt.trim();
    const fields = Object.entries(inputData || {})
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');
    return [header, '', 'USER INPUT:', fields || '- (no input)', '', 'OUTPUT:'].join('\n');
  }

  private async getAiConfig() {
    try {
      const stored = await this.settingsService.getAiConfig();
      return {
        provider: stored.provider ?? process.env.AI_PROVIDER ?? 'GEMINI',
        apiKey: stored.apiKey ?? process.env.AI_API_KEY ?? process.env.GEMINI_API_KEY ?? '',
        model: stored.model ?? process.env.GEMINI_MODEL ?? 'gemini-1.5-flash-latest',
      };
    } catch (_) {
      return {
        provider: process.env.AI_PROVIDER ?? 'GEMINI',
        apiKey: process.env.AI_API_KEY ?? process.env.GEMINI_API_KEY ?? '',
        model: process.env.GEMINI_MODEL ?? 'gemini-1.5-flash-latest',
      };
    }
  }

  private async generateText(prompt: string) {
    const config = await this.getAiConfig();
    const provider = (config.provider || 'GEMINI').toUpperCase();
    if (provider === 'GEMINI') {
      return this.generateWithGemini(prompt, config.apiKey || '');
    }
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  private async generateWithGemini(prompt: string, apiKey: string) {
    if (!apiKey) {
      throw new Error('AI API key not configured');
    }
    const config = await this.getAiConfig();
    const model = this.normalizeGeminiModel(config.model);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini error: ${response.status} ${errorText}`);
    }

    const payload = await response.json();
    const parts = payload?.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part: { text?: string }) => part.text)
      .filter(Boolean)
      .join('');

    if (!text) {
      throw new Error('Gemini returned empty response');
    }

    return text;
  }

  private normalizeGeminiModel(model?: string) {
    const fallback = 'gemini-1.5-flash-latest';
    if (!model || model.trim().length === 0) {
      return fallback;
    }

    let normalized = model.trim().toLowerCase();
    if (normalized.startsWith('models/')) {
      normalized = normalized.slice('models/'.length);
    }
    normalized = normalized.replace(/\s+/g, '-');

    if (normalized.includes('/')) {
      throw new Error('Invalid model name. Use a simple name like gemini-1.5-flash-latest.');
    }

    if (!/^[a-z0-9][a-z0-9.-]+$/.test(normalized)) {
      throw new Error('Invalid model name format.');
    }

    return normalized || fallback;
  }

  private async finalizeJob(
    jobId: string,
    template: { name: string },
    outputText: string,
    format: string,
    createdById: string | null,
  ) {
    const filePath = await this.writeOutputFile(template.name, jobId, outputText, format);

    const transaction = await this.prisma.transaction.findFirst({
      where: { referenceId: jobId, type: TransactionType.AI },
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
        createdById,
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
  }

  private async writeOutputFile(templateName: string, jobId: string, content: string, format: string) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const dirRoot = process.env.AI_RECORDS_DIR || path.join(process.cwd(), 'data', 'records', 'ai');
    const dirPath = path.join(dirRoot, year, month);
    await fs.mkdir(dirPath, { recursive: true });

    const safeName = templateName.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    const normalized = `${format || 'TEXT'}`.toUpperCase();
    const ext = normalized === 'PDF' ? 'pdf' : normalized === 'DOCX' ? 'docx' : 'txt';
    const fileName = `${safeName}_${jobId}.${ext}`;
    const fullPath = path.join(dirPath, fileName);

    if (normalized === 'PDF') {
      await this.writePdfFile(fullPath, content);
    } else if (normalized === 'DOCX') {
      await this.writeDocxFile(fullPath, content);
    } else {
      await fs.writeFile(fullPath, content, 'utf8');
    }
    return fullPath;
  }

  private async writePdfFile(filePath: string, content: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk as Buffer));

    const done = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });

    doc.fontSize(12).text(content, { lineGap: 4 });
    doc.end();

    const pdfBuffer = await done;
    await fs.writeFile(filePath, pdfBuffer);
  }

  private async writeDocxFile(filePath: string, content: string) {
    const paragraphs = content
      .split('\n')
      .map((line) => new Paragraph(line.length > 0 ? line : ' '));
    const doc = new Document({
      sections: [{ children: paragraphs }],
    });
    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(filePath, buffer);
  }
}
