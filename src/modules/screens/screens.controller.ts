import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Controller('api/screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Post()
  async create(
    @Body() createScreenDto: CreateScreenDto,
  ): Promise<{ message: string }> {
    await this.screensService.create(createScreenDto);
    return { message: 'Screen created successfully' };
  }

  @Get()
  async findAll() {
    return await this.screensService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.screensService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScreenDto: UpdateScreenDto,
  ): Promise<{ message: string }> {
    this.screensService.update(id, updateScreenDto);
    return { message: 'Screen updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.screensService.remove(id);
    return { message: 'Screen removed successfully' };
  }
}
