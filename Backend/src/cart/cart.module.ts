import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { CartProduct } from "src/cartProduct/cartProduct.entity";
import { Customer } from "src/customer/customer.entity";
import { CartService } from "./cart.service";


import { CartProductModule } from "src/cartProduct/cartProduct.module";
import { CustomerModule } from "src/customer/customer.module";
@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartProduct, Customer]), CartProductModule, forwardRef(() => CustomerModule)
    ],
    controllers: [],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule {}