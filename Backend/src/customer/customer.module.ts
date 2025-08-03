import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
@Module({
    controllers: [CustomerController],
    providers: [CustomerService],
    imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}