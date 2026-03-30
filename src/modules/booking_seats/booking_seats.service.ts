import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateBookingSeatDto } from './dto/create-booking_seat.dto';
import { UpdateBookingSeatDto } from './dto/update-booking_seat.dto';
import { BookingSeat } from './entities/booking_seat.entity';

@Injectable()
export class BookingSeatsService {
  constructor(
    @InjectRepository(BookingSeat)
    private bookingSeatRepository: Repository<BookingSeat>,
  ) {}

  create(createBookingSeatDto: CreateBookingSeatDto) {
    return 'This action adds a new bookingSeat';
  }

  findAll() {
    return `This action returns all bookingSeats`;
  }

  findOne(id: string) {
    return `This action returns a #${id} bookingSeat`;
  }

  async findAllBookedSeatsByShowtimeId(showtimeId: string) {
    const bookedSeats = await this.bookingSeatRepository.find({
      where: { showtimeId, booking: { status: In(['PAID', 'PENDING']) } },
      relations: ['booking'],
      select: { seatId: true },
    });

    return bookedSeats.map((b) => b.seatId);
  }

  update(id: string, updateBookingSeatDto: UpdateBookingSeatDto) {
    return `This action updates a #${id} bookingSeat`;
  }

  remove(id: string) {
    return `This action removes a #${id} bookingSeat`;
  }
}
