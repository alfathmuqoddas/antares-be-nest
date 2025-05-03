import { Injectable } from '@nestjs/common';
import { CreateBookingSeatDto } from './dto/create-booking_seat.dto';
import { UpdateBookingSeatDto } from './dto/update-booking_seat.dto';

@Injectable()
export class BookingSeatsService {
  create(createBookingSeatDto: CreateBookingSeatDto) {
    return 'This action adds a new bookingSeat';
  }

  findAll() {
    return `This action returns all bookingSeats`;
  }

  findOne(id: string) {
    return `This action returns a #${id} bookingSeat`;
  }

  update(id: string, updateBookingSeatDto: UpdateBookingSeatDto) {
    return `This action updates a #${id} bookingSeat`;
  }

  remove(id: string) {
    return `This action removes a #${id} bookingSeat`;
  }
}
