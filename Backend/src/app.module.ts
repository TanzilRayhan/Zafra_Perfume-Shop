import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

import { User } from './admin/entities/user.entity';
import { Product } from './admin/entities/product.entity';
import { Order } from './admin/entities/order.entity';
import { Review } from './admin/entities/review.entity';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',       
      password: 'admin',    
      database: 'zafra',       
      entities: [User, Product, Order, Review],
      synchronize: true,          
    }),

    AdminModule,
  ],
})
export class AppModule {}