import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  uniqueId: string = uuidv4();

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ length: 30, default: 'Unknown' })
  country: string;

  @CreateDateColumn()
  joiningDate: Date;
}
