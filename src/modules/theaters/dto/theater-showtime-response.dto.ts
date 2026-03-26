// src/theaters/dto/theater-with-showtimes.dto.ts

import { Expose } from 'class-transformer';

export class ShowtimeResponseDto {
  @Expose()
  id: string;

  @Expose()
  startTime: Date;

  @Expose()
  ticketPrice: number;

  @Expose()
  screen: {
    id: number;
    name: string;
  };
}

export class MovieWithShowtimesDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  poster: string;

  @Expose()
  releaseDate: Date | string;

  @Expose()
  duration: number;

  @Expose()
  genre: string;

  @Expose()
  rated: string;

  @Expose()
  screenTypes: Record<string, ShowtimeResponseDto[]>;
}

export class TheaterWithShowtimesDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  movies: MovieWithShowtimesDto[];
}
