import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Showtime {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  movieId: number;

  @ApiProperty()
  @Column()
  screenId: number;

  @ApiProperty()
  @Column()
  startTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  endTime: Date;

  @ApiProperty()
  @Column()
  ticketPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
