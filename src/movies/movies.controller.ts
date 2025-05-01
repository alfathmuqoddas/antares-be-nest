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
  fetchMovieData(@Body() body: { imdbId: string }) {
    return this.moviesService.fetchMovieDataAndSave(body.imdbId);
  }

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<{ message: string }> {
    this.moviesService.create(createMovieDto);
    return { message: 'Movie created successfully' };
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Get('imdbId/:imdbId')
  findOneByImdbId(@Param('imdbId') imdbId: string) {
    return this.moviesService.findOneByImdbId(imdbId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
