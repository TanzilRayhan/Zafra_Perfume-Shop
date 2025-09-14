import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderProductService } from 'src/orderProduct/orderProduct.service';
import { CartService } from 'src/cart/cart.service';
import { CustomerService } from 'src/customer/customer.service';
import {
  CreateOrderDto,
  CreateOrderFromCartDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';

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
    console.log('request createOrderDto', createOrderDto);
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async createOrderFromCart(
    createOrderFromCartDto: CreateOrderFromCartDto,
  ): Promise<Order> {
    console.log('Creating order from cart with data:', createOrderFromCartDto);

    // Get the cart with all its products
    const cart = await this.cartService.getCartById(
      createOrderFromCartDto.cartId,
    );
    console.log('Retrieved cart:', cart);

    if (cart.paymentStatus === true) {
      throw new HttpException(
        'Cart has already been processed',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!cart.cartProducts || cart.cartProducts.length === 0) {
      throw new HttpException(
        'Cart is empty - cannot create order',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Get customer details from customer entity
    const customer = await this.customerService.getCustomer(cart.customerId);
    console.log('Retrieved customer:', customer);

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    // Create the order with customer details from customer entity
    const orderData = {
      customerId: cart.customerId,
      totalQuantity: cart.quantity,
      totalPrice: cart.totalPrice,
      shippingAddress:
        createOrderFromCartDto.shippingAddress || customer.address,
      customerPhone:
        createOrderFromCartDto.customerPhone || customer.phone.toString(),
      customerEmail: createOrderFromCartDto.customerEmail || customer.email,
      customerName: createOrderFromCartDto.customerName || customer.fullName,
      orderStatus: createOrderFromCartDto.orderStatus || 'pending',
      paymentStatus: createOrderFromCartDto.paymentStatus || 'pending',
    };

    console.log('Creating order with data:', orderData);
    const order = this.orderRepository.create(orderData);
    const savedOrder = await this.orderRepository.save(order);
    console.log('Saved order:', savedOrder);

    // Create order products from cart products
    console.log(
      'Creating order products from cart products:',
      cart.cartProducts,
    );
    for (const cartProduct of cart.cartProducts) {
      const orderProductData = {
        orderId: savedOrder.id,
        perfumeId: cartProduct.perfumeId,
        quantity: cartProduct.quantity,
        unitPrice: cartProduct.totalPrice / cartProduct.quantity, // Calculate unit price
        totalPrice: cartProduct.totalPrice,
      };
      console.log('Creating order product with data:', orderProductData);
      await this.orderProductService.createOrderProduct(orderProductData);
    }

    // Delete the cart after successful order creation
    console.log('Deleting cart after order creation');
    await this.cartService.deleteCart(cart.id);

    // Return the order with its products
    const finalOrder = await this.getOrderById(savedOrder.id);
    console.log('Final order with products:', finalOrder);
    return finalOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product', 'customer'],
    });
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { customerId },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderProducts', 'orderProducts.product', 'customer'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
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
