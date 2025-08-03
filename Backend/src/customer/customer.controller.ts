import { Controller, Get, Param, Post, Body, ValidationPipe, BadRequestException, UploadedFile, UseInterceptors, Patch, Delete } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { CustomerDTO } from './customer.DTO';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Customer } from './customer.entity';
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

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

    //Lab Task 3
    @Get()
    getAllCustomers(): Promise<Customer[]> {
        return this.customerService.getAllCustomers();
    }

    @Post("create")
     createCustomer(@Body() customer:CustomerDTO ): Promise<Customer> {
        return this.customerService.createCustomer(customer);
    }

   @Patch('update/:id')
   updateCustomer(@Param('id') id: string, @Body() customer: CustomerDTO): Promise<Customer> {
    return this.customerService.updateCustomer(id, customer);
   }
   
   @Get("nullName")
   getNullNameCustomers(): Promise<Customer[]> {
    return this.customerService.getNullNameCustomers();
   }
   
   @Delete('delete/:id')
   deleteCustomer(@Param('id') id: string): Promise<{message: string}> {
    return this.customerService.deleteCustomer(id);
   }

}