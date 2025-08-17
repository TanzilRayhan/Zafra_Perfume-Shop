import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { CustomerModule } from "src/customer/customer.module";
import { AuthGuard } from "./auth.guard";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./config/jwt-secret";

@Module({
    imports:[JwtModule.register({
        secret:jwtConstants.secret,
        global:true,
        signOptions:{expiresIn:'1d'},
    }),CustomerModule],
    providers:[AuthService,AuthGuard],
    exports:[AuthService,AuthGuard],
    controllers:[AuthController],
})
export class AuthModule {}