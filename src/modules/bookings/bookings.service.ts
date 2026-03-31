import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { DataSource } from 'typeorm';
import { Showtime } from '../showtimes/entities/showtime.entity';
import { BookingSeat } from '../booking_seats/entities/booking_seat.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private dataSource: DataSource,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.dataSource.transaction(async (manager) => {
      const { userId, showtimeId, seatIds } = createBookingDto;

      const showtime = await manager.findOneBy(Showtime, {
        id: createBookingDto.showtimeId,
      });

      const totalPrice = showtime?.ticketPrice
        ? showtime?.ticketPrice * createBookingDto.seatIds.length
        : 0;

      const newBooking = manager.create(Booking, {
        userId,
        showtimeId,
        totalPrice,
        status: 'PENDING',
        bookingCode: `TIX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      });
      const savedBooking = await manager.save(newBooking);

      const bookingSeats = seatIds.map((seatId) => {
        return manager.create(BookingSeat, {
          bookingId: savedBooking.id,
          seatId,
          showtimeId,
        });
      });
      await manager.save(bookingSeats);

      return { message: 'Booking cretead successfully' };
    });
  }

  async findAllByUserId(userId: string): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { userId },
      select: {
        id: true,
        bookingCode: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        showtime: {
          id: true,
          startTime: true,
          movie: {
            title: true,
            poster: true,
          },
          screen: {
            name: true,
            screenType: true,
            theater: {
              name: true,
            },
          },
        },
        bookingSeats: {
          id: true,
          seat: {
            rowLabel: true,
            seatNumber: true,
          },
        },
      },
      relations: [
        'showtime',
        'showtime.movie',
        'showtime.screen',
        'showtime.screen.theater',
        'bookingSeats',
        'bookingSeats.seat',
      ],
      order: { createdAt: 'DESC' },
    });
  }
}
