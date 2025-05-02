import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theater } from './entities/theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private theaterRepository: Repository<Theater>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const newTheater = this.theaterRepository.create(createTheaterDto);
    return this.theaterRepository.save(newTheater);
  }

  async findAll(): Promise<Theater[]> {
    return await this.theaterRepository.find({
      relations: ['showtimes', 'screens'],
      select: {
        showtimes: {
          startTime: true,
        },
        screens: {
          name: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
      relations: ['showtimes', 'screens'],
      select: {
        showtimes: {
          startTime: true,
        },
        screens: {
          name: true,
        },
      },
    });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  update(id: string, updateTheaterDto: UpdateTheaterDto) {
    return `This action updates a #${id} theater`;
  }

  remove(id: string) {
    this.theaterRepository.delete(id);
  }
}
