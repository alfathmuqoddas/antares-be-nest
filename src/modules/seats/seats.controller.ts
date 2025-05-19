import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  async create(@Body() createSeatDto: CreateSeatDto) {
    return await this.seatsService.create(createSeatDto);
  }

  @Get()
  async findAll() {
    return await this.seatsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.seatsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSeatDto: UpdateSeatDto,
  ) {
    return await this.seatsService.update(id, updateSeatDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    await this.seatsService.remove(id);
    return { message: `Seat with id ${id} deleted` };
  }
}
