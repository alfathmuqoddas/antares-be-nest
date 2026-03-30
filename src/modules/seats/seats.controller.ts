import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto, CreateSeatsBulkDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('api/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  async create(
    @Body() createSeatDto: CreateSeatDto,
  ): Promise<{ message: string }> {
    await this.seatsService.create(createSeatDto);
    return { message: 'Seat created successfully' };
  }

  @Post('bulk')
  async createMany(
    @Body() createSeatsBulkDto: CreateSeatsBulkDto,
  ): Promise<{ message: string }> {
    await this.seatsService.createManySeats(createSeatsBulkDto);
    return { message: 'Seats created successfully' };
  }

  @Get()
  async findAll() {
    return await this.seatsService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: string) {
  //   return await this.seatsService.findOne(id);
  // }

  @Get('byScreenId/:screenId')
  async findByScreenId(@Param('screenId') screenId: string) {
    return await this.seatsService.findByScreenId(screenId);
  }

  @Get('availableSeats')
  async findAvailableSeats(
    @Query('showtimeId') showtimeId: string,
    @Query('screenId') screenId: string,
  ) {
    return await this.seatsService.findAvailableSeats(screenId, showtimeId);
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
