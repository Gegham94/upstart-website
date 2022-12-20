import { Question } from './question.interface';
import { SectionElementType } from '../../pages/dashboard/pages/dashboard-courses/pages/dashboard-create-course/enums/section-element-type.enum';

export interface Quiz {
  id: number;
  type: SectionElementType;
  course_id: number;
  title: string;
  question: Question[];
  position: number;
}
