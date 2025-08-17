import { Module, forwardRef } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Cart } from "../cart/cart.entity";
import { CartModule } from "src/cart/cart.module";
import { PerfumeModule } from "src/perfume/perfume.module";
@Module({
    controllers: [CustomerController],
    providers: [CustomerService],
    imports: [TypeOrmModule.forFeature([Customer, Cart]), forwardRef(() => CartModule), PerfumeModule],
    exports: [CustomerService],
})
export class CustomerModule {}