import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Component {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
  @Column()
  stock: number;
}
