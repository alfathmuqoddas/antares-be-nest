import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Post()
  async create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return await this.showtimesService.create(createShowtimeDto);
  }

  @Get()
  async findAll() {
    return await this.showtimesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.showtimesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShowtimeDto: UpdateShowtimeDto,
  ) {
    return await this.showtimesService.update(+id, updateShowtimeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.showtimesService.remove(+id);
  }
}
