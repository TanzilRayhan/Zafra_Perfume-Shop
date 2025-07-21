import { Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('photo/:id')
  getPhoto(@Param('id') photoId: string): string {
    return this.managerService.getPhotoService(photoId);
  }

  @Post('pic')
  createPhoto(): string {
    return this.managerService.createPhoto();
  }
}
