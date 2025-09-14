import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../order/order.entity';
import { Perfume } from '../perfume/perfume.entity';

@Entity('orderProduct')
export class OrderProduct {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column()
  perfumeId: string;

  @ManyToOne(() => Perfume, (perfume) => perfume.orderProducts)
  @JoinColumn({ name: 'perfumeId' })
  perfume: Perfume;

  @BeforeInsert()
  async generateId() {
    this.id = uuidv4();
  }
}
