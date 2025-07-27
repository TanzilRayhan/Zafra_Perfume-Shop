import {Controller, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Body, BadRequestException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './admin.dto';
import { AdminService } from './admin.service';
import { MulterError } from 'multer';

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
}
