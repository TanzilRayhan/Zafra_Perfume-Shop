import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';
import { Review } from '../review/review.entity';
import * as bcrypt from 'bcrypt';

@Entity('customer')
export class Customer {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  fullName: string;

  @Column({ type: 'bigint', unique: true })
  phone: number;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'customer' })
  role: string;

  @OneToMany(() => Cart, (cart) => cart.customer)
  cart: Cart[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @BeforeInsert()
  generateHashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
