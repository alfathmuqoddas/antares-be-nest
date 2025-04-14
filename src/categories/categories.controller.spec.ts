// src/categories/categories.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { HttpStatus, BadRequestException } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory: Category = {
    id: 1,
    name: 'Test Category',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCategoriesService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Test Category',
      description: 'Test Description',
    };
    const result = await controller.create(createCategoryDto);
    expect(result).toEqual(mockCategory);
    expect(service.create).toHaveBeenCalledWith(createCategoryDto);
  });

  it('should handle invalid input during category creation', async () => {
    const invalidCategoryDto = { name: 123, description: true }; // Wrong type for name and description
    await expect(
      controller.create(invalidCategoryDto as any),
    ).rejects.toThrowError(BadRequestException); //expect bad request exception.
    expect(service.create).not.toHaveBeenCalled(); //service create should not be called.
  });

  it('should find all categories', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockCategory]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one category', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockCategory);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a category', async () => {
    const updateCategoryDto = { name: 'Updated Category' };
    const result = await controller.update(1, updateCategoryDto);
    expect(result).toEqual(mockCategory);
    expect(service.update).toHaveBeenCalledWith(1, updateCategoryDto);
  });

  it('should delete a category', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
