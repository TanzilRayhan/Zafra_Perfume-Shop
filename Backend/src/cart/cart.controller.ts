import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    @UseGuards(AuthGuard)
    async addToCart(@Body() cartDto: CartDto) {
        try {
            const cart = await this.cartService.addToCart(cartDto);
            return {
                success: true,
                message: 'Product added to cart successfully',
                data: cart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to add product to cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('customer/:customerId')
    @UseGuards(AuthGuard)
    async getCartsByCustomerId(@Param('customerId') customerId: string) {
        try {
            const carts = await this.cartService.getAllcartsByCustomerId(customerId);
            return {
                success: true,
                message: 'Customer carts retrieved successfully',
                data: carts
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve customer carts',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getCartById(@Param('id') id: string) {
        try {
            const cart = await this.cartService.getCartById(id);
            return {
                success: true,
                message: 'Cart retrieved successfully',
                data: cart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateCart(@Param('id') id: string, @Body() updateData: Partial<CartDto>) {
        try {
            const cart = await this.cartService.getCartById(id);
            
            // Update only the allowed fields
            if (updateData.quantity !== undefined) cart.quantity = updateData.quantity;
            if (updateData.totalPrice !== undefined) cart.totalPrice = updateData.totalPrice;
            if (updateData.paymentStatus !== undefined) cart.paymentStatus = updateData.paymentStatus;
            if (updateData.deliveryStatus !== undefined) cart.deliveryStatus = updateData.deliveryStatus;
            
            const updatedCart = await this.cartService.updateCart(cart);
            return {
                success: true,
                message: 'Cart updated successfully',
                data: updatedCart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to update cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteCart(@Param('id') id: string) {
        try {
            await this.cartService.deleteCart(id);
            return {
                success: true,
                message: 'Cart deleted successfully'
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to delete cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('active/:customerId')
    @UseGuards(AuthGuard)
    async getActiveCart(@Param('customerId') customerId: string) {
        try {
            const activeCart = await this.cartService.getActiveCartByCustomerId(customerId);
            
            if (!activeCart) {
                return {
                    success: true,
                    message: 'No active cart found',
                    data: null
                };
            }

            return {
                success: true,
                message: 'Active cart retrieved successfully',
                data: activeCart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve active cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put('clear/:id')
    @UseGuards(AuthGuard)
    async clearCart(@Param('id') id: string) {
        try {
            const cart = await this.cartService.clearCart(id);
            return {
                success: true,
                message: 'Cart cleared successfully',
                data: cart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to clear cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete('product/:cartId/:perfumeId')
    @UseGuards(AuthGuard)
    async removeProductFromCart(
        @Param('cartId') cartId: string,
        @Param('perfumeId') perfumeId: string
    ) {
        try {
            const cart = await this.cartService.removeProductFromCart(cartId, perfumeId);
            return {
                success: true,
                message: 'Product removed from cart successfully',
                data: cart
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to remove product from cart',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
