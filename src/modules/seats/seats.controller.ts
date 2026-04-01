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
  UseGuards,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto, CreateSeatsBulkDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('api/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createSeatDto: CreateSeatDto,
  ): Promise<{ message: string }> {
    await this.seatsService.create(createSeatDto);
    return { message: 'Seat created successfully' };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSeatDto: UpdateSeatDto,
  ) {
    return await this.seatsService.update(id, updateSeatDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    await this.seatsService.remove(id);
    return { message: `Seat with id ${id} deleted` };
  }
}
