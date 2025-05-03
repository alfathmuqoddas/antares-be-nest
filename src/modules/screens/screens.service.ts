import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { Repository } from 'typeorm';
import { Screen } from './entities/screen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TheatersService } from 'src/modules/theaters/theaters.service';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private screenRepository: Repository<Screen>,
    private theatersService: TheatersService,
  ) {}
  async create(createScreenDto: CreateScreenDto): Promise<Screen> {
    const newScreen = this.screenRepository.create(createScreenDto);
    if (createScreenDto.theaterId) {
      const theater = await this.theatersService.findOne(
        createScreenDto.theaterId,
      );
      if (!theater) {
        throw new NotFoundException('Theater not found');
      }
      newScreen.theater = theater;
    }
    return await this.screenRepository.save(newScreen);
  }

  async findAll(): Promise<Screen[]> {
    return await this.screenRepository.find({
      relations: ['theater', 'showtimes'],
      select: {
        theater: {
          name: true,
        },
        showtimes: {
          startTime: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Screen | undefined> {
    const screen = await this.screenRepository.findOne({
      where: { id },
      relations: ['theater', 'showtimes'],
      select: {
        theater: {
          name: true,
        },
        showtimes: {
          startTime: true,
        },
      },
    });
    if (!screen) {
      throw new NotFoundException('Screen not found');
    }
    return screen;
  }

  update(id: string, updateScreenDto: UpdateScreenDto) {
    return `This action updates a #${id} screen`;
  }

  remove(id: string) {
    return `This action removes a #${id} screen`;
  }
}
