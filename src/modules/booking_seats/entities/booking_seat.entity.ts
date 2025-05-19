import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BookingSeat {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column()
  bookingId: string;

  @ApiProperty()
  @Column()
  seatId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
