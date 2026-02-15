import { PricingModel, ServiceCategory } from './create-service.dto';

export class UpdateServiceDto {
  id: string;
  name?: string;
  category?: ServiceCategory;
  pricingModel?: PricingModel;
  unitPrice?: number;
  aiTemplateId?: string | null;
  isActive?: boolean;
}
