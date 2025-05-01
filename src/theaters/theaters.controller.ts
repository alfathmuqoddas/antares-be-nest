import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { Theater } from './entities/theater.entity';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Theaters')
@Controller('api/theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The theater has been successfully created.',
    type: TheatersController,
  })
  async create(
    @Body() createTheaterDto: CreateTheaterDto,
  ): Promise<{ message: string }> {
    this.theatersService.create(createTheaterDto);
    return { message: 'Theater created successfully' };
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns all theaters.',
    type: Theater,
  })
  async findAll(): Promise<Theater[]> {
    return await this.theatersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a theater by id.', type: Theater })
  async findOne(@Param('id') id: string): Promise<Theater> {
    return await this.theatersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Theater successfully updated.',
    type: Theater,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTheaterDto: UpdateTheaterDto,
  ) {
    return await this.theatersService.update(id, updateTheaterDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Theater successfully deleted.',
    type: Theater,
  })
  async remove(@Param('id') id: string) {
    return await this.theatersService.remove(id);
  }
}
