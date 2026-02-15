import { GovPricingModel } from '../../generated/prisma';

export class UpdateGovServiceDto {
  name?: string;
  category?: string;
  officialUrl?: string;
  description?: string | null;
  pricingModel?: GovPricingModel;
  unitPrice?: number | null;
  icon?: string | null;
  isActive?: boolean;
}
