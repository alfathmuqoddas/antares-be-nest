import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  stock: number;
}
