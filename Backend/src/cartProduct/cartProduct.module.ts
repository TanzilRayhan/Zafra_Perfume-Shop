import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartProduct } from "./cartProduct.entity";

import { CartProductService } from "./cartProduct.service";
import { PerfumeModule } from "src/perfume/perfume.module";
@Module({
    imports: [TypeOrmModule.forFeature([CartProduct]), PerfumeModule],
    controllers: [],
    providers: [CartProductService],
    exports: [CartProductService],
})
export class CartProductModule {}