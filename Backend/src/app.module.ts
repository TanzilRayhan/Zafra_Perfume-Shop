import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './manager/auth/auth.module';
import { OrderModule } from './manager/order/order.module';
import { EmailModule } from './manager/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'Zafra_Perfume-Shop',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ManagerModule,
    AdminModule,
    CustomerModule,
    AuthModule, // <-- auth module import
    OrderModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
