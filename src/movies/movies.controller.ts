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
import { Movie } from './entities/movie.entity';
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
  async fetchMovieData(
    @Body() body: { imdbId: string },
  ): Promise<{ message: string }> {
    await this.moviesService.fetchMovieDataAndSave(body.imdbId);
    return { message: 'Movie data successfully fetched and saved' };
  }

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<{ message: string }> {
    await this.moviesService.create(createMovieDto);
    return { message: 'Movie created successfully' };
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.findOne(id);
  }

  @Get('imdbId/:imdbId')
  async findOneByImdbId(@Param('imdbId') imdbId: string): Promise<Movie> {
    return await this.moviesService.findOneByImdbId(imdbId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<{ message: string }> {
    await this.moviesService.update(id, updateMovieDto);
    return { message: 'Movie updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.moviesService.remove(id);
    return { message: 'Movie removed successfully' };
  }
}
