// src/categories/categories.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  const mockCategory: Category = {
    id: 1,
    name: 'Test Category',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockCategories: Category[] = [mockCategory];

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockCategory),
    save: jest.fn().mockResolvedValue(mockCategory),
    find: jest.fn().mockResolvedValue(mockCategories),
    findOneBy: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Test Category',
      description: 'Test Description',
    };
    const result = await service.create(createCategoryDto);
    expect(result).toEqual(mockCategory);
    expect(repository.create).toHaveBeenCalledWith(createCategoryDto);
    expect(repository.save).toHaveBeenCalledWith(mockCategory);
  });

  it('should find all categories', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockCategories);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find one category', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockCategory);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a category', async () => {
    const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
    const result = await service.update(1, updateCategoryDto);
    expect(result).toEqual(mockCategory);
    expect(repository.update).toHaveBeenCalledWith(1, updateCategoryDto);
  });

  it('should delete a category', async () => {
    await service.remove(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
