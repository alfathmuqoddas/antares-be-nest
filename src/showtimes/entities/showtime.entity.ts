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

@Entity()
export class Showtime {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  startTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  endTime: Date;

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
  screenId: number;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ nullable: true })
  movieId: number;
}
