import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './manager.entity';
import { ProductEntity } from './product/product.entity';
import { OrderEntity } from './order/order.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity, ProductEntity, OrderEntity])],
  providers: [ManagerService],
  controllers: [ManagerController],
})
export class ManagerModule {}
