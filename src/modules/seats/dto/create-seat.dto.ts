import { IsBoolean, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rowNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  columnNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  screenId: string;
}
