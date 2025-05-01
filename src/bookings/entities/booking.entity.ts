import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  showtimeId: number;

  @ApiProperty()
  @Column()
  bookingTime: Date;

  @ApiProperty()
  @Column()
  totalAmount: number;

  @ApiProperty()
  @Column()
  bookingReference: string;

  @ApiProperty()
  @Column()
  paymentStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
