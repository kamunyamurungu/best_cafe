export type AiOutputFormat = 'TEXT' | 'DOCX' | 'PDF';

export class CreateAiTemplateDto {
  name: string;
  systemPrompt: string;
  userPromptSchema: Record<string, string>;
  outputFormat: AiOutputFormat;
  version?: number;
  isActive?: boolean;
}
