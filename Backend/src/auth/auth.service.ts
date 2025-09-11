import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { CustomerService } from "src/customer/customer.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { Customer } from "src/customer/customer.entity";
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,private readonly customerService: CustomerService) {}
   
    async validateCustomer(email: string, password: string) {
        const customer = await this.customerService.findCustomerByEmail(email);
       
        if(customer && await bcrypt.compare(password, customer.password)){
            const {password,...customerData}=customer;
            console.log("customerData",customerData);
            return customerData;
        }
        return null;
    }

    async login(customer: any) {
       const payload={
        sub:customer.id,
        email:customer.email,
        role:customer.role || 'customer', // Default to 'customer' if role is not set
       }
       const token=this.jwtService.sign(payload);
       return {
        access_token:token,
        customer:{
            id:customer.id,
            email:customer.email,
            fullName:customer.fullName,
            phone:customer.phone,
            address:customer.address,
            role:customer.role , // Ensure role is always returned
        }
       };
    }
   
    async signup(signupDto: SignupDto) {
        if(signupDto.role==="admin"){
            // Admin creation logic can be implemented here
            return "admin is created";
        }
        else{
            // Check if email already exists
            const existingCustomerByEmail = await this.customerService.findCustomerByEmail(signupDto.email);
            if (existingCustomerByEmail) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
            
            // Check if phone already exists
            const existingCustomerByPhone = await this.customerService.findCustomerByPhone(signupDto.phone);
            if (existingCustomerByPhone) {
                throw new HttpException('Phone number already exists', HttpStatus.BAD_REQUEST);
            }
            
            // Ensure role is set to 'customer' for regular signups
            const customerData = {
                ...signupDto,
                role: signupDto.role || 'customer'
            };
            
            const newCustomer=await this.customerService.createCustomer(customerData);
            return newCustomer;
        }
        
    }
}