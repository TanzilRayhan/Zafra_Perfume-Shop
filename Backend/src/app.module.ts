import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [ManagerModule, AdminModule , CustomerModule, TypeOrmModule.forRoot({
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
