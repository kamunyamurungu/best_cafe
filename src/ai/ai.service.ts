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
import Handlebars from 'handlebars';
import { chromium } from 'playwright';
import { PDFDocument as PdfLibDocument } from 'pdf-lib';

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
        htmlTemplatePath: data.htmlTemplatePath ?? null,
        primaryColor: data.primaryColor ?? null,
        version: data.version ?? 1,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateTemplate(id: string, data: UpdateAiTemplateDto) {
    const existing = await this.prisma.aiTemplate.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Template not found');
    const htmlTemplatePath =
      data.htmlTemplatePath === undefined
        ? undefined
        : data.htmlTemplatePath?.trim().length
        ? data.htmlTemplatePath.trim()
        : null;
    const primaryColor =
      data.primaryColor === undefined
        ? undefined
        : data.primaryColor?.trim().length
        ? data.primaryColor.trim()
        : null;
    return this.prisma.aiTemplate.update({
      where: { id },
      data: {
        name: data.name,
        systemPrompt: data.systemPrompt,
        userPromptSchema: data.userPromptSchema as any,
        outputFormat: data.outputFormat as any,
        htmlTemplatePath,
        primaryColor,
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

  async previewTemplatePdf(
    templateId: string,
    inputData: Record<string, any>,
    outputText?: string,
  ) {
    const template = await this.prisma.aiTemplate.findUnique({ where: { id: templateId } });
    if (!template || !template.isActive) {
      throw new NotFoundException('Template not found or inactive');
    }

    this.validateInput(template.userPromptSchema as any, inputData);

    let finalText = outputText?.trim() ?? '';
    if (finalText.length === 0) {
      const prompt = this.buildPrompt(template.systemPrompt, inputData);
      finalText = await this.generateText(prompt);
    }

    const filePath = await this.writePreviewPdfFile(template, finalText, inputData);
    return { filePath };
  }

  async uploadHtmlTemplate(templateId: string, file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('HTML file is required');
    }

    const template = await this.prisma.aiTemplate.findUnique({ where: { id: templateId } });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const fileName = this.sanitizeHtmlFileName(file.originalname || 'template.html');
    const baseDir = this.resolveTemplatesBaseDir();
    const fullPath = path.join(baseDir, fileName);
    await fs.mkdir(baseDir, { recursive: true });
    await fs.writeFile(fullPath, file.buffer);

    const updated = await this.prisma.aiTemplate.update({
      where: { id: templateId },
      data: { htmlTemplatePath: fileName },
    });

    return { htmlTemplatePath: updated.htmlTemplatePath, fileName, fullPath };
  }

  async saveHtmlTemplate(templateId: string, html: string, fileName?: string) {
    const template = await this.prisma.aiTemplate.findUnique({ where: { id: templateId } });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const content = `${html ?? ''}`.trim();
    if (content.length === 0) {
      throw new BadRequestException('HTML content is required');
    }

    const baseName = fileName?.trim().length
      ? fileName.trim()
      : `${template.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.html`;
    const safeName = this.sanitizeHtmlFileName(baseName);
    const baseDir = this.resolveTemplatesBaseDir();
    const fullPath = path.join(baseDir, safeName);
    await fs.mkdir(baseDir, { recursive: true });
    await fs.writeFile(fullPath, content, 'utf8');

    const updated = await this.prisma.aiTemplate.update({
      where: { id: templateId },
      data: { htmlTemplatePath: safeName },
    });

    return { htmlTemplatePath: updated.htmlTemplatePath, fileName: safeName, fullPath };
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
        await this.finalizeJob(
          job.id,
          template,
          data.previewText,
          outputFormat,
          job.createdById ?? null,
          data.inputData,
        );
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
        job.inputData as any,
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
    template: { name: string; htmlTemplatePath?: string | null; primaryColor?: string | null },
    outputText: string,
    format: string,
    createdById: string | null,
    inputData: Record<string, any>,
  ) {
    const filePath = await this.writeOutputFile(
      template,
      jobId,
      outputText,
      format,
      inputData,
    );

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

  private async writeOutputFile(
    template: { name: string; htmlTemplatePath?: string | null; primaryColor?: string | null },
    jobId: string,
    content: string,
    format: string,
    inputData: Record<string, any>,
  ) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const dirRoot = process.env.AI_RECORDS_DIR || path.join(process.cwd(), 'data', 'records', 'ai');
    const dirPath = path.join(dirRoot, year, month);
    await fs.mkdir(dirPath, { recursive: true });

    const safeName = template.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    const normalized = `${format || 'TEXT'}`.toUpperCase();
    const ext = normalized === 'PDF' ? 'pdf' : normalized === 'DOCX' ? 'docx' : 'txt';
    const fileName = `${safeName}_${jobId}.${ext}`;
    const fullPath = path.join(dirPath, fileName);

    if (normalized === 'PDF') {
      if (template.htmlTemplatePath && template.htmlTemplatePath.trim().length > 0) {
        await this.writeHtmlPdfFile(fullPath, template, content, inputData);
      } else {
        await this.writePdfFile(fullPath, content);
      }
    } else if (normalized === 'DOCX') {
      await this.writeDocxFile(fullPath, content);
    } else {
      await fs.writeFile(fullPath, content, 'utf8');
    }
    return fullPath;
  }

  private async writePreviewPdfFile(
    template: { name: string; htmlTemplatePath?: string | null; primaryColor?: string | null },
    content: string,
    inputData: Record<string, any>,
  ) {
    const dirRoot = process.env.AI_RECORDS_DIR || path.join(process.cwd(), 'data', 'records', 'ai');
    const dirPath = path.join(dirRoot, 'previews');
    await fs.mkdir(dirPath, { recursive: true });

    const safeName = template.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    const fileName = `${safeName}_preview_${Date.now()}.pdf`;
    const fullPath = path.join(dirPath, fileName);

    if (template.htmlTemplatePath && template.htmlTemplatePath.trim().length > 0) {
      await this.writeHtmlPdfFile(fullPath, template, content, inputData);
    } else {
      await this.writePdfFile(fullPath, content);
    }

    return fullPath;
  }

  private async writeHtmlPdfFile(
    filePath: string,
    template: { htmlTemplatePath?: string | null; primaryColor?: string | null },
    outputText: string,
    inputData: Record<string, any>,
  ) {
    const htmlPath = this.resolveTemplatePath(template.htmlTemplatePath ?? '');
    const rawTemplate = await fs.readFile(htmlPath, 'utf8');
    const primaryColor = this.resolvePrimaryColor(template.primaryColor);
    const html = this.renderHtml(rawTemplate, {
      input: inputData,
      outputText,
      primaryColor,
      generatedAt: new Date().toISOString(),
    }, primaryColor);

    const maxPages = this.resolveMaxPdfPages();
    const initialBuffer = await this.renderPdfBufferFromHtml(html, false);
    const initialPages = await this.countPdfPages(initialBuffer);
    if (initialPages > maxPages) {
      throw new BadRequestException(`PDF exceeds max pages (${maxPages})`);
    }

    let finalBuffer = initialBuffer;
    if (initialPages > 1) {
      finalBuffer = await this.renderPdfBufferFromHtml(html, true);
      const finalPages = await this.countPdfPages(finalBuffer);
      if (finalPages > maxPages) {
        throw new BadRequestException(`PDF exceeds max pages (${maxPages})`);
      }
    }

    await fs.writeFile(filePath, finalBuffer);
  }

  private renderHtml(
    rawTemplate: string,
    data: Record<string, any>,
    primaryColor: string,
  ) {
    this.ensureHandlebarsHelpers();
    const compiled = Handlebars.compile(rawTemplate, { noEscape: true });
    const input = (data.input && typeof data.input === 'object') ? data.input : {};
    const context = { ...data, ...input };
    const body = compiled(context);
    const styleBlock = this.buildHtmlStyle(primaryColor);

    if (/<html[\s>]/i.test(body)) {
      if (/<\/head>/i.test(body)) {
        return body.replace(/<\/head>/i, `${styleBlock}</head>`);
      }
      return `${styleBlock}${body}`;
    }

    return [
      '<!doctype html>',
      '<html>',
      '<head>',
      '<meta charset="utf-8" />',
      styleBlock,
      '</head>',
      '<body>',
      body,
      '</body>',
      '</html>',
    ].join('');
  }

  private buildHtmlStyle(primaryColor: string) {
    return [
      '<style>',
      ':root {',
      `  --primary-color: ${primaryColor};`,
      '}',
      '@page {',
      '  size: A4;',
      '  margin: 20mm;',
      '}',
      'body {',
      '  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;',
      '  color: #111;',
      '  font-size: 12pt;',
      '  line-height: 1.45;',
      '}',
      '.primary {',
      '  color: var(--primary-color);',
      '}',
      '</style>',
    ].join('');
  }

  private ensureHandlebarsHelpers() {
    if ((Handlebars as any).__bestCafeHelpersReady) return;
    Handlebars.registerHelper('nl2br', (text: string) => {
      const safeText = `${text ?? ''}`.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return new Handlebars.SafeString(safeText.replace(/\n/g, '<br/>'));
    });
    (Handlebars as any).__bestCafeHelpersReady = true;
  }

  private resolveTemplatePath(relativePath: string) {
    const trimmed = relativePath.trim();
    if (trimmed.length === 0) {
      throw new BadRequestException('HTML template path is required for PDF output');
    }

    const resolvedBase = this.resolveTemplatesBaseDir();
    const resolvedPath = path.resolve(resolvedBase, trimmed);
    if (!resolvedPath.startsWith(resolvedBase + path.sep)) {
      throw new BadRequestException('Invalid HTML template path');
    }
    return resolvedPath;
  }

  private resolveTemplatesBaseDir() {
    const baseDir = process.env.AI_TEMPLATES_DIR || path.join(process.cwd(), 'data', 'templates', 'ai');
    return path.resolve(baseDir);
  }

  private sanitizeHtmlFileName(originalName: string) {
    const name = originalName.trim().toLowerCase();
    const safeBase = name.replace(/[^a-z0-9._-]+/g, '_');
    const normalized = safeBase.endsWith('.html') ? safeBase : `${safeBase}.html`;
    if (!normalized.endsWith('.html')) {
      throw new BadRequestException('Only .html files are allowed');
    }
    return normalized;
  }

  private resolvePrimaryColor(primaryColor?: string | null) {
    const fallback = '#1f5eff';
    const fromTemplate = primaryColor?.trim();
    if (fromTemplate && fromTemplate.length > 0) {
      return fromTemplate;
    }
    const fromEnv = (process.env.AI_TEMPLATE_PRIMARY_COLOR ?? '').trim();
    return fromEnv.length > 0 ? fromEnv : fallback;
  }

  private resolveMaxPdfPages() {
    const raw = (process.env.AI_PDF_MAX_PAGES ?? '2').trim();
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed <= 0) return 2;
    return Math.floor(parsed);
  }

  private async renderPdfBufferFromHtml(html: string, showPageNumbers: boolean) {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle' });
      await page.emulateMedia({ media: 'screen' });

      const footerTemplate = [
        '<div style="width:100%;font-size:10px;color:#666;padding:0 20mm 6mm 20mm;">',
        '<div style="text-align:right;">',
        '<span class="pageNumber"></span>/<span class="totalPages"></span>',
        '</div>',
        '</div>',
      ].join('');

      const buffer = await page.pdf({
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        printBackground: true,
        displayHeaderFooter: showPageNumbers,
        headerTemplate: '<div></div>',
        footerTemplate: showPageNumbers ? footerTemplate : '<div></div>',
        preferCSSPageSize: true,
      });

      await page.close();
      return buffer;
    } finally {
      await browser.close();
    }
  }

  private async countPdfPages(buffer: Buffer) {
    const pdfDoc = await PdfLibDocument.load(buffer);
    return pdfDoc.getPageCount();
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
