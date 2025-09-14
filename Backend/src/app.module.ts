import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { PerfumeModule } from './perfume/perfume.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cartProduct/cartProduct.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './orderProduct/orderProduct.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from './manager/manager.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {PusherModule} from './pusher/pusher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'zafra',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ManagerModule,
    AdminModule,
    CustomerModule,
    PerfumeModule,
    CartModule,
    CartProductModule,
    OrderModule,
    OrderProductModule,
    AuthModule,
    PusherModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}