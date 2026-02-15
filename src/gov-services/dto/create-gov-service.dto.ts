import { GovPricingModel } from '../../generated/prisma';

export class CreateGovServiceDto {
  name: string;
  category: string;
  officialUrl: string;
  description?: string;
  pricingModel: GovPricingModel;
  unitPrice?: number;
  icon?: string;
  isActive?: boolean;
}
