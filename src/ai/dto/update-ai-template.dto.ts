import { AiOutputFormat } from './create-ai-template.dto';

export class UpdateAiTemplateDto {
  id: string;
  name?: string;
  systemPrompt?: string;
  userPromptSchema?: Record<string, string>;
  outputFormat?: AiOutputFormat;
  htmlTemplatePath?: string;
  primaryColor?: string;
  version?: number;
  isActive?: boolean;
}
