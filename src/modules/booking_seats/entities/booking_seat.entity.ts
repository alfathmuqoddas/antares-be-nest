import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Booking } from 'src/modules/bookings/entities/booking.entity';
import { Seat } from 'src/modules/seats/entities/seat.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';

@Entity()
@Unique(['seatId', 'showtimeId'])
export class BookingSeat {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column()
  bookingId: string;

  @ApiProperty()
  @ManyToOne(() => Booking, (booking) => booking.bookingSeats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @ApiProperty()
  @Column()
  seatId: string;

  @ApiProperty()
  @ManyToOne(() => Seat, (seat) => seat.bookingSeats, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'seatId' })
  seat: Seat;

  @ApiProperty()
  @Column()
  showtimeId: string;

  @ApiProperty()
  @ManyToOne(() => Showtime, (showtime) => showtime.bookingSeats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showtimeId' })
  showtime: Showtime;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
