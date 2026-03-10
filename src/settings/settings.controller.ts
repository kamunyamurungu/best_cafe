import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';

type UpdateAiConfigDto = {
  provider?: string;
  apiKey?: string;
  model?: string;
};

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('ai')
  async getAiConfig() {
    const config = await this.settingsService.getAiConfig();
    return {
      provider: config.provider ?? 'GEMINI',
      model: config.model ?? null,
      hasApiKey: Boolean(config.apiKey && config.apiKey.length > 0),
    };
  }

  @Post('ai')
  async updateAiConfig(@Body() body: UpdateAiConfigDto) {
    const config = await this.settingsService.setAiConfig({
      provider: body.provider,
      apiKey: body.apiKey,
      model: body.model,
    });

    return {
      provider: config.provider ?? 'GEMINI',
      model: config.model ?? null,
      hasApiKey: Boolean(config.apiKey && config.apiKey.length > 0),
    };
  }
}
