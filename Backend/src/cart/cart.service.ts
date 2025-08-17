import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { CartProductService } from "src/cartProduct/cartProduct.service";
import { CartDto } from "./dto/cart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        private cartProductService: CartProductService,
    ) {}

    async addToCart(cart: CartDto): Promise<Cart> {
        const result  = await this.getAllcartsByCustomerId(cart.customerId);
        const existingCart = result.find(cart => cart.paymentStatus===false && cart.deliveryStatus===false);
        console.log("existingCart", existingCart);
        if (existingCart) {
            // throw new HttpException('Cart already exists', HttpStatus.BAD_REQUEST);

            // update the cart
            console.log("Added to cart ");
            existingCart.quantity += cart.quantity;
            existingCart.totalPrice += cart.totalPrice;
            await this.cartRepository.save(existingCart);

            // update the cart product
            await this.cartProductService.createCartProduct({
                ...cart,
                cartId: existingCart.id
            });
            console.log("Updated cart and cart data: ", existingCart);
            return existingCart;
        }
        else{
            const newCart = this.cartRepository.create(cart);
            const savedCart = await this.cartRepository.save(newCart);
         
            // Create the cart product with the cart ID
            await this.cartProductService.createCartProduct({
                ...cart,
                cartId: savedCart.id
            });
           console.log("Created new cart and cart data: ", savedCart);
            return savedCart;
        }
        // First create and save the cart
        
    }

    async getAllcartsByCustomerId(customerId: string): Promise<Cart[]> {
        const carts = await this.cartRepository.find({ 
            where: { customerId },
            relations: ['cartProducts', 'cartProducts.perfume']
        });
        return carts;
    }

    async updateCart(cart: Cart): Promise<Cart> {
        const updatedCart = await this.cartRepository.save(cart);
        return updatedCart;
    }
    async deleteCart(cartId: string): Promise<any> {
        // Find the cart with its relations
        const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: ['cartProducts']
        });
        
        if (!cart) {
            throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
        }
        
        // Use remove method which handles cascades properly
        const deletedCart = await this.cartRepository.remove(cart);
        return deletedCart ;
    }
    
}