import { CourseType } from '../../enums/course-type.enum';

export interface PublicCourse {
  first_lesson_date: Date;
  type: CourseType;
  cover_image: string;
  id: number;
  sub_title: string;
  title: string;
  category_title: string;
  in_basket: number;
  in_wishlist: number;
  currency: string;
  price: number;
  trainer_name: string;
  trainer_avatar: string;
  rating: number;
  created_at: Date;
  categories: string[];
  profile_id: number;
  lesson_date: Date;
  address?: string;
  lessons_status?: string;
}
