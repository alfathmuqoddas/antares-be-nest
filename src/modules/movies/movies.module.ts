import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { HttpModule } from '@nestjs/axios';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';
import { SlugifyModule } from '../slugify/slugify.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Showtime]),
    HttpModule,
    SlugifyModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
