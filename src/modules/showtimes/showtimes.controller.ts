import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Showtime } from './entities/showtime.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { maxDate } from 'class-validator';

@Controller('api/showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createShowtimeDto: CreateShowtimeDto,
  ): Promise<{ message: string }> {
    await this.showtimesService.create(createShowtimeDto);
    return { message: 'Showtime created successfully' };
  }

  @Get()
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Showtime | undefined> {
    return await this.showtimesService.findOne(id);
  }

  @Get('theater/:theaterId')
  async findByTheaterId(
    @Param('theaterId') theaterId: string,
  ): Promise<Showtime[]> {
    return await this.showtimesService.findByTheaterId(theaterId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin/:theaterId')
  async findByTheaterIdForAdmin(
    @Param('theaterId') theaterId: string,
    @Query('limit') limit?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('minDate') minDate?: string,
    @Query('maxDate') maxDate?: string,
    @Query('screenId') screenId?: string,
    @Query('movieId') movieId?: string,
  ): Promise<{ showtimes: Showtime[]; hasMore: boolean }> {
    return await this.showtimesService.findByTheaterIdForAdmin(
      theaterId,
      limit,
      order,
      minDate,
      maxDate,
      screenId,
      movieId,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShowtimeDto: UpdateShowtimeDto,
  ): Promise<{ message: string }> {
    await this.showtimesService.update(id, updateShowtimeDto);
    return { message: 'Showtime updated successfully' };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.showtimesService.remove(id);
    return { message: 'Showtime removed successfully' };
  }
}
