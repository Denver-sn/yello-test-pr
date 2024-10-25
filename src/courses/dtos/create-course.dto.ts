import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ description: 'Titre du cours' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description du cours' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Niveau du cours',
    enum: ['Débutant', 'Intermédiaire', 'Avancé'],
  })
  @IsString()
  @IsIn(['Débutant', 'Intermédiaire', 'Avancé'])
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
}
