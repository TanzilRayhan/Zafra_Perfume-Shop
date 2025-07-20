import { Controller, Get, Param } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  getManager(): string {
    return this.managerService.getManager();
  }

  @Get('/:id')
  getManagerById(@Param('id') id: string): string {
    return this.managerService.getManagerById(id);
  }
}
