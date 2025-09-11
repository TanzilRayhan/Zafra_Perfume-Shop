import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProductModule } from 'src/orderProduct/orderProduct.module';
import { CartModule } from 'src/cart/cart.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        OrderProductModule,
        forwardRef(() => CartModule),
        forwardRef(() => CustomerModule)
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule {}
