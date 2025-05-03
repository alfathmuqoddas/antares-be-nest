import { Test, TestingModule } from '@nestjs/testing';
import { BookingSeatsController } from './booking_seats.controller';
import { BookingSeatsService } from './booking_seats.service';

describe('BookingSeatsController', () => {
  let controller: BookingSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingSeatsController],
      providers: [BookingSeatsService],
    }).compile();

    controller = module.get<BookingSeatsController>(BookingSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
