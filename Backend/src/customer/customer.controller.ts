import { Controller, Get, Param, Post, Body, ValidationPipe, BadRequestException, UploadedFile, UseInterceptors, Patch, Delete, Query } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { CustomerDTO } from './dto/customer.DTO';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Customer } from './customer.entity';
import { Cart } from 'src/cart/cart.entity';
import { CartDto } from 'src/cart/dto/cart.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post('create')
    async createCustomer(@Body() customer: CustomerDTO): Promise<Customer> {
        return this.customerService.createCustomer(customer);
    }

    @Post('update-customer')
    async updateCustomer(@Body() data: { customerID: string, fullName?: string, phone?: number, email?: string, address?: string }): Promise<Customer> {
        return this.customerService.updateCustomer(data.customerID, {
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            address: data.address
        });
    }
    @Post('get-customer')
    async getCustomer(@Body() data: {customerId: string}): Promise<Customer> {
        return this.customerService.getCustomer(data.customerId);
    }
    @Post('add-to-cart')
    async addToCart(@Body() cart: CartDto): Promise<Cart> {
        return this.customerService.addToCart(cart);
    }
   
    @Post('get-all-carts')
    async getAllcartsByCustomerId(@Body() data: {customerId: string}): Promise<any> {
        console.log("customerId", data.customerId);
        return this.customerService.getAllcartsByCustomerId(data.customerId);
    }

    @Post('create-order')
    async createOrder(@Body() data: {customerId: string, cartId: string}): Promise<any> {
        console.log("customerId", data.customerId); 
        console.log("cartId", data.cartId); 
        return this.customerService.createOrder(data.customerId, data.cartId);
    }
   @Post('get-all-pending-orders')
   async getAllPendingOrders(@Body() data: {customerId: string}): Promise<any> {
    console.log("customerId", data.customerId);
    return this.customerService.getAllPendingOrders(data.customerId);
   }
   @Post('get-all-delivered-orders')
   async getAllDeliveredOrders(@Body() data: {customerId: string}): Promise<any> {
    console.log("customerId", data.customerId);
    return this.customerService.getAllDeliveredOrders(data.customerId);
   }
   @Delete('delete-cart')
   async deleteCart(@Body() data: {cartId: string}): Promise<any> {
    console.log("data", data);
    console.log("cartId", data.cartId);
    return this.customerService.deleteCart(data.cartId);
   }
}