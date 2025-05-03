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
import { Component } from './entities/component.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Components')
@Controller('api/components')
export class ComponentController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The component has been successfully created.',
    type: Component,
  })
  create(@Body() component: Component): Promise<Component> {
    return this.componentsService.create(component);
  }

  @Post('bulk')
  @ApiCreatedResponse({
    description: 'The components have been successfully created.',
    type: Component,
  })
  bulkCreate(@Body() components: Component[]): Promise<Component[]> {
    return this.componentsService.bulkCreate(components);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns all components.',
    type: Component,
  })
  findAll(): Promise<Component[]> {
    return this.componentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a component by id.', type: Component })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Component> {
    return this.componentsService.findOne(id);
  }

  @Get('category/:category')
  @ApiOkResponse({
    description: 'Returns all components by category.',
    type: Component,
  })
  findByCategory(@Param('category') category: string): Promise<Component[]> {
    return this.componentsService.findByCategory(category);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Component successfully updated.',
    type: Component,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() component: Partial<Component>,
  ): Promise<Component> {
    return this.componentsService.update(id, component);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Component successfully deleted.',
    type: Component,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.componentsService.remove(id);
  }
}
