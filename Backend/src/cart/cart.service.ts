import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartProductService } from 'src/cartProduct/cartProduct.service';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartProductService: CartProductService,
  ) {}

  async addToCart(cart: CartDto): Promise<Cart> {
    // Get all carts for the customer
    const result = await this.getAllcartsByCustomerId(cart.customerId);

    // Find active cart (not paid and not delivered)
    const existingCart = result.find(
      (cartItem) =>
        cartItem.paymentStatus === false && cartItem.deliveryStatus === false,
    );

    console.log('existingCart', existingCart);

    if (existingCart) {
      // Check if the same perfume already exists in the cart
      const existingCartProduct = existingCart.cartProducts.find(
        (cp) => cp.perfumeId === cart.perfumeId,
      );

      if (existingCartProduct) {
        // Update existing cart product quantity and price
        existingCartProduct.quantity += cart.quantity;
        existingCartProduct.totalPrice += cart.totalPrice;
        await this.cartProductService.updateCartProduct(existingCartProduct);
      } else {
        // Add new cart product
        await this.cartProductService.createCartProduct({
          ...cart,
          cartId: existingCart.id,
        });
      }

      // Update cart totals
      existingCart.quantity += cart.quantity;
      existingCart.totalPrice += cart.totalPrice;
      const updatedCart = await this.cartRepository.save(existingCart);

      console.log('Updated cart and cart data: ', updatedCart);
      return updatedCart;
    } else {
      // Create new cart
      const newCart = this.cartRepository.create({
        customerId: cart.customerId,
        quantity: cart.quantity,
        totalPrice: cart.totalPrice,
        paymentStatus: false,
        deliveryStatus: false,
        orderCreatedDate: null,
      });
      const savedCart = await this.cartRepository.save(newCart);

      // Create the cart product with the cart ID
      await this.cartProductService.createCartProduct({
        ...cart,
        cartId: savedCart.id,
      });

      console.log('Created new cart and cart data: ', savedCart);
      return savedCart;
    }
  }

  async getAllcartsByCustomerId(customerId: string): Promise<Cart[]> {
    const carts = await this.cartRepository.find({
      where: { customerId },
      relations: ['cartProducts', 'cartProducts.perfume'],
    });
    return carts;
  }

  async getCartById(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartProducts', 'cartProducts.perfume'],
    });

    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  async updateCart(cart: Cart): Promise<Cart> {
    const updatedCart = await this.cartRepository.save(cart);
    return updatedCart;
  }
  async deleteCart(cartId: string): Promise<any> {
    // Find the cart with its relations
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['cartProducts'],
    });

    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    // Use remove method which handles cascades properly
    const deletedCart = await this.cartRepository.remove(cart);
    return deletedCart;
  }

  async getActiveCartByCustomerId(customerId: string): Promise<Cart | null> {
    const carts = await this.getAllcartsByCustomerId(customerId);
    return (
      carts.find(
        (cart) => cart.paymentStatus === false && cart.deliveryStatus === false,
      ) || null
    );
  }

  async clearCart(cartId: string): Promise<Cart> {
    const cart = await this.getCartById(cartId);

    // Delete all cart products
    await this.cartProductService.deleteCartProductsByCartId(cartId);

    // Reset cart totals
    cart.quantity = 0;
    cart.totalPrice = 0;

    return await this.updateCart(cart);
  }

  async removeProductFromCart(
    cartId: string,
    perfumeId: string,
  ): Promise<Cart> {
    const cart = await this.getCartById(cartId);
    const cartProduct = cart.cartProducts.find(
      (cp) => cp.perfumeId === perfumeId,
    );

    if (!cartProduct) {
      throw new HttpException(
        'Product not found in cart',
        HttpStatus.NOT_FOUND,
      );
    }

    // Update cart totals
    cart.quantity -= cartProduct.quantity;
    cart.totalPrice -= cartProduct.totalPrice;

    // Delete the cart product
    await this.cartProductService.deleteCartProduct(cartProduct.id);

    return await this.updateCart(cart);
  }
}
