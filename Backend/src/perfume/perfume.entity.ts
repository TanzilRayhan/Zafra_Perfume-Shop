import { CartProduct } from 'src/cartProduct/cartProduct.entity';
import { Entity, Column, ManyToOne, BeforeInsert, PrimaryColumn, OneToMany } from 'typeorm';
import{ v4 as uuidv4 } from 'uuid';

@Entity()
export class Perfume {
  @PrimaryColumn({type: 'uuid'})
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;
  
  @Column()
  discount: number;
  
  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  stock: number;

  @Column()
  image: string;
  
  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.perfume)
  cartProducts: CartProduct[];

  @BeforeInsert()
  async generateId() {
    this.id = uuidv4();
  }
  
}