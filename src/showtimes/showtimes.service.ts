import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Repository } from 'typeorm';
import { Showtime } from './entities/showtime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { ScreensService } from 'src/screens/screens.service';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
    private moviesService: MoviesService,
    private screensService: ScreensService,
  ) {}

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const newShowtime = this.showtimeRepository.create(createShowtimeDto);
    if (createShowtimeDto.movieId) {
      const movie = await this.moviesService.findOne(createShowtimeDto.movieId);
      if (!movie) {
        throw new Error('Movie not found');
      }
      newShowtime.movie = movie;
    }
    if (createShowtimeDto.screenId) {
      const screen = await this.screensService.findOne(
        createShowtimeDto.screenId,
      );
      if (!screen) {
        throw new Error('Screen not found');
      }
      newShowtime.screen = screen;
    }
    return this.showtimeRepository.save(newShowtime);
  }

  async findAll(): Promise<Showtime[]> {
    const showtimes = await this.showtimeRepository.find({
      relations: ['movie', 'screen'],
    });
    return showtimes;
  }

  async findOne(id: number): Promise<Showtime | undefined> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: ['movie', 'screen'],
    });
    if (!showtime) {
      throw new Error('Showtime not found');
    }
    return showtime;
  }

  update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
    return `This action updates a #${id} showtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} showtime`;
  }
}
