import { Expose } from 'class-transformer';

export class ShowtimeInTheaterDto {
  @Expose()
  id: string;

  @Expose()
  startTime: Date;

  @Expose()
  ticketPrice: number;

  @Expose()
  screen: {
    id: string;
    name: string;
  };
}

export class TheaterWithShowtimesForMovieDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  screenTypes: Record<string, ShowtimeInTheaterDto[]>;
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
  duration: string;

  @Expose()
  genre: string;

  @Expose()
  rated: string;

  @Expose()
  theaters: TheaterWithShowtimesForMovieDto[];
}
