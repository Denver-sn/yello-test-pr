import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: Repository<Course>;

  const mockCourse = { id: 'denID', title: 'La prehistoire' };

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // CASE: Create a new course
  it('should create a new course if title does not exist', async () => {
    const createCourseDto: CreateCourseDto = {
      title: 'denID',
      description: 'This is a new course',
      level: 'Débutant', // Utilise un type valide
    };

    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue({
      id: 'denID',
      ...createCourseDto,
    });

    const result = await service.create(createCourseDto);

    expect(result).toEqual({ id: 'denID', ...createCourseDto });
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { title: createCourseDto.title },
    });
    expect(mockRepository.save).toHaveBeenCalledWith(createCourseDto);
  });

  // CASE: Create a new course with an existing title should throw BadRequestException
  it('should throw BadRequestException if course with same title exists', async () => {
    const createCourseDto: CreateCourseDto = {
      title: 'La prehistoire',
      description: 'This is a duplicate course',
      level: 'Débutant',
    };
    mockRepository.findOne.mockResolvedValue(mockCourse);

    await expect(service.create(createCourseDto)).rejects.toThrow(
      BadRequestException,
    );

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { title: createCourseDto.title },
    });
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  // CASE: Find all courses should return all courses
  it('should return all courses', async () => {
    const mockCourses = [
      { id: 'denID', title: 'La prehistoire' },
      { id: 'denID2', title: 'La prehistoire 2' },
    ];

    mockRepository.find.mockResolvedValue(mockCourses);

    const result = await service.findAll();

    expect(result).toEqual(mockCourses);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  // CASE: Find a course by ID
  it('should return a course when found by ID', async () => {
    mockRepository.findOne.mockResolvedValue(mockCourse);

    const result = await service.findOne('denID');

    expect(result).toEqual(mockCourse);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'denID' },
    });
  });

  // CASE: Find a course by ID that does not exist should throw NotFoundException
  it('should throw NotFoundException if course is not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('badId')).rejects.toThrow(NotFoundException);

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'badId' },
    });
  });

  // CASE: Update a course
  it('should update a course when found by ID', async () => {
    const updateCourseDto: UpdateCourseDto = {
      title: 'La prehistoire',
      description: 'This is an updated course',
      level: 'Intermédiaire', // Utilise un type valide
    };
    const updatedCourse = { id: 'denID', ...updateCourseDto };

    mockRepository.preload.mockResolvedValue(updatedCourse);
    mockRepository.save.mockResolvedValue(updatedCourse);

    const result = await service.update('denID', updateCourseDto);

    expect(result).toEqual(updatedCourse);
    expect(mockRepository.preload).toHaveBeenCalledWith({
      id: 'denID',
      ...updateCourseDto,
    });
    expect(mockRepository.save).toHaveBeenCalledWith(updatedCourse);
  });

  // CASE: Update a course that does not exist should throw NotFoundException
  it('should throw NotFoundException if course is not found', async () => {
    const updateCourseDto: UpdateCourseDto = {
      title: 'La prehistoire',
      description: 'This is an updated course',
      level: 'Intermédiaire',
    };

    mockRepository.preload.mockResolvedValue(null);

    await expect(service.update('badId', updateCourseDto)).rejects.toThrow(
      NotFoundException,
    );

    expect(mockRepository.preload).toHaveBeenCalledWith({
      id: 'badId',
      ...updateCourseDto,
    });
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  // CASE: Delete a course
  it('should delete a course when found by ID', async () => {
    mockRepository.findOne.mockResolvedValue(mockCourse);
    mockRepository.remove.mockResolvedValue({});

    const result = await service.remove('denID');

    expect(result).toEqual({
      message: `Course ${mockCourse.title} has been successfully deleted`,
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'denID' },
    });
    expect(mockRepository.remove).toHaveBeenCalledWith(mockCourse);
  });

  // CASE: Delete a course that does not exist should throw NotFoundException
  it('should throw NotFoundException if course is not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.remove('badId')).rejects.toThrow(NotFoundException);

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 'badId' },
    });
    expect(mockRepository.remove).not.toHaveBeenCalled();
  });
});
