// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role.enum';

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
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
