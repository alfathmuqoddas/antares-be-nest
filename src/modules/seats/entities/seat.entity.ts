import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Screen } from 'src/modules/screens/entities/screen.entity';
import { Booking } from 'src/modules/bookings/entities/booking.entity';
import { BookingSeat } from 'src/modules/booking_seats/entities/booking_seat.entity';

@Entity()
export class Seat {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column({ type: 'int' })
  gridRow: number;

  @ApiProperty()
  @Column({ type: 'int' })
  gridCol: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  rowLabel: string | null;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  seatNumber: number | null;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['available', 'unavailable'],
    default: 'available',
  })
  status: 'available' | 'unavailable';

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['seat', 'aisle', 'gap'],
    default: 'seat',
  })
  type: 'seat' | 'aisle' | 'gap';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Screen, (screen) => screen.seats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'screenId' })
  screen: Screen;

  @Column({ nullable: true })
  screenId: string;

  @OneToMany(() => BookingSeat, (bookingSeat) => bookingSeat.seat)
  bookingSeats: BookingSeat[];
}
