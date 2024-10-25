import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.repository';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { title: createCourseDto.title },
    });
    if (course) {
      throw new BadRequestException(
        `Course with title ${createCourseDto.title} already exists`,
      );
    }

    return this.courseRepository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    const updateCourse = await this.courseRepository.save(course);

    if (updateCourse) {
      return updateCourse;
    }

    throw new BadRequestException(`Failed to update course with ID ${id}`);
  }

  async remove(id: string): Promise<any> {
    const course = await this.findOne(id);
    const deleteCourse = await this.courseRepository.remove(course);

    if (deleteCourse) {
      return {
        message: `Course ${course.title} has been successfully deleted`,
      };
    }

    throw new NotFoundException(`Failed to delete course with ID ${id}`);
  }
}
