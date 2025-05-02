import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Screen } from 'src/screens/entities/screen.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { Theater } from 'src/theaters/entities/theater.entity';

@Entity()
export class Showtime {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'datetime' })
  startTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  ticketPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Screen, (screen) => screen.showtimes)
  @JoinColumn({ name: 'screenId' })
  screen: Screen;

  @Column({ nullable: true })
  screenId: string;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ nullable: true })
  movieId: string;

  @ManyToOne(() => Theater, (theater) => theater.showtimes)
  @JoinColumn({ name: 'theaterId' })
  theater: Theater;

  @Column({ nullable: true })
  theaterId: string;
}
