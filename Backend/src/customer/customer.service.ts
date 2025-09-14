import {
  Injectable,
  forwardRef,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerDTO } from './dto/customer.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { Cart } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { CartDto } from 'src/cart/dto/cart.dto';
import { Order } from './order.entity';
import { CreateOrderFromCartDto } from './dto/order.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderProductService } from 'src/orderProduct/orderProduct.service';

export class PerfumeDetails {
  productName: string;
  productBrand: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
  constructor(
    productName: string,
    productBrand: string,
    productImage: string,
    productPrice: number,
    productQuantity: number,
  ) {
    this.productName = productName;
    this.productBrand = productBrand;
    this.productImage = productImage;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
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
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
    private orderProductService: OrderProductService,
    private mailerService: MailerService,
  ) {}

  async createCustomer(customer: CustomerDTO): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);

    // Temporarily disable email sending until SMTP is configured
    try {
      await this.mailerService.sendMail({
        to: customer.email,
        subject: 'Signup Successfully',
        text:
          'Hello ' +
          customer.fullName +
          ', Thank you for signing up. Welcome to our app.',
      });
      console.log('Welcome email sent successfully to:', customer.email);
    } catch (error) {
      console.log(
        'Email sending failed, but customer creation continues:',
        error.message,
      );
    }

    return this.customerRepository.save(newCustomer);
  }

  async addToCart(cart: CartDto): Promise<Cart> {
    return this.cartService.addToCart(cart);
  }

  async getAllcartsByCustomerId(customerId: string): Promise<any> {
    console.log('customerId', customerId);
    const result = await this.cartService.getAllcartsByCustomerId(customerId);
    const cartProducts: PerfumeDetails[] = [];
    const cart = result.find(
      (cart) => cart.paymentStatus === false && cart.deliveryStatus === false,
    );
    if (!cart) {
      throw new HttpException('No Cart Found', HttpStatus.NOT_FOUND);
    } else {
      console.log('found cart', cart?.cartProducts);
      for (const cartProduct of cart?.cartProducts || []) {
        cartProducts.push(
          new PerfumeDetails(
            cartProduct.perfume.name,
            cartProduct.perfume.brand,
            cartProduct.perfume.image,
            cartProduct.perfume.price,
            cartProduct.quantity,
          ),
        );
      }
      const cartDetails: CartDetails = {
        cartId: cart?.id || '',
        cartTotal: cart?.totalPrice || 0,
        cartQuantity: cart?.quantity || 0,
        cartProducts: cartProducts,
      };
      return cartDetails;
    }
  }

  async findCustomerByEmail(email: string): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });
    return customer;
  }

  async findCustomerByPhone(phone: number): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({
      where: { phone },
    });
    return customer;
  }

  async createOrder(
    customerId: string,
    cartId: string,
    shippingAddress?: string,
  ): Promise<OrderDetails> {
    try {
      console.log('Customer service createOrder called with:', {
        customerId,
        cartId,
        shippingAddress,
      });

      // Get customer details
      const customer = await this.customerRepository.findOne({
        where: { id: customerId },
      });
      console.log('Found customer:', customer);

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      // Create order from cart using internal method
      const createOrderDto: CreateOrderFromCartDto = {
        cartId: cartId,
        shippingAddress: shippingAddress, // Will handle fallback to customer address
      };

      console.log('Creating order with DTO:', createOrderDto);
      const order = await this.createOrderFromCart(createOrderDto);
      console.log('Order created:', order);

      // Convert order to OrderDetails format
      const orderProducts: PerfumeDetails[] = [];
      for (const orderProduct of order.orderProducts) {
        orderProducts.push(
          new PerfumeDetails(
            orderProduct.perfume.name,
            orderProduct.perfume.brand,
            orderProduct.perfume.image,
            orderProduct.perfume.price,
            orderProduct.quantity,
          ),
        );
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Internal method to create order from cart
  private async createOrderFromCart(
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
    const customer = await this.getCustomer(cart.customerId);
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

  // Internal method to get order by ID
  private async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['orderProducts', 'orderProducts.perfume', 'customer'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  // Internal method to get orders by customer ID
  private async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { customerId },
      relations: ['orderProducts', 'orderProducts.perfume'],
    });
  }

  async getAllPendingOrders(customerId: string): Promise<OrderDetails[]> {
    try {
      const orders = await this.getOrdersByCustomerId(customerId);
      const pendingOrders = orders.filter(
        (order) =>
          order.orderStatus === 'pending' ||
          order.orderStatus === 'confirmed' ||
          order.orderStatus === 'shipped',
      );

      const orderDetailsList: OrderDetails[] = [];
      for (const order of pendingOrders) {
        const orderProducts: PerfumeDetails[] = [];
        for (const orderProduct of order.orderProducts) {
          orderProducts.push(
            new PerfumeDetails(
              orderProduct.perfume.name,
              orderProduct.perfume.brand,
              orderProduct.perfume.image,
              orderProduct.perfume.price,
              orderProduct.quantity,
            ),
          );
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllDeliveredOrders(customerId: string): Promise<OrderDetails[]> {
    try {
      const orders = await this.getOrdersByCustomerId(customerId);
      const deliveredOrders = orders.filter(
        (order) =>
          order.orderStatus === 'delivered' && order.deliveryStatus === true,
      );

      if (deliveredOrders.length === 0) {
        throw new HttpException('No Completed Orders', HttpStatus.NOT_FOUND);
      }

      const orderDetailsList: OrderDetails[] = [];
      for (const order of deliveredOrders) {
        const orderProducts: PerfumeDetails[] = [];
        for (const orderProduct of order.orderProducts) {
          orderProducts.push(
            new PerfumeDetails(
              orderProduct.perfume.name,
              orderProduct.perfume.brand,
              orderProduct.perfume.image,
              orderProduct.perfume.price,
              orderProduct.quantity,
            ),
          );
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllOrders(customerId: string): Promise<OrderDetails[]> {
    try {
      const orders = await this.getOrdersByCustomerId(customerId);
      const orderDetailsList: OrderDetails[] = [];

      for (const order of orders) {
        const orderProducts: PerfumeDetails[] = [];
        for (const orderProduct of order.orderProducts) {
          orderProducts.push(
            new PerfumeDetails(
              orderProduct.perfume.name,
              orderProduct.perfume.brand,
              orderProduct.perfume.image,
              orderProduct.perfume.price,
              orderProduct.quantity,
            ),
          );
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
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteCart(cartId: string): Promise<any> {
    const result = await this.cartService.deleteCart(cartId);
    return result;
  }
  async updateCustomer(
    customerId: string,
    updateData: {
      fullName?: string;
      phone?: number;
      email?: string;
      address?: string;
    },
  ): Promise<Customer> {
    console.log('Customer ID:', customerId);
    console.log('Update data:', updateData);

    const customerData = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    console.log('Found customer:', customerData);

    if (!customerData) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    if (updateData.email !== customerData.email) {
      const existingCustomerWithEmail = await this.customerRepository.findOne({
        where: { email: updateData.email },
      });
      if (
        existingCustomerWithEmail &&
        existingCustomerWithEmail.id !== customerId
      ) {
        throw new HttpException(
          'Email already exists for another customer',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (updateData.phone !== customerData.phone) {
      const existingCustomerWithPhone = await this.customerRepository.findOne({
        where: { phone: updateData.phone },
      });
      if (
        existingCustomerWithPhone &&
        existingCustomerWithPhone.id !== customerId
      ) {
        throw new HttpException(
          'Phone number already exists for another customer',
          HttpStatus.CONFLICT,
        );
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
    const updatedCustomerData = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!updatedCustomerData) {
      throw new HttpException(
        'Customer not found after update',
        HttpStatus.NOT_FOUND,
      );
    }
    return updatedCustomerData;
  }
  async getCustomer(id: string): Promise<Customer> {
    console.log('customer id', id);
    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });
    console.log('customer data', customer);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }
}
