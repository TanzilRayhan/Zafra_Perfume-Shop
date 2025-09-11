import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './orderProduct.entity';
import { OrderProductService } from './orderProduct.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderProduct])],
    providers: [OrderProductService],
    exports: [OrderProductService],
})
export class OrderProductModule {}
