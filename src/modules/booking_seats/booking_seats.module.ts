import { Module } from '@nestjs/common';
import { BookingSeatsService } from './booking_seats.service';
import { BookingSeatsController } from './booking_seats.controller';

@Module({
  controllers: [BookingSeatsController],
  providers: [BookingSeatsService],
})
export class BookingSeatsModule {}
