import { Body, Controller, Get, HttpStatus, HttpException, Post, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { AuthGuard } from "./auth.guard";
 
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const customer=await this.authService.validateCustomer(loginDto.email,loginDto.password);
        if(!customer){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return this.authService.login(customer);
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async profile(@Req() req: any) {
        return req.customer;
    }
}