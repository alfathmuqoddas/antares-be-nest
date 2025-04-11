import {
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { Component } from './components.entity';

@Controller('api/components')
export class ComponentController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  create(@Body() component: Component): Promise<Component> {
    return this.componentsService.create(component);
  }

  @Post('bulk')
  bulkCreate(@Body() components: Component[]): Promise<Component[]> {
    return this.componentsService.bulkCreate(components);
  }

  @Get()
  findAll(): Promise<Component[]> {
    return this.componentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Component> {
    return this.componentsService.findOne(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Promise<Component[]> {
    return this.componentsService.findByCategory(category);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() component: Partial<Component>,
  ): Promise<Component> {
    return this.componentsService.update(id, component);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.componentsService.remove(id);
  }
}
