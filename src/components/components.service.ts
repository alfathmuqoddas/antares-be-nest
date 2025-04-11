import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from './components.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentsRepository: Repository<Component>,
  ) {}

  async create(component: Component): Promise<Component> {
    return this.componentsRepository.save(component);
  }

  async bulkCreate(components: Component[]): Promise<Component[]> {
    return this.componentsRepository.save(components);
  }

  async findAll(): Promise<Component[]> {
    return this.componentsRepository.find();
  }

  async findOne(id: number): Promise<Component> {
    const component = await this.componentsRepository.findOneBy({ id });

    if (!component) {
      throw new NotFoundException(`Component with id ${id} not found`);
    }
    return component;
  }

  async findByCategory(category: string): Promise<Component[]> {
    return this.componentsRepository.findBy({ category });
  }

  async update(id: number, component: Partial<Component>): Promise<Component> {
    await this.componentsRepository.update(id, component);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.componentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Component with id ${id} not found`);
    }
  }
}
