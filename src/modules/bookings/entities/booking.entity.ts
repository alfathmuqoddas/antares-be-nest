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
  id: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column()
  showtimeId: string;

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
  @Column({ default: 'pending' })
  paymentStatus: 'pending' | 'paid' | 'canceled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
