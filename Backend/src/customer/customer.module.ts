import { Module, forwardRef } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Cart } from "../cart/cart.entity";
import { CartModule } from "src/cart/cart.module";
import { PerfumeModule } from "src/perfume/perfume.module";
import { MailerModule } from "@nestjs-modules/mailer";
@Module({
    controllers: [CustomerController],
    providers: [CustomerService],
    imports: [TypeOrmModule.forFeature([Customer, Cart]), forwardRef(() => CartModule), PerfumeModule,
        MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER || 'tafsirulislamshafin@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD || 'nzjg qtks zupg ignh'
            }
        }
    })
],
    exports: [CustomerService],
})
export class CustomerModule {}