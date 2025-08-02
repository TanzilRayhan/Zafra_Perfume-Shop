import {Body,Controller,Get,Param,ParseIntPipe,Post,Delete,Query,UsePipes,ValidationPipe,UseInterceptors,UploadedFile,Res, NotFoundException,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './manager.dto';
import { CreatManagerDto } from './manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  getManager(): string {
    return this.managerService.getManager();
  }

  @Get('/id/:id')
  getManagerById(@Param('id', ParseIntPipe) id: number): string {
    return this.managerService.getManagerById(id);
  }

  @Post('add')
  @UsePipes(new ValidationPipe())
  async createManager(@Body() data: CreatManagerDto) {
    return await this.managerService.createManager(data);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
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
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded or the file rejected.' };
    }
    const fileUrl = `/uploads/${file.filename}`;
    return {
      message: 'File uploaded successfully',
      file,
      url: fileUrl,
    };
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' });
  }

  @Get('/search/fullname')
  async getByFullName(@Query('q') q: string) {
    const manager= await this.managerService.findByFullNameSubstring(q);
     if (!manager) {
    throw new NotFoundException('Manager not found');
  }

  return manager;
  }

 
@Get('/search/managername')
async getByManagerName(@Query('managername') managername: string) {
  const manager = await this.managerService.findByManagerName(managername);

  if (!manager) {
    throw new NotFoundException('Manager not found');
  }

  return manager;
}


  @Delete('/remove/:managername')
  async removeByManagerName(@Param('managername') managername: string) {
    const manager = await this.managerService.removeByManagerName(managername);
     if (!manager) {
    throw new NotFoundException('Manager not found');
  }

  return manager;
  }
}
