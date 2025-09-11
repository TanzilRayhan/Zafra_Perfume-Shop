import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Customer } from "src/customer/customer.entity";
import { OrderProduct } from "src/orderProduct/orderProduct.entity";

@Entity("order")
export class Order {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column()
    customerId: string;

    @Column()
    totalQuantity: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    totalPrice: number;

    @Column({type: 'varchar', length: 150, nullable: false})
    shippingAddress: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    customerPhone: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    customerEmail: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    customerName: string;

    @Column({type: 'enum', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending'})
    orderStatus: string;

    @Column({type: 'enum', enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending'})
    paymentStatus: string;

    @Column({type: 'boolean', default: false})
    deliveryStatus: boolean = false;

    @CreateDateColumn()
    orderDate: Date;

    @Column({nullable: true, type: 'timestamp'})
    deliveryDate: Date | null;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;
     
    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    orderProducts: OrderProduct[];

    @BeforeInsert()
    async generateId() {
        this.id = uuidv4();
    }
}
