export type ServiceCategory = 'COMPUTER' | 'PRINT' | 'SERVICE' | 'AI';
export type PricingModel = 'FLAT' | 'PER_PAGE' | 'PER_MINUTE';

export class CreateServiceDto {
  name: string;
  category: ServiceCategory;
  pricingModel: PricingModel;
  unitPrice: number;
  aiTemplateId?: string;
  isActive?: boolean;
}
