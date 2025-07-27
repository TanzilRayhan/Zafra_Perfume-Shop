import { Injectable } from "@nestjs/common";
import { CustomerDTO } from "./customer.DTO";
@Injectable()
export class CustomerService {
    getCustomer(): string {
        return "Customer data";
    }

    getCustomerById(id: string): string {
        return `Customer data for ID: ${id}`;
    }

    getPhotoService(photoId: string): string {
        return `Customer photo for ID: ${photoId}`;
    }

    createPhoto(): string {
        return 'Customer photo created';
    }

    createCustomer(customer: CustomerDTO): string {
        return `Customer created: ${customer.name}, Phone: ${customer.phone}`;
    }
}