import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Cart } from "../cart/cart.entity";
import { Perfume } from "../perfume/perfume.entity";

@Entity("cartProduct")
export class CartProduct {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column()
    quantity: number;

    @Column()
    totalPrice: number;
   
    @Column()
    cartId: string;

    @ManyToOne(() => Cart, (cart) => cart.cartProducts, {
        onDelete: 'CASCADE'
    })
    cart: Cart;

    @Column()
    perfumeId: string;

    @ManyToOne(() => Perfume, (perfume) => perfume.cartProducts)
    @JoinColumn({ name: 'perfumeId' })
    perfume: Perfume;

    @BeforeInsert()
    async generateId() {
        this.id = uuidv4();
    }
}   