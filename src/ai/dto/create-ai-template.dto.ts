export type AiOutputFormat = 'TEXT' | 'DOCX' | 'PDF';

export class CreateAiTemplateDto {
  name: string;
  systemPrompt: string;
  userPromptSchema: Record<string, string>;
  outputFormat: AiOutputFormat;
  htmlTemplatePath?: string;
  primaryColor?: string;
  version?: number;
  isActive?: boolean;
}
