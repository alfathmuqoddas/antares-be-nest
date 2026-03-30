import { Module } from '@nestjs/common';
import { BookingSeatsService } from './booking_seats.service';
import { BookingSeatsController } from './booking_seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSeat } from './entities/booking_seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingSeat])],
  controllers: [BookingSeatsController],
  providers: [BookingSeatsService],
  exports: [BookingSeatsService],
})
export class BookingSeatsModule {}
