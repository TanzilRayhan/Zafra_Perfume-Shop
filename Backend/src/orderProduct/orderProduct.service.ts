import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from './orderProduct.entity';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectRepository(OrderProduct)
        private orderProductRepository: Repository<OrderProduct>,
    ) {}

    async createOrderProduct(orderProductData: Partial<OrderProduct>): Promise<OrderProduct> {
        const orderProduct = this.orderProductRepository.create(orderProductData);
        return await this.orderProductRepository.save(orderProduct);
    }

    async getOrderProductsByOrderId(orderId: string): Promise<OrderProduct[]> {
        return await this.orderProductRepository.find({
            where: { orderId },
            relations: ['perfume']
        });
    }

    async deleteOrderProduct(orderProductId: string): Promise<void> {
        await this.orderProductRepository.delete(orderProductId);
    }
}
