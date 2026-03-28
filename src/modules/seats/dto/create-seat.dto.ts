import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeatDto {
  @IsInt()
  @Min(0)
  gridRow: number;

  @IsInt()
  @Min(0)
  gridCol: number;

  @IsOptional()
  @IsString()
  rowLabel: string | null;

  @IsOptional()
  @IsInt()
  seatNumber: number | null;

  @IsNotEmpty()
  @IsEnum(['available', 'unavailable'])
  status: 'available' | 'unavailable';

  @IsNotEmpty()
  @IsEnum(['seat', 'aisle', 'gap'])
  type: 'seat' | 'aisle' | 'gap';
}

// 2. DTO for the POST body
export class CreateSeatsBulkDto {
  @IsUUID()
  screenId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSeatDto)
  seats: CreateSeatDto[];
}
