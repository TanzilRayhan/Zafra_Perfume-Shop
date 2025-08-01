import {Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Body, BadRequestException, Get, Param, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './admin.dto';
import { AdminService } from './admin.service';
import { MulterError } from 'multer';
import { join } from 'path';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('nidImage', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          cb(null, true);
        } else {
          cb(
            new MulterError('LIMIT_UNEXPECTED_FILE', 'nidImage'),
            false,
          );
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async createAdmin(
    @UploadedFile() nidImage: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    if (!nidImage) {
      throw new BadRequestException('NID image is required and must be ≤ 2MB');
    }

    return this.adminService.createAdmin({
      ...body,
      nidImage,
    });
  }
  @Get("getImage/:name")
  getImage(@Param('name') name: string,
  @Res() res: Response) {
    res.sendFile(name, {
      root: join(__dirname, '../../uploads'),
    });
  }
}
