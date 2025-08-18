
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './order.dto';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  ) {}

  // Customer creates order
  async createOrder(dto: CreateOrderDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId }, relations: ['manager'] });
    if (!product) throw new NotFoundException('Product not found');

    const order = this.orderRepo.create({
      customer_id: dto.customer_id,
      product,
      quantity: dto.quantity,
      total_amount: product.price * dto.quantity,
      shipping_address: dto.shipping_address,
      payment_method: dto.payment_method,
      payment_status: 'Unpaid',
      status: 'Pending',
      manager: product.manager,
       // product er manager auto assign hobe
    });

    return this.orderRepo.save(order);
  }

  // Manager get all orders
  async getOrdersByManager(managerId: string) {
    return this.orderRepo.find({
      where: { manager: { id: managerId } },
      relations: ['product'],
    });
  }

  // Manager update order status
  async updateStatus(orderId: string, status: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.orderRepo.save(order);
  }
}
