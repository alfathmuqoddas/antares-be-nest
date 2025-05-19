import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
