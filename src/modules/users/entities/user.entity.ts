import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/modules/bookings/entities/booking.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column() // Password should not be exposed in API docs
  password?: string; // Make it optional for create/update DTOs

  @ApiProperty()
  @Column({ nullable: true })
  roles: string;

  @ApiProperty()
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
