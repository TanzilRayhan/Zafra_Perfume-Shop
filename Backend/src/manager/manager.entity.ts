import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from './product/product.entity';
import { OrderEntity } from './order/order.entity';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  managername: string; // 👉 ফ্রন্টএন্ডে email কে আমরা managername হিসেবে নেব

  @Column({ length: 150 })
  fullName: string; 

  @Column({ default: false })
  isActive: boolean;

  @Column({ length: 150 })
  password: string;


  @Column({ length: 150, nullable: true })
  shopName: string;

  @Column({ length: 200, nullable: true })
  shopLocation: string;

  @Column({ length: 20, nullable: true })
  phone: string;



  @OneToMany(() => ProductEntity, (product) => product.manager)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.manager)
  orders: OrderEntity[];
}
