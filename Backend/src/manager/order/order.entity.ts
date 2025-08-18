// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
// import { ProductEntity } from '../product/product.entity';
// import { ManagerEntity } from '../manager.entity';

// @Entity('order')
// export class OrderEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column('uuid')
//   customer_id: string;

//   @CreateDateColumn()
//   order_date: Date;

//   @ManyToOne(() => ProductEntity, { eager: true })
//   product: ProductEntity;

//   @Column()
//   quantity: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   total_amount: number;

//   @Column({ default: 'Pending' })
//   status: string;

//   @Column('text')
//   shipping_address: string;

//   @Column({ length: 50 })
//   payment_method: string;

//   @Column({ default: 'Unpaid' })
//   payment_status: string;

//   @ManyToOne(() => ManagerEntity, (manager) => manager.orders, { onDelete: 'CASCADE' })
//   manager: ManagerEntity;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { ManagerEntity } from '../manager.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_id: string;

  @CreateDateColumn()
  order_date: Date;

  @ManyToOne(() => ProductEntity, { eager: true })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column({ default: 'Pending' })
  status: string;

  @Column('text')
  shipping_address: string;

  @Column({ length: 50 })
  payment_method: string;

  @Column({ default: 'Unpaid' })
  payment_status: string;

  @ManyToOne(() => ManagerEntity, (manager) => manager.orders, { onDelete: 'CASCADE', eager: true })
  manager: ManagerEntity;
}
