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
import { Theater } from 'src/theaters/entities/theater.entity';

@Entity()
export class Screen {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  capacity: number;

  @ApiProperty()
  @Column()
  layoutDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Theater, (theater) => theater.screens)
  @JoinColumn({ name: 'theaterId' })
  theater: Theater;

  @Column({ nullable: true })
  theaterId: number;
}
