import { Trainer } from '../trainer/trainer';
import { CourseType } from '../../enums/course-type.enum';

export interface CourseDetails {
  sections: Section[];
  first_lesson_date: Date;
  address: string;
  categories: string[];
  category_id: number;
  certificate: number;
  cover_image: string;
  created_at: Date;
  currency: string;
  definition: null;
  description: string;
  discount_percent: number;
  id: number;
  language: 'Armenian';
  link?: string;
  lessons: Lessons[];
  lessons_count: number;
  level: 'All levels';
  max_participants: number;
  price: number;
  promo_video: string;
  quiz_count: number;
  rate: number;
  requirements: string;
  status: string;
  sub_title: string;
  title: string;
  trainer: LessonTrainer;
  first_name: string;
  last_name: string;
  type: string;
  type_id: CourseType;
  updated_at: Date;
  user_id: number;
  will_learn: string;
  full_access: boolean;
  in_basket: number;
  quiz_id?: number;
}
export interface LessonTrainer {
  avatar: string;
  company_avatar: string;
  bio: string;
  first_name: string;
  id: number;
  last_name: string;
  user_id: number;
  company_name: string;
  user?: Trainer;
}
export interface Lessons {
  data?: Lessons;
  id: number;
  title: string;
  duration: number;
  start_time: Date;
  course_id: number;
  video_url: string;
  article: string;
  type: string;
  type_id: CourseType;
  position: number;
  description: string;
  questions_count: number;
  resources_count: number;
  resources: Resources;
  questions: Questions[];
  passed: number;
  quiz_id?: number;
}
export interface Section {
  lessons: Lessons[];
  quiz: Quiz[];
  title: string;
  isOpen?: boolean;
}
export interface Quiz {
  id: number;
  section_id: number;
  created_at: Date;
  updated_at: Date;
  position: number;
  title: string;
}

export interface Questions {
  id?: number;
  question_id: number;
  answers: string[];
  multiple_choice: number;
  title: string;
}

export interface Resources {
  id: number;
  path: string;
  title: string;
}
