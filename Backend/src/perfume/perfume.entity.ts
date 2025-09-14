import { CartProduct } from 'src/cartProduct/cartProduct.entity';
import { OrderProduct } from 'src/orderProduct/orderProduct.entity';
import { Review } from '../review/review.entity';
import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('perfumes')
export class Perfume {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column('int')
  stock: number;

  @Column()
  image: string;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.perfume)
  cartProducts: CartProduct[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.perfume)
  orderProducts: OrderProduct[];

  @OneToMany(() => Review, (review) => review.perfume)
  reviews: Review[];

  @BeforeInsert()
  async generateId() {
    this.id = uuidv4();
  }
}
