import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { GovServicesService } from './gov-services.service';
import { CreateGovServiceDto } from './dto/create-gov-service.dto';
import { UpdateGovServiceDto } from './dto/update-gov-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../generated/prisma';

@Controller('gov-services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GovServicesController {
  constructor(private readonly govServicesService: GovServicesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() body: CreateGovServiceDto) {
    return this.govServicesService.createService(body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() body: UpdateGovServiceDto) {
    return this.govServicesService.updateService(id, body);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async list(@Req() req: { user: { role: UserRole } }) {
    return this.govServicesService.listServices(req.user.role);
  }

  @Post(':id/start')
  @Roles(UserRole.STAFF)
  async startUsage(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.govServicesService.startUsage(id, req.user.id);
  }

  @Post(':usageId/end')
  @Roles(UserRole.STAFF)
  async endUsage(
    @Param('usageId') usageId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.govServicesService.endUsage(usageId, req.user.id);
  }

  @Get('active')
  @Roles(UserRole.STAFF)
  async activeUsage(@Req() req: { user: { id: string } }) {
    return this.govServicesService.getActiveUsage(req.user.id);
  }
}
