import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Screen } from 'src/modules/screens/entities/screen.entity';
import { Movie } from 'src/modules/movies/entities/movie.entity';

@Entity()
export class Showtime {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  startTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  ticketPrice: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
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
}
