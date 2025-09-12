import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { CustomerDTO } from "./dto/customer.DTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { Cart } from "src/cart/cart.entity";
import { CartService } from "src/cart/cart.service";
import { CartDto } from "src/cart/dto/cart.dto";
import { OrderService } from "src/order/order.service";
import { Order } from "src/order/order.entity";
import { CreateOrderFromCartDto } from "src/order/dto/order.dto";
import { MailerService } from '@nestjs-modules/mailer';

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
    deliveryStatus: boolean;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
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
        @Inject(forwardRef(() => OrderService))
        private orderService: OrderService,
        private mailerService: MailerService
    ) {}
   
    async createCustomer(customer: CustomerDTO): Promise<Customer> {
        const newCustomer = this.customerRepository.create(customer);
        
        // Temporarily disable email sending until SMTP is configured
        try {
            await this.mailerService.sendMail({
                to: customer.email,
                subject: 'Signup Successfully',
                text: 'Hello '+customer.fullName+', Thank you for signing up. Welcome to our app.',
            });
            console.log('Welcome email sent successfully to:', customer.email);
        } catch (error) {
            console.log('Email sending failed, but customer creation continues:', error.message);
        }
        
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

    async createOrder(customerId: string, cartId: string, shippingAddress?: string, customerPhone?: string, customerEmail?: string, customerName?: string): Promise<OrderDetails> {
        try {
            console.log('Customer service createOrder called with:', { customerId, cartId, shippingAddress, customerPhone, customerEmail, customerName });
            
            // Get customer details
            const customer = await this.customerRepository.findOne({ where: { id: customerId } });
            console.log('Found customer:', customer);
            
            if (!customer) {
                throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
            }

            // Create order from cart using the order service
            const createOrderDto: CreateOrderFromCartDto = {
                cartId: cartId,
                shippingAddress: shippingAddress || customer.address, 
                customerPhone: customerPhone || customer.phone.toString(), 
                customerEmail: customerEmail || customer.email, 
                customerName: customerName || customer.fullName, 
                orderStatus: 'pending',
                paymentStatus: 'pending'
            };

            console.log('Calling order service with DTO:', createOrderDto);
            const order = await this.orderService.createOrderFromCart(createOrderDto);
            console.log('Order service returned:', order);
            
            // Convert order to OrderDetails format
            const orderProducts: PerfumeDetails[] = [];
            for (const orderProduct of order.orderProducts) {
                orderProducts.push(new PerfumeDetails(
                    orderProduct.perfume.name,
                    orderProduct.perfume.brand,
                    orderProduct.perfume.image,
                    orderProduct.perfume.price,
                    orderProduct.quantity
                ));
            }

            const orderDetails = new OrderDetails();
            orderDetails.orderId = order.id;
            orderDetails.orderDate = order.orderDate;
            orderDetails.orderTotal = order.totalPrice;
            orderDetails.paymentStatus = order.paymentStatus;
            orderDetails.orderStatus = order.orderStatus;
            orderDetails.deliveryStatus = order.deliveryStatus;
            orderDetails.customerName = order.customerName;
            orderDetails.customerEmail = order.customerEmail;
            orderDetails.customerPhone = order.customerPhone;
            orderDetails.customerAddress = order.shippingAddress;
            orderDetails.orderProducts = orderProducts;

            return orderDetails;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to create order',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllPendingOrders(customerId: string): Promise<OrderDetails[]> {
        try {
            const orders = await this.orderService.getOrdersByCustomerId(customerId);
            const pendingOrders = orders.filter(order => 
                order.orderStatus === 'pending' || 
                order.orderStatus === 'confirmed' || 
                order.orderStatus === 'shipped'
            );

            const orderDetailsList: OrderDetails[] = [];
            for (const order of pendingOrders) {
                const orderProducts: PerfumeDetails[] = [];
                for (const orderProduct of order.orderProducts) {
                    orderProducts.push(new PerfumeDetails(
                        orderProduct.perfume.name,
                        orderProduct.perfume.brand,
                        orderProduct.perfume.image,
                        orderProduct.perfume.price,
                        orderProduct.quantity
                    ));
                }

                const orderDetails = new OrderDetails();
                orderDetails.orderId = order.id;
                orderDetails.orderDate = order.orderDate;
                orderDetails.orderTotal = order.totalPrice;
                orderDetails.paymentStatus = order.paymentStatus;
                orderDetails.orderStatus = order.orderStatus;
                orderDetails.deliveryStatus = order.deliveryStatus;
                orderDetails.customerName = order.customerName;
                orderDetails.customerEmail = order.customerEmail;
                orderDetails.customerPhone = order.customerPhone;
                orderDetails.customerAddress = order.shippingAddress;
                orderDetails.orderProducts = orderProducts;

                orderDetailsList.push(orderDetails);
            }

            return orderDetailsList;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve pending orders',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllDeliveredOrders(customerId: string): Promise<OrderDetails[]> {
        try {
            const orders = await this.orderService.getOrdersByCustomerId(customerId);
            const deliveredOrders = orders.filter(order => 
                order.orderStatus === 'delivered' && order.deliveryStatus === true
            );

            if (deliveredOrders.length === 0) {
                throw new HttpException('No Completed Orders', HttpStatus.NOT_FOUND);
            }

            const orderDetailsList: OrderDetails[] = [];
            for (const order of deliveredOrders) {
                const orderProducts: PerfumeDetails[] = [];
                for (const orderProduct of order.orderProducts) {
                    orderProducts.push(new PerfumeDetails(
                        orderProduct.perfume.name,
                        orderProduct.perfume.brand,
                        orderProduct.perfume.image,
                        orderProduct.perfume.price,
                        orderProduct.quantity
                    ));
                }

                const orderDetails = new OrderDetails();
                orderDetails.orderId = order.id;
                orderDetails.orderDate = order.orderDate;
                orderDetails.orderTotal = order.totalPrice;
                orderDetails.paymentStatus = order.paymentStatus;
                orderDetails.orderStatus = order.orderStatus;
                orderDetails.deliveryStatus = order.deliveryStatus;
                orderDetails.customerName = order.customerName;
                orderDetails.customerEmail = order.customerEmail;
                orderDetails.customerPhone = order.customerPhone;
                orderDetails.customerAddress = order.shippingAddress;
                orderDetails.orderProducts = orderProducts;

                orderDetailsList.push(orderDetails);
            }

            return orderDetailsList;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve delivered orders',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllOrders(customerId: string): Promise<OrderDetails[]> {
        try {
            const orders = await this.orderService.getOrdersByCustomerId(customerId);
            const orderDetailsList: OrderDetails[] = [];

            for (const order of orders) {
                const orderProducts: PerfumeDetails[] = [];
                for (const orderProduct of order.orderProducts) {
                    orderProducts.push(new PerfumeDetails(
                        orderProduct.perfume.name,
                        orderProduct.perfume.brand,
                        orderProduct.perfume.image,
                        orderProduct.perfume.price,
                        orderProduct.quantity
                    ));
                }

                const orderDetails = new OrderDetails();
                orderDetails.orderId = order.id;
                orderDetails.orderDate = order.orderDate;
                orderDetails.orderTotal = order.totalPrice;
                orderDetails.paymentStatus = order.paymentStatus;
                orderDetails.orderStatus = order.orderStatus;
                orderDetails.deliveryStatus = order.deliveryStatus;
                orderDetails.customerName = order.customerName;
                orderDetails.customerEmail = order.customerEmail;
                orderDetails.customerPhone = order.customerPhone;
                orderDetails.customerAddress = order.shippingAddress;
                orderDetails.orderProducts = orderProducts;

                orderDetailsList.push(orderDetails);
            }

            return orderDetailsList;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to retrieve orders',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
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