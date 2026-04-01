import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Repository, Between } from 'typeorm';
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

  async findByTheaterId(theaterId: string): Promise<Showtime[]> {
    return await this.showtimeRepository.find({
      where: { screen: { theaterId } },
      relations: ['movie', 'screen'],
      take: 30,
      order: { createdAt: 'DESC' },
      select: {
        movie: {
          title: true,
        },
        screen: {
          name: true,
          screenType: true,
          theater: {
            name: true,
          },
        },
      },
    });
  }

  async findByTheaterIdForAdmin(
    theaterId: string,
    limit: number | string = 20,
    order: 'asc' | 'desc' = 'asc',
    minDate?: string,
    maxDate?: string,
    screenId?: string,
    movieId?: string,
  ): Promise<{ showtimes: Showtime[]; hasMore: boolean }> {
    if (!theaterId) throw new BadRequestException('theaterId is required');

    const take = Math.min(Math.max(1, Number(limit) || 20), 100);

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    let startDate: Date;
    let endDate: Date;

    if (minDate) {
      startDate = new Date(minDate);
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate = todayStart; // Default: today as minDate
    }

    if (maxDate) {
      endDate = new Date(maxDate);
      endDate.setHours(23, 59, 59, 999);
    } else {
      // If no maxDate, set it to a reasonable far future (e.g. 1 year from now)
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const where: any = {
      screen: { theaterId },
      startTime: Between(startDate, endDate),
    };

    if (screenId) where.screenId = screenId;
    if (movieId) where.movieId = movieId;

    const [showtimes, total] = await this.showtimeRepository.findAndCount({
      where,
      order: {
        startTime: 'ASC',
        id: order === 'desc' ? 'DESC' : 'ASC',
      },
      take,
      relations: ['movie', 'screen'],
      select: {
        movie: {
          title: true,
        },
        screen: {
          name: true,
          screenType: true,
          theater: {
            name: true,
          },
        },
      },
    });

    const hasMore = total > take;

    return {
      showtimes,
      hasMore,
    };
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

  async remove(id: string): Promise<void> {
    await this.showtimeRepository.delete(id);
  }
}
