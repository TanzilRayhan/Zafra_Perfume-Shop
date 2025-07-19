import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('photo')
  // getPhoto(): string {
  //   return this.appService.getPhotoService();
  // }

  @Get('photo/:id')
  getPhoto(@Param('id') photoId: number): string {
    return this.appService.getPhotoService(photoId);
  }

  @Post('pic')
  createPhoto(): string {
    return this.appService.createPhoto();
  }
}
