import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../customer/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['customer', 'orderProducts', 'orderProducts.product'],
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['customer', 'orderProducts', 'orderProducts.product'],
    });
  }

  async updateStatus(id: string, status: string): Promise<Order | null> {
    await this.ordersRepository.update(id, { orderStatus: status });
    return this.findOne(id);
  }
}
