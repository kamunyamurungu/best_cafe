import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ComputersService } from './computers.service';

@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get()
  async getAllComputers() {
    return this.computersService.getAllComputers();
  }

  @Get(':id')
  async getComputer(@Param('id') id: string) {
    return this.computersService.getComputerById(id);
  }

  @Patch(':id')
  async updateComputer(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.computersService.updateComputer(id, body.name);
  }

  @Get('token/:token')
  async getComputerByToken(@Param('token') token: string) {
    return this.computersService.getComputerByDeviceToken(token);
  }
}