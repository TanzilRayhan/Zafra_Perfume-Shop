import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

// Import all your entity classes for the global config
import { User } from './admin/entities/user.entity';
import { Product } from './admin/entities/product.entity';
import { Order } from './admin/entities/order.entity';
import { Review } from './admin/entities/review.entity';

@Module({
  imports: [
    // Configure the database connection globally
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',         // Your PostgreSQL username
      password: 'admin',    // Your PostgreSQL password
      database: 'zafra',         // Your database name
      entities: [User, Product, Order, Review],
      synchronize: true,            // Automatically creates DB tables
    }),
    // Import the single, consolidated AdminModule
    AdminModule,
  ],
})
export class AppModule {}