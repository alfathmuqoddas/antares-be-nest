import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Screen } from '../../screens/entities/screen.entity';

@Entity()
export class Theater {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Index()
  slug: string;

  @ApiProperty()
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  state: string;

  @ApiProperty()
  @Column({ nullable: true })
  zip: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Screen, (screen) => screen.theater)
  screens: Screen[];
}
