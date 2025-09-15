import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { CustomerService } from "src/customer/customer.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  async validateCustomer(email: string, password: string) {
    const customer = await this.customerService.findCustomerByEmail(email);

    if (customer && (await bcrypt.compare(password, customer.password))) {
      const { password, ...customerData } = customer;
      return customerData;
    }
    return null;
  }

  async login(customer: any) {
    const payload = {
      sub: customer.id,
      email: customer.email,
      role: customer.role || "customer", // default if not set
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      customer: {
        id: customer.id,
        email: customer.email,
        fullName: customer.fullName,
        phone: customer.phone,
        address: customer.address,
        role: customer.role || "customer",
      },
    };
  }

  async signup(signupDto: SignupDto) {
    if (signupDto.role === "admin") {
      // Admin creation logic
      return "admin is created";
    } else {
      // Check if email exists
      const existingCustomerByEmail =
        await this.customerService.findCustomerByEmail(signupDto.email);
      if (existingCustomerByEmail) {
        throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
      }

      // Check if phone exists
      const existingCustomerByPhone =
        await this.customerService.findCustomerByPhone(signupDto.phone);
      if (existingCustomerByPhone) {
        throw new HttpException(
          "Phone number already exists",
          HttpStatus.BAD_REQUEST
        );
      }

      // Default to 'customer' role
      const customerData = {
        ...signupDto,
        role: signupDto.role || "customer",
      };

      const newCustomer = await this.customerService.createCustomer(customerData);
      return newCustomer;
    }
  }
}
