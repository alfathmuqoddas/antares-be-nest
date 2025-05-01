import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('fetch-movie-data')
  @ApiCreatedResponse({
    description: 'Movie data successfully fetched.',
    type: MoviesController,
  })
  async fetchMovieData(@Body() body: { imdbId: string }) {
    return await this.moviesService.fetchMovieDataAndSave(body.imdbId);
  }

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<{ message: string }> {
    this.moviesService.create(createMovieDto);
    return { message: 'Movie created successfully' };
  }

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(+id);
  }

  @Get('imdbId/:imdbId')
  async findOneByImdbId(@Param('imdbId') imdbId: string) {
    return await this.moviesService.findOneByImdbId(imdbId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.moviesService.remove(id);
    return { message: 'Movie removed successfully' };
  }
}
