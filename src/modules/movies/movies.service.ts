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
    // Step 1: Fetch the movie
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    const currentDateTime = new Date();

    // Step 2: Fetch showtimes for the movie, joining with screen and then theater
    // Showtimes are filtered to be current or in the future.
    const showtimes = await this.showtimeRepository
      .createQueryBuilder('showtime')
      .leftJoinAndSelect('showtime.screen', 'screen') // Join with Screen
      .leftJoinAndSelect('screen.theater', 'theater') // Join Screen with Theater
      .where('showtime.movieId = :movieId', { movieId: movie.id }) // Filter by the movie ID
      // Filter showtimes to be greater than or equal to the current date and time.
      // If you want to include past showtimes, comment out the next line.
      .andWhere('showtime.startTime >= :currentDateTime', { currentDateTime })
      .orderBy('theater.name', 'ASC') // Order theaters alphabetically
      .addOrderBy('screen.screenType', 'ASC') // Then order by screen type
      .addOrderBy('showtime.startTime', 'ASC') // Then order showtimes chronologically
      .getMany(); // Execute the query

    // Step 3: Process showtimes to group them by theater and then by screenType
    const theatersMap = new Map<string, any>();

    showtimes.forEach((showtime) => {
      // Ensure screen and theater data are available (they should be due to leftJoinAndSelect)
      if (!showtime.screen || !showtime.screen.theater) {
        console.warn(
          `Skipping showtime ${showtime.id} due to missing screen or theater data.`,
        );
        return; // Skip this showtime if essential linked data is missing
      }
      const theater = showtime.screen.theater;
      const screen = showtime.screen;

      // If the theater hasn't been added to the map yet, initialize it.
      // Each theater will have a 'screenTypes' object to hold showtimes grouped by screen type.
      if (!theatersMap.has(theater.id)) {
        theatersMap.set(theater.id, {
          id: theater.id,
          name: theater.name,
          // other theater details you might want to include (e.g., address)
          // address: theater.address,
          screenTypes: {}, // This object will store showtimes grouped by screen type for this theater
        });
      }

      const theaterEntry = theatersMap.get(theater.id);
      const screenType = screen.screenType; // e.g., "2D", "3D", "IMAX"

      // If this screenType is not yet a key in the theater's screenTypes object, initialize it with an empty array.
      if (!theaterEntry.screenTypes[screenType]) {
        theaterEntry.screenTypes[screenType] = [];
      }

      // Add the current showtime details to the appropriate screenType array for the theater.
      theaterEntry.screenTypes[screenType].push({
        id: showtime.id,
        startTime: showtime.startTime,
        ticketPrice: showtime.ticketPrice,
        screen: {
          // Include screen details for this specific showtime
          id: screen.id,
          name: screen.name,
          // screen.screenType is already used for grouping, but can be included if needed
        },
        // other showtime details you might want to include (e.g., availableSeats)
      });
    });

    // Convert the map of theaters to an array
    const theaterArray = Array.from(theatersMap.values());

    // Step 4: Construct the final result object
    const result = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      releaseDate: movie.released,
      duration: movie.runtime,
      genre: movie.genre,
      rated: movie.rated,
      // other movie details you might want to include (e.g., posterUrl, director, duration)
      // posterUrl: movie.posterUrl,
      theaters: theaterArray, // The array of theaters, each with showtimes grouped by screenType
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

  async findNowPlaying(): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { nowPlaying: true },
      order: { updatedAt: 'DESC' },
    });
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
