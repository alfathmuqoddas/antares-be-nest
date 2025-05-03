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

@Injectable()
export class MoviesService {
  constructor(
    private httpService: HttpService,

    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
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

  // async findAll(): Promise<Movie[]> {
  //   return await this.movieRepository.find({
  //     relations: ['showtimes', 'showtimes.screen', 'showtimes.screen.theater'],
  //     select: {
  //       showtimes: {
  //         startTime: true,
  //         screen: {
  //           name: true,
  //           theater: {
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      // relations: ['showtimes', 'showtimes.screen', 'showtimes.screen.theater'],
      // select: {
      //   showtimes: {
      //     startTime: true,
      //     screen: {
      //       name: true,
      //       theater: {
      //         name: true,
      //       },
      //     },
      //   },
      // },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async findOneWithShowtimes(id: string): Promise<Movie> {
    const movie = await this.movieRepository
      .createQueryBuilder('movie') // Start with the main entity alias
      .leftJoinAndSelect('movie.showtimes', 'showtime') // Join and select showtimes (the OneToMany collection)
      .leftJoinAndSelect('showtime.screen', 'screen') // Join and select screen from showtimes
      .leftJoinAndSelect('screen.theater', 'theater') // Join and select theater from screen
      .select([
        // Explicitly select all columns you need from each level
        'movie.id', // Always select IDs for proper hydration
        'movie.title', // Select other movie columns (like title, releaseDate, etc.)
        // Add other movie columns you want here
        'showtime.id', // Select showtime columns
        'showtime.startTime',
        // Add other showtime columns if needed
        'screen.id', // Select screen columns
        'screen.name',
        // Add other screen columns if needed
        'theater.id', // Select theater columns
        'theater.name',
        // Add other theater columns if needed
      ])
      .where('movie.id = :id', { id }) // Filter by movie ID
      .getOne(); // Get a single result

    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    // The movie object returned by getOne() will now have the full graph
    // movie.showtimes will contain ALL showtimes for this movie,
    // and each showtime will have its screen and theater attached.
    return movie;
  }

  async findOneByImdbId(imdbId: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { imdbId },
      relations: ['showtimes'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(imdbId: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { imdbId } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return await this.movieRepository.remove(movie);
  }
}
