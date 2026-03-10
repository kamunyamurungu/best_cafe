export class CreateAiJobDto {
  serviceId: string;
  templateId?: string;
  inputData: Record<string, any>;
  createdById?: string;
  outputFormat?: 'TEXT' | 'DOCX' | 'PDF';
  previewText?: string;
}
