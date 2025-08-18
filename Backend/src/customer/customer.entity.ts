import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { OrderEntity } from '../manager/order/order.entity';
import { ManagerEntity } from '../manager/manager.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  
}
