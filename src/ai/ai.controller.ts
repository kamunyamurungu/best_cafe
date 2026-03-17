import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { CreateAiTemplateDto } from './dto/create-ai-template.dto';
import { UpdateAiTemplateDto } from './dto/update-ai-template.dto';
import { CreateAiJobDto } from './dto/create-ai-job.dto';
import { CreateAiPreviewDto } from './dto/create-ai-preview.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('services')
  async listServices(@Query('category') category?: string) {
    return this.aiService.listServices(category);
  }

  @Post('services')
  async createService(@Body() body: CreateServiceDto) {
    return this.aiService.createService(body);
  }

  @Patch('services/:id')
  async updateService(@Param('id') id: string, @Body() body: UpdateServiceDto) {
    return this.aiService.updateService(id, { ...body, id });
  }

  @Get('templates')
  async listTemplates() {
    return this.aiService.listTemplates();
  }

  @Post('templates')
  async createTemplate(@Body() body: CreateAiTemplateDto) {
    return this.aiService.createTemplate(body);
  }

  @Patch('templates/:id')
  async updateTemplate(@Param('id') id: string, @Body() body: UpdateAiTemplateDto) {
    return this.aiService.updateTemplate(id, { ...body, id });
  }

  @Get('jobs')
  async listJobs() {
    return this.aiService.listJobs();
  }

  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    return this.aiService.getJob(id);
  }

  @Post('jobs')
  async createJob(@Body() body: CreateAiJobDto) {
    return this.aiService.createJob(body);
  }

  @Post('preview')
  async preview(@Body() body: CreateAiPreviewDto) {
    return this.aiService.previewJob(body);
  }

  @Post('templates/:id/preview-pdf')
  async previewTemplatePdf(
    @Param('id') id: string,
    @Body() body: { inputData: Record<string, any>; outputText?: string },
  ) {
    return this.aiService.previewTemplatePdf(id, body.inputData, body.outputText);
  }

  @Post('templates/:id/upload-html')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTemplateHtml(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.aiService.uploadHtmlTemplate(id, file);
  }

  @Post('templates/:id/save-html')
  async saveTemplateHtml(
    @Param('id') id: string,
    @Body() body: { fileName?: string; html: string },
  ) {
    return this.aiService.saveHtmlTemplate(id, body.html, body.fileName);
  }

  @Post('test')
  async testConnection() {
    return this.aiService.testConnection();
  }

  @Get('models')
  async listModels() {
    return this.aiService.listModels();
  }
}
