import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';

// Controllers
import { AdminController } from './admin.controller';
import { AuthController } from './auth/auth.controller';

// Services
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { AuthService } from './auth/auth.service';
import { MailerService } from './mailer/mailer.service';
import { ReviewService } from '../review/review.service';

// Entities - Using unified entities
import { User } from './entities/user.entity';
import { Perfume } from '../perfume/perfume.entity'; // Use unified Perfume entity
import { Order } from '../customer/order.entity'; // Use unified Order entity
import { Review } from '../review/review.entity'; // Use unified Review entity from src

// Auth
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Perfume, Order, Review]),

    PassportModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '300m' },
    }),

    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'tanzilrayhan169@gmail.com',
          pass: 'auub ixkd zoxl uhxk',
        },
      },
    }),
  ],
  controllers: [AdminController, AuthController],
  providers: [
    UsersService,
    ProductsService,
    OrdersService,
    ReviewService,
    AuthService,
    JwtStrategy,
    MailerService,
  ],
})
export class AdminModule {}
