import { Injectable } from '@nestjs/common';
import { CreateSeatDto, CreateSeatsBulkDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { ScreensService } from '../screens/screens.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    private screenService: ScreensService,
  ) {}

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    return await this.seatRepository.save(createSeatDto);
  }

  async createManySeats(payload: CreateSeatsBulkDto) {
    const { seats, screenId } = payload;
    const screen = await this.screenService.findOne(screenId);
    if (!screen) {
      throw new NotFoundException('Screen not found');
    }

    const seatToSave = seats.map((seat) => {
      return {
        ...seat,
        screenId,
      };
    });

    return await this.seatRepository.save(seatToSave);
  }

  async findAll(): Promise<Seat[]> {
    return await this.seatRepository.find();
  }

  async findOne(id: string): Promise<Seat> {
    const seat = await this.seatRepository.findOne({
      where: { id },
      relations: ['screen'],
    });
    if (!seat) {
      throw new NotFoundException('Seat not found');
    }
    return seat;
  }

  async findByScreenId(screenId: string): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { screenId },
    });
  }

  async update(id: string, updateSeatDto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.seatRepository.findOne({ where: { id } });
    if (!seat) {
      throw new NotFoundException('Seat not found');
    }
    this.seatRepository.merge(seat, updateSeatDto);
    return await this.seatRepository.save(seat);
  }

  async remove(id: string): Promise<void> {
    await this.seatRepository.delete(id);
  }
}
