// cart.controller.ts (Backend)
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Patch(':id/status')
  async updateCartStatus(
    @Param('id') id: string,
    @Body() updateData: { paymentStatus?: boolean; deliveryStatus?: boolean }
  ) {
    return this.cartService.updateCartStatus(id, updateData);
  }
}