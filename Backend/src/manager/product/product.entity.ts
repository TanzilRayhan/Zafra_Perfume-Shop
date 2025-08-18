import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ManagerEntity } from '../manager.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 50 })
  size: string; // E.g., "50ml", "100ml"

  @Column({ length: 50 })
  gender: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => ManagerEntity, (manager) => manager.products, { onDelete: 'CASCADE' })
  manager: ManagerEntity;
}
