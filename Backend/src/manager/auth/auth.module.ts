import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from '../manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
