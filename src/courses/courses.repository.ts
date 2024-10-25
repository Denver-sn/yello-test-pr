import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
}
