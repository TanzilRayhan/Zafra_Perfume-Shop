import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert, OneToMany, IsNull } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Customer } from "src/customer/customer.entity";
import { CartProduct } from "src/cartProduct/cartProduct.entity";

@Entity("cart")
export class Cart {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column()
    quantity: number;

    @Column()
    totalPrice: number;

    @Column({type: 'boolean', default: false})
    paymentStatus: boolean = false;

    @Column({nullable: true, type: 'timestamp'})
    orderCreatedDate: Date | null;

    @Column({type: 'boolean', default: false})
    deliveryStatus: boolean = false;

    @Column()
    customerId: string;

    @ManyToOne(() => Customer, (customer) => customer.cart)
    customer: Customer;
     
    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    cartProducts: CartProduct[];

    @BeforeInsert()
    async generateId() {
        this.id = uuidv4();
    }
}   