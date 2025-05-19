import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    return await this.seatRepository.save(createSeatDto);
  }

  async findAll(): Promise<Seat[]> {
    return await this.seatRepository.find();
  }

  async findOne(id: string): Promise<Seat> {
    const seat = await this.seatRepository.findOne({ where: { id } });
    if (!seat) {
      throw new NotFoundException('Seat not found');
    }
    return seat;
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
