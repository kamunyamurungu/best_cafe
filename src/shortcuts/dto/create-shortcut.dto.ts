import { ShortcutType } from '../../generated/prisma';

export class CreateShortcutDto {
  name: string;
  type: ShortcutType;
  target: string;
  icon?: string;
  imageUrl?: string;
  price?: number;
  isActive?: boolean;
}
