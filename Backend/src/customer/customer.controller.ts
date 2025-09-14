import { Controller, Get, Param, Post, Body, ValidationPipe, BadRequestException, UploadedFile, UseInterceptors, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from "./customer.service";
import { CustomerDTO } from './dto/customer.DTO';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Customer } from './customer.entity';
import { Cart } from 'src/cart/cart.entity';
import { CartDto } from 'src/cart/dto/cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PusherService } from 'src/pusher/pusher.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService, private readonly pusherService: PusherService) { }

    @Post('create')
    async createCustomer(@Body() customer: CustomerDTO): Promise<Customer> {
        return this.customerService.createCustomer(customer);
    }

    @Post('update-customer')
    @UseGuards(AuthGuard)
    async updateCustomer(@Body() data: { customerID: string, fullName?: string, phone?: number, email?: string, address?: string }): Promise<Customer> {
        return this.customerService.updateCustomer(data.customerID, {
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            address: data.address
        });
    }
    @Post('get-customer')
    @UseGuards(AuthGuard)
    async getCustomer(@Body() data: {customerId: string}): Promise<Customer> {
        return this.customerService.getCustomer(data.customerId);
    }
    @Post('add-to-cart')
    @UseGuards(AuthGuard)
    async addToCart(@Body() cart: CartDto): Promise<Cart> {
        const result = await this.customerService.addToCart(cart);
        
        // Get updated cart count for the customer
        const cartDetails = await this.customerService.getAllcartsByCustomerId(cart.customerId);
        
        await this.pusherService.trigger('cart', 'cart-updated', {
            message: 'New item added',
            item: cart,
            cartCount: cartDetails.cartQuantity,
            cartTotal: cartDetails.cartTotal,
            customerId: cart.customerId
        });
        
        return result;
    }
   
    @Post('get-all-carts')
    @UseGuards(AuthGuard)
    async getAllcartsByCustomerId(@Body() data: {customerId: string}): Promise<any> {
        console.log("customerId", data.customerId);
        try {
            const result = await this.customerService.getAllcartsByCustomerId(data.customerId);
            console.log("getAllcartsByCustomerId result", result);
            return {
                status: 200,
                data: {
                    message: 'Customer carts retrieved successfully',
                    cartDetails: result
                }
            };
        } catch (error) {
            if (error.status === 404) {
                return {
                    status: 200,
                    data: {
                        message: 'No carts found',
                        cartDetails: []
                    }
                };
            }
            throw error;
        }
    }

    @Delete('delete-cart')
    @UseGuards(AuthGuard)   
    async deleteCustomerCart(@Body() data: {cartId: string}): Promise<any> {
        console.log("cartId", data.cartId);
        try {
        const result = await this.customerService.deleteCart(data.cartId);
        
        // Get updated cart count for the customer after deletion
        const cartDetails = await this.customerService.getAllcartsByCustomerId(result.customerId);
        
        await this.pusherService.trigger('cart', 'cart-updated', {
            message: 'Item removed from cart',
            cartCount: cartDetails.cartQuantity,
            cartTotal: cartDetails.cartTotal,
            customerId: result.customerId,
            action: 'delete'
        });
        
        return {
            status: 200,
            data: {
                message: 'Cart deleted successfully',
                    cartDetails: cartDetails
                }   
            };
        } catch (error) {
            if (error.status === 404) {
                return {
                    status: 200,
                    data: {
                        message: 'Deleted cart successfully',
                        cartDetails: []
                    }
                };
            }
            throw error;
        }
    }

    @Post('create-order')
    @UseGuards(AuthGuard)
    async createOrder(@Body() data: {
        customerName: string,
        customerEmail: string,
        customerPhone: string,
        customerId: string, 
        cartId: string, 
        shippingAddress?: string
    }): Promise<any> {
        console.log("createOrder data", data); 
        return this.customerService.createOrder(
            data.customerId, 
            data.cartId, 
            data.shippingAddress,
            data.customerPhone,
            data.customerEmail,
            data.customerName
        );
    }
   @Post('get-all-pending-orders')
   @UseGuards(AuthGuard)
   async getAllPendingOrders(@Body() data: {customerId: string}): Promise<any> {
    console.log("customerId", data.customerId);
    return this.customerService.getAllPendingOrders(data.customerId);
   }
   @Post('get-all-delivered-orders')
   @UseGuards(AuthGuard)
   async getAllDeliveredOrders(@Body() data: {customerId: string}): Promise<any> {
    console.log("customerId", data.customerId);
    return this.customerService.getAllDeliveredOrders(data.customerId);
   }

   @Post('get-all-orders')
   @UseGuards(AuthGuard)
   async getAllOrders(@Body() data: {customerId: string}): Promise<any> {
    console.log("customerId", data.customerId);
    return this.customerService.getAllOrders(data.customerId);
   }
}