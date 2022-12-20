import { Lesson } from './lesson.interface';
import { Quiz } from './quiz.interface';

export interface Section {
  id: number;
  title: string;
  course_id: number;
  lessons: Lesson[];
  quiz: Quiz[];
}
