import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Not, Repository } from 'typeorm';
import { Showtime } from './entities/showtime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/modules/movies/movies.service';
import { ScreensService } from 'src/modules/screens/screens.service';

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
        throw new NotFoundException('Movie not found');
      }
      newShowtime.movie = movie;
    }
    if (createShowtimeDto.screenId) {
      const screen = await this.screensService.findOne(
        createShowtimeDto.screenId,
      );
      if (!screen) {
        throw new NotFoundException('Screen not found');
      }
      newShowtime.screen = screen;
    }
    return await this.showtimeRepository.save(newShowtime);
  }

  async findAll(): Promise<Showtime[]> {
    return await this.showtimeRepository.find({
      relations: ['movie', 'screen', 'screen.theater'],
      select: {
        movie: {
          title: true,
        },
        screen: {
          name: true,
          theater: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Showtime | undefined> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: ['movie', 'screen'],
      select: {
        movie: {
          title: true,
        },
        screen: {
          name: true,
          theater: {
            name: true,
          },
        },
      },
    });
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return showtime;
  }

  async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
    });
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return await this.showtimeRepository.update(id, updateShowtimeDto);
  }

  async remove(id: string) {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
    });
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return await this.showtimeRepository.delete(id);
  }
}
