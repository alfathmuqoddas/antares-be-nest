import { Injectable, NotFoundException } from '@nestjs/common';
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
        return;
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
        console.log('Movie data saved successfully');
      } else {
        console.log('No movie data found');
      }
    } catch (error) {
      console.error('Unexpected error fetching movie data', error);
      throw error;
    }
  }

  async create(createMovieDto: CreateMovieDto) {
    await this.movieRepository.save(createMovieDto);
    return createMovieDto;
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({
      relations: ['showtimes'],
    });
    return movies;
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['showtimes'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
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

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
