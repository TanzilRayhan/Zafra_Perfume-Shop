import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";


@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) { }

  @Get()
  getManager(): string {
    return this.managerService.getManager();
  }

  @Get('/:id')
  getManagerById(@Param('id', ParseIntPipe) id: number): string {
    return this.managerService.getManagerById(id);
  }


  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createManager(@Body() data: CreateManagerDto): string {
    return this.managerService.createManager(data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded or file rejected.' };
    }
    const fileUrl = `/uploads/${file.filename}`;
    return {
      message: 'File uploaded successfully',
      file,
      url: fileUrl
    };
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

}
