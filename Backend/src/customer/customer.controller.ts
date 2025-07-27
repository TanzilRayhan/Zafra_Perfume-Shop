import { Controller, Get, Param, Post, Body, ValidationPipe, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { CustomerDTO } from './customer.DTO';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    getCustomer(): string {
        return this.customerService.getCustomer();
    }
    @Get(':id')
    getCustomerById(@Param('id') id: string): string {
        return this.customerService.getCustomerById(id);
    }

    @Get('photo/:id')
    getPhoto(@Param('id') photoId: string): string {
        return this.customerService.getPhotoService(photoId);
    }

    @Post('pic')
    createPhoto(): string {
        return this.customerService.createPhoto();
    }

    //Lab Task 2
    @Post("create")
    createCustomer(@Body(new ValidationPipe()) customer: CustomerDTO): string {
        return this.customerService.createCustomer(customer);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, cb) => {

                const ext = path.extname(file.originalname).toLowerCase();
                const isPdf = ext === '.pdf' && file.mimetype === 'application/pdf';

                if (isPdf) cb(null, true);
                else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only PDF files are allowed'), false);
            },
            limits: { fileSize: 5 * 1024 * 1024 },
            storage: diskStorage({
                destination: './src/customer/uploads',
                filename: (req, file, cb) => {
                    const filename = Date.now() + '-' + file.originalname;
                    cb(null, filename);
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File must be a PDF');
        }
        console.log(file);
    }


}