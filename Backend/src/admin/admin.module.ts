import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';

// --- Import all Components ---
// Controllers
import { AdminController } from './admin.controller';
import { AuthController } from './auth/auth.controller';

// Services
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { ReviewsService } from './services/reviews.service';
import { AuthService } from './auth/auth.service';
import { MailerService } from './mailer/mailer.service';

// Entities
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { Review } from './entities/review.entity';

// Auth
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
  
    TypeOrmModule.forFeature([User, Product, Order, Review]),
    

    PassportModule,
    JwtModule.register({
      secret: 'secret-key', 
      signOptions: { expiresIn: '60m' },
    }),


    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'your-email@gmail.com', 
          pass: 'your-gmail-app-password',
        },
      },
    }),
  ],
  controllers: [
    AdminController,
    AuthController
  ],
  providers: [
    UsersService,
    ProductsService,
    OrdersService,
    ReviewsService,
    AuthService,
    JwtStrategy,
    MailerService
  ],
})
export class AdminModule {}