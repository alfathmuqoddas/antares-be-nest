import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theater } from './entities/theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private theaterRepository: Repository<Theater>,

    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const newTheater = this.theaterRepository.create(createTheaterDto);
    return this.theaterRepository.save(newTheater);
  }

  async findAll(): Promise<Theater[]> {
    return await this.theaterRepository.find();
  }

  async findOne(id: string): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
      relations: ['screens'],
    });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  async findOneWithShowtimes(id: string): Promise<any> {
    const theater = await this.theaterRepository.findOne({
      where: { id },
    });

    if (!theater) {
      throw new NotFoundException(`Theater with ID "${id}" not found`);
    }

    const currentDateTime = new Date();

    const showtimes = await this.showtimeRepository
      .createQueryBuilder('showtime')
      .leftJoinAndSelect('showtime.screen', 'screen') // Join with Screen
      .leftJoinAndSelect('showtime.movie', 'movie') // Join with Movie
      .where('screen.theaterId = :theaterId', { theaterId: theater.id }) // Filter by the theater
      // Add the condition to filter showtimes by startTime >= currentDateTime
      // .andWhere('showtime.startTime >= :currentDateTime', { currentDateTime })
      .orderBy('movie.title', 'ASC') // Optional: Order movies by title
      .addOrderBy('showtime.startTime', 'ASC') // Optional: Order showtimes by start time
      .getMany(); // Execute the

    const moviesMap = new Map<string, any>();

    showtimes.forEach((showtime) => {
      const movie = showtime.movie;
      const screen = showtime.screen;

      if (!moviesMap.has(movie.id)) {
        moviesMap.set(movie.id, {
          id: movie.id,
          title: movie.title,
          showtimes: [],
        });
      }

      moviesMap.get(movie.id).showtimes.push({
        id: showtime.id,
        startTime: showtime.startTime,
        ticketPrice: showtime.ticketPrice,
        screen: {
          id: screen.id,
          name: screen.name,
        },
      });
    });

    const movieArray = Array.from(moviesMap.values());

    const result = {
      id: theater.id,
      name: theater.name,
      movies: movieArray,
    };

    return result;
  }

  async update(id: string, updateTheaterDto: UpdateTheaterDto) {
    const theater = await this.theaterRepository.findOne({ where: { id } });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    Object.assign(theater, updateTheaterDto);
    return await this.theaterRepository.save(theater);
  }

  async remove(id: string) {
    const theater = await this.theaterRepository.findOne({ where: { id } });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return await this.theaterRepository.delete(id);
  }
}
