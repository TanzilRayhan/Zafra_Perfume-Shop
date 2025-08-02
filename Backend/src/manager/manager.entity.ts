import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
