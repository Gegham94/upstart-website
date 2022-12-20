import { CourseType } from '../../enums/course-type.enum';

export interface IFavorites {
  category_parent_title?: string;
  category_title?: string;
  categories?: string[];
  course_id?: number;
  cover_image?: string;
  created_at?: Date;
  created_date?: Date;
  currency?: string;
  id?: number;
  price?: string;
  rate?: number;
  rating?: number;
  sub_title?: string;
  title?: string;
  trainer?: string;
  type?: CourseType;
  updated_at?: Date;
  user_id?: number;
  in_basket?: number;
  discount_percent?: number;
}
