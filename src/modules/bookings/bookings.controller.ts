import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../users/user.decorator';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingsService.create(createBookingDto);
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard)
  async getMyBookings(@GetUser('userId') userId: string) {
    return await this.bookingsService.findAllByUserId(userId);
  }
}
