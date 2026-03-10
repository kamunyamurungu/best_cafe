import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export type AiConfig = {
  provider?: string;
  apiKey?: string;
  model?: string;
};

@Injectable()
export class SettingsService {
  private readonly aiProviderKey = 'ai_provider';
  private readonly aiApiKey = 'ai_api_key';
  private readonly aiModelKey = 'ai_model';

  constructor(private prisma: PrismaService) {}

  async getSetting(key: string) {
    const setting = await this.prisma.appSetting.findUnique({ where: { key } });
    return setting?.value ?? null;
  }

  async setSetting(key: string, value: string) {
    return this.prisma.appSetting.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  async getAiConfig(): Promise<AiConfig> {
    const [provider, apiKey] = await Promise.all([
      this.getSetting(this.aiProviderKey),
      this.getSetting(this.aiApiKey),
    ]);
    const model = await this.getSetting(this.aiModelKey);

    return {
      provider: provider ?? undefined,
      apiKey: apiKey ?? undefined,
      model: model ?? undefined,
    };
  }

  async setAiConfig(config: AiConfig) {
    const updates: Promise<unknown>[] = [];
    if (config.provider && config.provider.trim().length > 0) {
      updates.push(this.setSetting(this.aiProviderKey, config.provider.trim()));
    }
    if (config.apiKey && config.apiKey.trim().length > 0) {
      updates.push(this.setSetting(this.aiApiKey, config.apiKey.trim()));
    }
    if (config.model && config.model.trim().length > 0) {
      updates.push(this.setSetting(this.aiModelKey, config.model.trim()));
    }

    if (updates.length > 0) {
      await Promise.all(updates);
    }

    return this.getAiConfig();
  }
}
