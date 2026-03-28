import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { ScreensModule } from '../screens/screens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), ScreensModule],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
