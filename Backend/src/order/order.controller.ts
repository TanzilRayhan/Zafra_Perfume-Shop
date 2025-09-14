import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CreateOrderFromCartDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return {
        success: true,
        message: 'Order created successfully',
        data: order,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create order',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('from-cart')
  async createOrderFromCart(
    @Body() createOrderFromCartDto: CreateOrderFromCartDto,
  ) {
    try {
      const order = await this.orderService.createOrderFromCart(
        createOrderFromCartDto,
      );
      return {
        success: true,
        message: 'Order created from cart successfully and cart deleted',
        data: order,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create order from cart',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllOrders() {
    try {
      const orders = await this.orderService.getAllOrders();
      return {
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve orders',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('customer/:customerId')
  async getOrdersByCustomerId(@Param('customerId') customerId: string) {
    try {
      const orders = await this.orderService.getOrdersByCustomerId(customerId);
      return {
        success: true,
        message: 'Customer orders retrieved successfully',
        data: orders,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve customer orders',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('customer/:customerId/pending')
  async getPendingOrdersByCustomerId(@Param('customerId') customerId: string) {
    try {
      const orders = await this.orderService.getOrdersByCustomerId(customerId);
      const pendingOrders = orders.filter(
        (order) =>
          order.orderStatus === 'pending' ||
          order.orderStatus === 'confirmed' ||
          order.orderStatus === 'shipped',
      );
      return {
        success: true,
        message: 'Pending orders retrieved successfully',
        data: pendingOrders,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve pending orders',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('customer/:customerId/delivered')
  async getDeliveredOrdersByCustomerId(
    @Param('customerId') customerId: string,
  ) {
    try {
      const orders = await this.orderService.getOrdersByCustomerId(customerId);
      const deliveredOrders = orders.filter(
        (order) =>
          order.orderStatus === 'delivered' && order.deliveryStatus === true,
      );
      return {
        success: true,
        message: 'Delivered orders retrieved successfully',
        data: deliveredOrders,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve delivered orders',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    try {
      const order = await this.orderService.getOrderById(id);
      return {
        success: true,
        message: 'Order retrieved successfully',
        data: order,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve order',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      const order = await this.orderService.updateOrderStatus(
        id,
        updateOrderStatusDto,
      );
      return {
        success: true,
        message: 'Order status updated successfully',
        data: order,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update order status',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    try {
      await this.orderService.deleteOrder(id);
      return {
        success: true,
        message: 'Order deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete order',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
