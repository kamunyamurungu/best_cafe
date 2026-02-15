import { ShortcutType } from '../../generated/prisma';

export class UpdateShortcutDto {
  name?: string;
  type?: ShortcutType;
  target?: string;
  icon?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  isActive?: boolean;
}
