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
    return await this.theaterRepository.find();
  }

  // async findAll(): Promise<Theater[]> {
  //   return await this.theaterRepository.find({
  //     relations: ['screens', 'screens.showtimes', 'screens.showtimes.movie'],
  //     select: {
  //       screens: {
  //         name: true,
  //         showtimes: {
  //           startTime: true,
  //           movie: {
  //             title: true,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  async findOne(id: string): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
      // relations: ['screens', 'screens.showtimes', 'screens.showtimes.movie'],
      // select: {
      //   screens: {
      //     name: true,
      //     showtimes: {
      //       startTime: true,
      //       movie: {
      //         title: true,
      //       },
      //     },
      //   },
      // },
    });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  async findOneWithShowtimes(id: string): Promise<Theater> {
    const theater = await this.theaterRepository
      .createQueryBuilder('theater') // Start with the main entity alias
      .leftJoinAndSelect('theater.screens', 'screen') // Join and select screens
      .leftJoinAndSelect('screen.showtimes', 'showtime') // Join and select showtimes from screens
      .leftJoinAndSelect('showtime.movie', 'movie') // Join and select movies from showtimes
      .select([
        // Explicitly select all columns you need from each level
        'theater.id', // Always select IDs for proper hydration
        'theater.name', // Select other theater columns
        'screen.id',
        'screen.name', // Select screen columns
        'showtime.id',
        'showtime.startTime', // Select showtime columns
        'movie.id',
        'movie.title', // Select movie columns
      ])
      .where('theater.id = :id', { id }) // Filter by theater ID
      .getOne(); // Get a single result

    if (!theater) {
      throw new NotFoundException(`Theater with ID "${id}" not found`);
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
