// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';

@Entity()
export class Movie {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ default: '' })
  imdbId: string;

  @ApiProperty()
  @Column({ default: '' })
  title: string;

  @ApiProperty()
  @Column({ default: '' })
  year: string;

  @ApiProperty()
  @Column({ default: '' })
  rated: string;

  @ApiProperty()
  @Column({ default: '' })
  released: string;

  @ApiProperty()
  @Column({ default: '' })
  runtime: string;

  @ApiProperty()
  @Column({ default: '' })
  genre: string;

  @ApiProperty()
  @Column({ default: '' })
  director: string;

  @ApiProperty()
  @Column({ default: '' })
  writer: string;

  @ApiProperty()
  @Column({ default: '' })
  actors: string;

  @ApiProperty()
  @Column({ default: '' })
  plot: string;

  @ApiProperty()
  @Column({ default: '' })
  language: string;

  @ApiProperty()
  @Column({ default: '' })
  country: string;

  @ApiProperty()
  @Column({ default: '' })
  awards: string;

  @ApiProperty()
  @Column({ default: '' })
  poster: string;

  @ApiProperty({ default: '' })
  imdbRating: string;

  @ApiProperty()
  @Column({ default: true })
  nowPlaying: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];
}
