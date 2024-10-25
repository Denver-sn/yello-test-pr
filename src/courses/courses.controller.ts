import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Course } from './courses.repository';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('Courses API')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Create a new course
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  // Update a course
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  // Get a course by its id
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully found.',
  })
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  // Get all courses
  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  // Delete a course by its id
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}
