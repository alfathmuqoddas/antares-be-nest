import { IsDate, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowtimeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  movieId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty()
  @IsDate()
  endTime: Date;

  @ApiProperty()
  @IsNumber()
  ticketPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  screenId: string;
}
