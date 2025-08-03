import { Injectable } from "@nestjs/common";
import { CustomerDTO } from "./customer.DTO";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository, UpdateResult } from "typeorm";
import { Customer } from "./customer.entity";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}
    async getAllCustomers(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }
    async createCustomer(customer: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerRepository.create(customer);
        return await this.customerRepository.save(newCustomer);
    }
    async updateCustomer(id: string, customer: CustomerDTO): Promise<Customer> {
        await this.customerRepository.update(id, customer);
        const updatedCustomer = await this.customerRepository.findOne({where: {id}});
        if (!updatedCustomer) {
            throw new Error('Customer not found');
        }
        return updatedCustomer;
    }
    async getNullNameCustomers(): Promise<Customer[]> {
        return await this.customerRepository.find({where: { fullName: IsNull()}});
    }
    async deleteCustomer(id: string): Promise<{message: string}> {
        await this.customerRepository.delete(id);
        return {message: 'Customer deleted successfully'};
    }
}