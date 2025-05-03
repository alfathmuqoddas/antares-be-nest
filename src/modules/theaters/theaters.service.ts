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
    });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  // async findOneWithShowtimes(id: string): Promise<Theater> {
  //   const theater = await this.theaterRepository
  //     .createQueryBuilder('theater') // Start with the main entity alias
  //     .leftJoinAndSelect('theater.screens', 'screen') // Join and select screens
  //     .leftJoinAndSelect('screen.showtimes', 'showtime') // Join and select showtimes from screens
  //     .leftJoinAndSelect('showtime.movie', 'movie') // Join and select movies from showtimes
  //     .select([
  //       // Explicitly select all columns you need from each level
  //       'theater.id', // Always select IDs for proper hydration
  //       'theater.name', // Select other theater columns
  //       'screen.id',
  //       'screen.name', // Select screen columns
  //       'showtime.id',
  //       'showtime.startTime', // Select showtime columns
  //       'movie.id',
  //       'movie.title', // Select movie columns
  //     ])
  //     .where('theater.id = :id', { id }) // Filter by theater ID
  //     .getOne(); // Get a single result

  //   if (!theater) {
  //     throw new NotFoundException(`Theater with ID "${id}" not found`);
  //   }

  //   return theater;
  // }

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
      .andWhere('showtime.startTime >= :currentDateTime', { currentDateTime })
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

  update(id: string, updateTheaterDto: UpdateTheaterDto) {
    return `This action updates a #${id} theater`;
  }

  remove(id: string) {
    this.theaterRepository.delete(id);
  }
}
