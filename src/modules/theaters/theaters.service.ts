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
    // Step 1: Fetch the theater
    const theater = await this.theaterRepository.findOne({
      where: { id },
    });

    if (!theater) {
      throw new NotFoundException(`Theater with ID "${id}" not found`);
    }

    const currentDateTime = new Date();

    // Step 2: Fetch showtimes for the theater, joining with screen and movie
    // The showtimes are filtered to include only those that are current or in the future.
    const showtimes = await this.showtimeRepository
      .createQueryBuilder('showtime')
      .leftJoinAndSelect('showtime.screen', 'screen') // Join with Screen
      .leftJoinAndSelect('showtime.movie', 'movie') // Join with Movie
      .where('screen.theaterId = :theaterId', { theaterId: theater.id }) // Filter by the theater
      // Filter showtimes to be greater than or equal to the current date and time.
      // If you want to include past showtimes, comment out the next line.
      .andWhere('showtime.startTime >= :currentDateTime', { currentDateTime })
      .orderBy('movie.title', 'ASC') // Order movies by title
      .addOrderBy('showtime.startTime', 'ASC') // Then order showtimes by start time
      .getMany(); // Execute the query

    // Step 3: Process showtimes to group them by movie and then by screenType
    const moviesMap = new Map<string, any>();

    showtimes.forEach((showtime) => {
      const movie = showtime.movie;
      const screen = showtime.screen;

      // If the movie is not yet in our map, add it.
      // Each movie will have a 'screenTypes' object to hold showtimes grouped by screen type.
      if (!moviesMap.has(movie.id)) {
        moviesMap.set(movie.id, {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          // other movie details you might want to include (e.g., posterUrl, duration)
          // director: movie.director,
          // releaseDate: movie.releaseDate,
          screenTypes: {}, // This object will store showtimes grouped by screen type
        });
      }

      const movieEntry = moviesMap.get(movie.id);
      const screenType = screen.screenType; // e.g., "2D", "3D", "IMAX"

      // If this screenType is not yet a key in the movie's screenTypes object, initialize it with an empty array.
      if (!movieEntry.screenTypes[screenType]) {
        movieEntry.screenTypes[screenType] = [];
      }

      // Add the current showtime details to the appropriate screenType array for the movie.
      movieEntry.screenTypes[screenType].push({
        id: showtime.id,
        startTime: showtime.startTime,
        ticketPrice: showtime.ticketPrice,
        screen: {
          // Include screen details for this specific showtime
          id: screen.id,
          name: screen.name,
          // screen.screenType is already used for grouping, but you can include it here if needed
        },
        // other showtime details you might want to include (e.g., availableSeats)
      });
    });

    // Convert the map of movies to an array
    const movieArray = Array.from(moviesMap.values());

    // Step 4: Construct the final result object
    const result = {
      id: theater.id,
      name: theater.name,
      // other theater details you might want to include (e.g., address, phone)
      // address: theater.address,
      movies: movieArray, // The array of movies, each with showtimes grouped by screenType
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
