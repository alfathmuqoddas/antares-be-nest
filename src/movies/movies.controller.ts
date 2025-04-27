import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
    return { message: 'Movie data fetched and saved successfully' };
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
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
    return this.moviesService.remove(+id);
  }
}
