import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto, MovieResponseDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';

@Injectable()
export class MoviesService {
  constructor(
    private httpService: HttpService,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
  ) {}

  async fetchMovieDataAndSave(imdbId: string): Promise<void> {
    try {
      const movie = await this.movieRepository.findOneBy({ imdbId });
      if (movie) {
        throw new ConflictException('Movie already exists');
      }
      const response = await this.httpService
        .get<MovieResponseDto>(
          `https://www.omdbapi.com/?i=${imdbId}&plot=full&apiKey=af1284eb`,
        )
        .pipe(
          map(
            (axiosResponse: AxiosResponse<MovieResponseDto>) =>
              axiosResponse.data,
          ),
          catchError((error) => {
            console.error('Error fetching movie data', error);
            return of(null);
          }),
        )
        .toPromise();

      if (response) {
        const movie = new Movie();
        movie.imdbId = response.imdbID;
        movie.title = response.Title;
        movie.year = response.Year;
        movie.rated = response.Rated;
        movie.released = response.Released;
        movie.runtime = response.Runtime;
        movie.genre = response.Genre;
        movie.director = response.Director;
        movie.writer = response.Writer;
        movie.actors = response.Actors;
        movie.plot = response.Plot;
        movie.language = response.Language;
        movie.country = response.Country;
        movie.awards = response.Awards;
        movie.poster = response.Poster;
        movie.imdbRating = response.imdbRating;
        await this.movieRepository.save(movie);
      } else {
        throw new NotFoundException('Movie not found');
      }
    } catch (error) {
      throw new Error('Unexpected error fetching movie data');
    }
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(newMovie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  //

  async findOneWithShowtimes(id: string): Promise<any> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    const currentDateTime = new Date();

    const showtimes = await this.showtimeRepository
      .createQueryBuilder('showtime')
      .leftJoinAndSelect('showtime.screen', 'screen')
      .leftJoinAndSelect('screen.theater', 'theater')
      .where('showtime.movieId = :movieId', { movieId: movie.id })
      .andWhere('showtime.startTime >= :currentDateTime', { currentDateTime })
      .orderBy('theater.name', 'ASC') // Optional: Order theaters alphabetically
      .addOrderBy('showtime.startTime', 'ASC') // Optional: Order showtimes chronologically
      .getMany();

    const theatersMap = new Map<string, any>();

    showtimes.forEach((showtime) => {
      const theater = showtime.screen.theater;
      const screen = showtime.screen;

      // If the theater hasn't been added to the map yet, initialize it
      if (!theatersMap.has(theater.id)) {
        theatersMap.set(theater.id, {
          id: theater.id,
          name: theater.name,
          showtimes: [], // Initialize showtimes array for this theater
        });
      }

      theatersMap.get(theater.id).showtimes.push({
        id: showtime.id,
        startTime: showtime.startTime,
        ticketPrice: showtime.ticketPrice,
        screen: {
          // Include screen details
          id: screen.id,
          name: screen.name,
        },
      });
    });

    const theaterArray = Array.from(theatersMap.values());

    const result = {
      id: movie.id,
      title: movie.title,
      theaters: theaterArray,
    };

    return result;
  }

  async findOneByImdbId(imdbId: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { imdbId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    // Update the movie entity with the values from the DTO
    Object.assign(movie, updateMovieDto);

    // Save the updated movie entity
    return await this.movieRepository.save(movie);
  }

  async remove(imdbId: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { imdbId } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return await this.movieRepository.remove(movie);
  }
}
