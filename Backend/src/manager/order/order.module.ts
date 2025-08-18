// order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
