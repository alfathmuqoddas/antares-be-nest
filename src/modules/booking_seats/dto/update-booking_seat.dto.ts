import { PartialType } from '@nestjs/swagger';
import { CreateBookingSeatDto } from './create-booking_seat.dto';

export class UpdateBookingSeatDto extends PartialType(CreateBookingSeatDto) {}
