import { PublicCourse } from '../courses/public-course.interface';

export interface MyLearnings {
  id: number;
  course_id: number;
  user_id: number;
  payment_id: number;
  created_at: Date;
  updated_at: Date;
  categories: string[];
  expired: boolean;
  course: PublicCourse;
}
