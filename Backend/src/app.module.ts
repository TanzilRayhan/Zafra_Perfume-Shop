import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumeModule } from './perfume/perfume.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cartProduct/cartProduct.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ManagerModule, AdminModule , CustomerModule,
    PerfumeModule,
    CartModule,
    CartProductModule, 
    AuthModule,
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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
