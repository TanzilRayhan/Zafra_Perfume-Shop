import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { Perfume } from '../perfume/perfume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
