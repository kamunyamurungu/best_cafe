import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ShortcutsService } from './shortcuts.service';
import { CreateShortcutDto } from './dto/create-shortcut.dto';
import { UpdateShortcutDto } from './dto/update-shortcut.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../generated/prisma';

@Controller('shortcuts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShortcutsController {
  constructor(private readonly shortcutsService: ShortcutsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async list(@Req() req: { user: { role: UserRole } }) {
    return this.shortcutsService.listShortcuts(req.user.role);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() body: CreateShortcutDto) {
    return this.shortcutsService.createShortcut(body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() body: UpdateShortcutDto) {
    return this.shortcutsService.updateShortcut(id, body);
  }

  @Post(':id/use')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async useShortcut(
    @Param('id') id: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.shortcutsService.useShortcut(id, req.user.id);
  }
}
