
import { Controller, Post, Get, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }
  // order list
  @Get('/manager/:id')
  getManagerOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.getOrdersByManager(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) orderId: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateStatus(orderId, status);
  }
}
