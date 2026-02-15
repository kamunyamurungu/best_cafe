import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiTemplateDto } from './dto/create-ai-template.dto';
import { UpdateAiTemplateDto } from './dto/update-ai-template.dto';
import { CreateAiJobDto } from './dto/create-ai-job.dto';
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
}
