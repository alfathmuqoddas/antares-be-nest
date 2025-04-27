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
  async create(createTheaterDto: CreateTheaterDto): Promise<void> {
    await this.theaterRepository.save(createTheaterDto);
  }

  async findAll(): Promise<Theater[]> {
    const theaters = await this.theaterRepository.find();
    return theaters;
  }

  async findOne(id: number): Promise<Theater> {
    const theater = await this.theaterRepository.findOneBy({ id });
    if (!theater) {
      throw new Error('Theater not found');
    }
    return theater;
  }

  update(id: number, updateTheaterDto: UpdateTheaterDto) {
    return `This action updates a #${id} theater`;
  }

  remove(id: number) {
    return `This action removes a #${id} theater`;
  }
}
