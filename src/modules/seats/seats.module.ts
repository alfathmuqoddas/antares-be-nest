import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { ScreensModule } from '../screens/screens.module';
import { BookingSeatsModule } from '../booking_seats/booking_seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat]),
    ScreensModule,
    BookingSeatsModule,
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
