import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from './product/product.entity';
import { OrderEntity } from './order/order.entity';



@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  managername: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ length: 150, default: '123456' })
  password: string;

  @OneToMany(() => ProductEntity, (product) => product.manager)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.manager)
  orders: OrderEntity[];
}
