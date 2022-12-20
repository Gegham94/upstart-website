import { LessonForm } from './lesson-form.interface';

export interface CourseInformationForm {
  language: number | null;
  level: number | null;
  address?: string | null;
  link?: string | null;
  lessonsCount: number | null;
  whatWillLearn: string[] | null;
  resources: number[] | null;
  price: {
    amount?: number;
    currency?: string | null;
  };
  maxParticipants: number | null;
  lessons?: LessonForm[];
}
