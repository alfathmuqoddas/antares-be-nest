import { Injectable } from '@nestjs/common';
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
      relations: ['screens'],
    });
  }

  async findOne(id: number): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
      relations: ['screens'],
    });
    if (!theater) {
      throw new Error('Theater not found');
    }
    return theater;
  }

  update(id: number, updateTheaterDto: UpdateTheaterDto) {
    return `This action updates a #${id} theater`;
  }

  remove(id: number) {
    this.theaterRepository.delete(id);
  }
}
