import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { OrderProductService } from "src/orderProduct/orderProduct.service";
import { CartService } from "src/cart/cart.service";
import { CustomerService } from "src/customer/customer.service";
import { CreateOrderDto, CreateOrderFromCartDto, UpdateOrderStatusDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private orderProductService: OrderProductService,
        @Inject(forwardRef(() => CartService))
        private cartService: CartService,
        @Inject(forwardRef(() => CustomerService))
        private customerService: CustomerService,
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const order = this.orderRepository.create(createOrderDto);
        return await this.orderRepository.save(order);
    }

    async createOrderFromCart(createOrderFromCartDto: CreateOrderFromCartDto): Promise<Order> {
        // Get the cart with all its products
        const cart = await this.cartService.getCartById(createOrderFromCartDto.cartId);

        if (cart.paymentStatus === true) {
            throw new HttpException('Cart has already been processed', HttpStatus.BAD_REQUEST);
        }

        // Get customer details from customer entity
        const customer = await this.customerService.getCustomer(cart.customerId);
        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        // Create the order with customer details from customer entity
        const orderData = {
            customerId: cart.customerId,
            totalQuantity: cart.quantity,
            totalPrice: cart.totalPrice,
            shippingAddress: createOrderFromCartDto.shippingAddress || customer.address,
            customerPhone: customer.phone.toString(),
            customerEmail: customer.email,
            customerName: customer.fullName,
            orderStatus: createOrderFromCartDto.orderStatus || 'pending',
            paymentStatus: createOrderFromCartDto.paymentStatus || 'pending',
        };

        const order = this.orderRepository.create(orderData);
        const savedOrder = await this.orderRepository.save(order);

        // Create order products from cart products
        for (const cartProduct of cart.cartProducts) {
            await this.orderProductService.createOrderProduct({
                orderId: savedOrder.id,
                perfumeId: cartProduct.perfumeId,
                quantity: cartProduct.quantity,
                unitPrice: cartProduct.totalPrice / cartProduct.quantity, // Calculate unit price
                totalPrice: cartProduct.totalPrice,
            });
        }

        // Delete the cart after successful order creation
        await this.cartService.deleteCart(cart.id);

        // Return the order with its products
        return await this.getOrderById(savedOrder.id);
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: ['orderProducts', 'orderProducts.perfume', 'customer']
        });
    }

    async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
        return await this.orderRepository.find({
            where: { customerId },
            relations: ['orderProducts', 'orderProducts.perfume']
        });
    }

    async getOrderById(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['orderProducts', 'orderProducts.perfume', 'customer']
        });

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return order;
    }

    async updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
        const order = await this.getOrderById(orderId);
        
        if (updateOrderStatusDto.orderStatus) {
            order.orderStatus = updateOrderStatusDto.orderStatus;
        }
        
        if (updateOrderStatusDto.paymentStatus) {
            order.paymentStatus = updateOrderStatusDto.paymentStatus;
        }
        
        if (updateOrderStatusDto.deliveryStatus !== undefined) {
            order.deliveryStatus = updateOrderStatusDto.deliveryStatus;
            if (updateOrderStatusDto.deliveryStatus) {
                order.deliveryDate = new Date();
            }
        }

        return await this.orderRepository.save(order);
    }

    async deleteOrder(orderId: string): Promise<void> {
        const order = await this.getOrderById(orderId);
        await this.orderRepository.remove(order);
    }
}
