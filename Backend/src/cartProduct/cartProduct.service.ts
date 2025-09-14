import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from './cartProduct.entity';
import { Repository } from 'typeorm';
import { CartDto } from 'src/cart/dto/cart.dto';
import { PerfumeService } from 'src/perfume/perfume.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
    private perfumeService: PerfumeService,
  ) {}

  async createCartProduct(
    cartData: CartDto & { cartId: string },
  ): Promise<CartProduct> {
    const product = await this.perfumeService.getPerfumeById(
      cartData.perfumeId,
    );
    const cartProduct = new CartProduct();
    cartProduct.perfume = product;
    cartProduct.cartId = cartData.cartId;
    cartProduct.quantity = cartData.quantity;
    cartProduct.totalPrice = product.price * cartData.quantity;
    const savedCartProduct = await this.cartProductRepository.save(cartProduct);
    return savedCartProduct;
  }

  async updateCartProduct(cartProduct: CartProduct): Promise<CartProduct> {
    return await this.cartProductRepository.save(cartProduct);
  }

  async getCartProductsByCartId(cartId: string): Promise<CartProduct[]> {
    return await this.cartProductRepository.find({
      where: { cartId },
      relations: ['perfume'],
    });
  }

  async deleteCartProductsByCartId(cartId: string): Promise<any> {
    const result = await this.cartProductRepository.delete({ cartId });
    return result;
  }

  async deleteCartProduct(cartProductId: string): Promise<void> {
    await this.cartProductRepository.delete(cartProductId);
  }
}
