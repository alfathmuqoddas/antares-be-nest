// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Movie {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  imdbId: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  year: string;

  @ApiProperty()
  @Column()
  rated: string;

  @ApiProperty()
  @Column()
  released: string;

  @ApiProperty()
  @Column({ nullable: true })
  runtime: string;

  @ApiProperty()
  @Column()
  genre: string;

  @ApiProperty()
  @Column({ nullable: true })
  director: string;

  @ApiProperty()
  @Column({ nullable: true })
  writer: string;

  @ApiProperty()
  @Column({ nullable: true })
  actors: string;

  @ApiProperty()
  @Column('text')
  plot: string;

  @ApiProperty()
  @Column()
  language: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  awards: string;

  @ApiProperty()
  @Column()
  poster: string;

  @ApiProperty()
  imdbRating: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
