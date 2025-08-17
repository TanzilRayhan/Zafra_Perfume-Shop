import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CustomerDTO } from "./dto/customer.DTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { Cart } from "src/cart/cart.entity";
import { CartService } from "src/cart/cart.service";
import { CartDto } from "src/cart/dto/cart.dto";
import { CartProduct } from "src/cartProduct/cartProduct.entity";
import { CustomerUpdateDTO } from "./dto/customerUpdate.dto";

export class PerfumeDetails {
    perfumeName: string;
    perfumeBrand: string;
    perfumeImage: string;
    perfumePrice: number;
    perfumeQuantity: number;
    constructor(perfumeName: string, perfumeBrand: string, perfumeImage: string, perfumePrice: number, perfumeQuantity: number) {
        this.perfumeName = perfumeName;
        this.perfumeBrand = perfumeBrand;
        this.perfumeImage = perfumeImage;
        this.perfumePrice = perfumePrice;
        this.perfumeQuantity = perfumeQuantity;
    }
}

export class CartDetails {
    cartId: string;
    cartTotal: number;
    cartQuantity: number;
    cartProducts: PerfumeDetails[];
}

export class OrderDetails {
    orderId: string;
    orderDate: Date;
    orderTotal: number;
    paymentStatus: string;
    orderStatus: string;
    customerName: string;
    customerEmail: string;
    customerPhone: number;
    customerAddress: string;
    orderProducts: PerfumeDetails[];
}

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @Inject(forwardRef(() => CartService))
        private cartService: CartService,
    ) {}
   
    async createCustomer(customer: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerRepository.create(customer);
        return this.customerRepository.save(newCustomer);
    }

    async addToCart(cart: CartDto): Promise<Cart> {
        return this.cartService.addToCart(cart);
    }

    async getAllcartsByCustomerId(customerId: string): Promise<any> {
        console.log("customerId", customerId);
        const result = await this.cartService.getAllcartsByCustomerId(customerId);
        const cartProducts: PerfumeDetails[] = [];
        const cart = result.find(cart => cart.paymentStatus === false && cart.deliveryStatus === false);
        if(!cart){
            throw new HttpException('No Cart Found', HttpStatus.NOT_FOUND);
        }
        else{
            console.log("found cart", cart?.cartProducts);
        for(const cartProduct of cart?.cartProducts || []){
            cartProducts.push(new PerfumeDetails(
                cartProduct.perfume.name,
                cartProduct.perfume.brand,
                cartProduct.perfume.image,
                cartProduct.perfume.price,
                cartProduct.quantity
            ));
        }
        const cartDetails: CartDetails = {
            cartId: cart?.id || "",
            cartTotal: cart?.totalPrice || 0,
            cartQuantity: cart?.quantity || 0, 
            cartProducts: cartProducts
        };
        return cartDetails;
        }
    }

    async findCustomerByEmail(email: string): Promise<Customer | null> {
        const customer = await this.customerRepository.findOne({ where: { email } });
        return customer;
    }

    async findCustomerByPhone(phone: number): Promise<Customer | null> {
        const customer = await this.customerRepository.findOne({ where: { phone } });
        return customer;
    }

    async createOrder(customerId: string, cartId: string): Promise<any> {
        const result= await this.cartService.getAllcartsByCustomerId(customerId);
        const customer=await this.customerRepository.findOne({ where: { id: customerId } });
        const cart=result.find(cart => cart.id===cartId);
        if(!cart){
            throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
        }
        console.log("cart", cart);  
        console.log("customer", customer);
        cart.paymentStatus=true;
        cart.orderCreatedDate=new Date();
        await this.cartService.updateCart(cart);
        const orderProducts: PerfumeDetails[] = [];
        for(const cartProduct of cart.cartProducts){
            orderProducts.push(new PerfumeDetails(
                cartProduct.perfume.name,
                cartProduct.perfume.brand,
                cartProduct.perfume.image,
                cartProduct.perfume.price,
                cartProduct.quantity
            ));
        }
        const orderDetails=new OrderDetails();
        orderDetails.orderId=cartId;
        orderDetails.orderDate=new Date();
        orderDetails.orderTotal=cart.totalPrice;
        orderDetails.orderProducts=orderProducts;
        orderDetails.customerName=customer?.fullName || "";
        orderDetails.customerEmail=customer?.email || "";
        orderDetails.customerPhone=customer?.phone || 0;
        orderDetails.customerAddress=customer?.address || "";
        return orderDetails;
    }

    async getAllPendingOrders(customerId: string): Promise<any> {
        const customer=await this.customerRepository.findOne({ where: { id: customerId } });
        const result=await this.cartService.getAllcartsByCustomerId(customerId);
        const order=result.find(cart => cart.paymentStatus === true && cart.deliveryStatus === false);
        const orderProducts: PerfumeDetails[] = [];
        for(const cartProduct of order?.cartProducts || []){
            orderProducts.push(new PerfumeDetails(
                cartProduct.perfume.name,
                cartProduct.perfume.brand,
                cartProduct.perfume.image,
                cartProduct.perfume.price,
                cartProduct.quantity
            ));
        }
        const orderDetails=new OrderDetails();
        orderDetails.orderId=order?.id || "";
        orderDetails.orderDate=order?.orderCreatedDate || new Date();
        orderDetails.orderTotal=order?.totalPrice || 0;
        orderDetails.orderProducts=orderProducts;
        orderDetails.paymentStatus=order?.paymentStatus ? "Paid" : "Pending";
        orderDetails.orderStatus=order?.deliveryStatus ? "Delivered" : "Pending";
        orderDetails.customerName=customer?.fullName || "";
        orderDetails.customerEmail=customer?.email || "";
        orderDetails.customerPhone=customer?.phone || 0;
        orderDetails.customerAddress=customer?.address || "";
        return orderDetails;
    }
    async getAllDeliveredOrders(customerId: string): Promise<any> {
        const customer=await this.customerRepository.findOne({ where: { id: customerId } });
        const result=await this.cartService.getAllcartsByCustomerId(customerId);
        const order=result.find(cart => cart.paymentStatus === true && cart.deliveryStatus === true);
       if(!order){
        throw new HttpException('No Completed Orders', HttpStatus.NOT_FOUND);
       }
       else{
        const orderProducts: PerfumeDetails[] = [];
        for(const cartProduct of order?.cartProducts || []){
            orderProducts.push(new PerfumeDetails(
                cartProduct.perfume.name,
                cartProduct.perfume.brand,
                cartProduct.perfume.image,
                cartProduct.perfume.price,
                cartProduct.quantity
            ));
        }
        const orderDetails=new OrderDetails();
        orderDetails.orderId=order?.id || "";
        orderDetails.orderDate=order?.orderCreatedDate || new Date();   
        orderDetails.orderTotal=order?.totalPrice || 0;
        orderDetails.orderProducts=orderProducts;
        orderDetails.paymentStatus=order?.paymentStatus ? "Paid" : "Pending";
        orderDetails.orderStatus=order?.deliveryStatus ? "Delivered" : "Pending";
        orderDetails.customerName=customer?.fullName || "";
        orderDetails.customerEmail=customer?.email || "";
        orderDetails.customerPhone=customer?.phone || 0;
        orderDetails.customerAddress=customer?.address || "";
        return orderDetails;
       }
    }
    async deleteCart(cartId: string): Promise<any> { 
        const result=await this.cartService.deleteCart(cartId);
        return result;
    }
    async updateCustomer(customerId: string, updateData: { fullName?: string, phone?: number, email?: string, address?: string }): Promise<Customer> {
        console.log("Customer ID:", customerId);
        console.log("Update data:", updateData);
        
        const customerData = await this.customerRepository.findOne({ where: { id: customerId } });
        console.log("Found customer:", customerData);
        
        if (!customerData) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        if (updateData.email !== customerData.email) {
            const existingCustomerWithEmail = await this.customerRepository.findOne({ 
                where: { email: updateData.email } 
            });
            if (existingCustomerWithEmail && existingCustomerWithEmail.id !== customerId) {
                throw new HttpException('Email already exists for another customer', HttpStatus.CONFLICT);
            }
        }

        if (updateData.phone !== customerData.phone) {
            const existingCustomerWithPhone = await this.customerRepository.findOne({ 
                where: { phone: updateData.phone } 
            });
            if (existingCustomerWithPhone && existingCustomerWithPhone.id !== customerId) {
                throw new HttpException('Phone number already exists for another customer', HttpStatus.CONFLICT);
            }
        }

        const finalUpdateData: Partial<Customer> = {};
        
        if (updateData.fullName !== undefined && updateData.fullName !== null) {
            finalUpdateData.fullName = updateData.fullName;
        }
        if (updateData.email !== undefined && updateData.email !== null) {
            finalUpdateData.email = updateData.email;
        }
        if (updateData.phone !== undefined && updateData.phone !== null) {
            finalUpdateData.phone = updateData.phone;
        }
        if (updateData.address !== undefined && updateData.address !== null) {
            finalUpdateData.address = updateData.address;
        }

        if (Object.keys(finalUpdateData).length > 0) {
            await this.customerRepository.update(customerId, finalUpdateData);
        } 
        const updatedCustomerData = await this.customerRepository.findOne({ where: { id: customerId } });
        if (!updatedCustomerData) {
            throw new HttpException('Customer not found after update', HttpStatus.NOT_FOUND);
        }
        return updatedCustomerData;
    }
    async getCustomer(id: string): Promise<Customer> {
        console.log("customer id", id);
        const customer = await this.customerRepository.findOne({ where: { id: id } });
        console.log("customer data", customer);
        if(!customer){
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }
        return customer;
    }
}