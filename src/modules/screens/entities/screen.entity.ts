import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Theater } from 'src/modules/theaters/entities/theater.entity';
import { Showtime } from 'src/modules/showtimes/entities/showtime.entity';
import { Seat } from 'src/modules/seats/entities/seat.entity';

@Entity()
export class Screen {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: 'regular' })
  screenType: string;

  @ApiProperty()
  @Column()
  capacity: number;

  @ApiProperty()
  @Column({ default: 0 })
  ticketPrice: number;

  @ApiProperty()
  @Column({ nullable: true })
  layoutDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Showtime, (showtime) => showtime.screen)
  showtimes: Showtime[];

  @ManyToOne(() => Theater, (theater) => theater.screens)
  @JoinColumn({ name: 'theaterId' })
  theater: Theater;

  @Column({ nullable: true })
  theaterId: string;

  @OneToMany(() => Seat, (seat) => seat.screen)
  seats: Seat[];
}
