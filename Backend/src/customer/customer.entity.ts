import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity("customer")
export class Customer {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 150, nullable: true })
    fullName: string;

    @Column({ type: 'bigint', unique: true })
    phone: number;
    
    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}