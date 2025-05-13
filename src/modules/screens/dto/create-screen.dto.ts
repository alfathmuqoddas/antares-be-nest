import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScreenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  screenType: string;

  @ApiProperty()
  layoutDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  theaterId: string;
}
