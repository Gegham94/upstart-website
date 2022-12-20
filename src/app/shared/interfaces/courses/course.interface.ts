import { CourseStatus } from '../../enums/course-status';
import { CourseType } from '../../enums/course-type.enum';
import { Section } from '../section.interface';

export interface Course {
  id: number;
  type: CourseType;
  category_id: number;
  trainer_id: number;
  title: string;
  sub_title: string;
  description: string;
  language: number;
  status: CourseStatus;
  price: number;
  max_participants: number;
  completed_steps: { [key: string]: boolean };
  //Todo: Set Course Level enum
  level: number;
  currency: string;
  promo_video: string;
  cover_image: string;
  link: string;
  address: string;
  sections: Section[];
  will_learn: string | string[];
  lessons_count: number;
  requirements: string | string[];
  lessons?: Partial<{
    title: string;
    course_id: number;
    duration: number;
    start_time: string;
  }>[];
  trainer: Partial<{
    id: number;
    first_name: string;
    last_name: string;
    bio: string;
    avatar: string;
  }>;
  categories?: string[];
  created_at?: string;
  first_lesson_date: Date;
  completed_percent?: number;
}
