import{Controller, Get, Param} from '@nestjs/common';
import { CustomerService } from "./customer.service";
@Controller( 'customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    getCustomer(): string {
        return this.customerService.getCustomer();
    }   
    @Get(':id')
    getCustomerById(@Param('id') id: string): string {
        return this.customerService.getCustomerById(id);
    }

}