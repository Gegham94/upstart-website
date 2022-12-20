import { CourseType } from '../../enums/course-type.enum';
import { CourseLandingForm } from '../../../pages/dashboard/pages/dashboard-courses/pages/dashboard-create-course/interfaces/course-landing-form.interface';
import { CourseTrainerForm } from '../../../pages/dashboard/pages/dashboard-courses/pages/dashboard-create-course/interfaces/course-trainer-form.interface';
import { CourseInformationForm } from '../../../pages/dashboard/pages/dashboard-courses/pages/dashboard-create-course/interfaces/course-information-form.interface';

export interface CourseForm {
  status?: number;
  type: CourseType;
  category: number | null;
  landingPage: Partial<CourseLandingForm>;
  courseInformation: Partial<CourseInformationForm>;
  trainer: Partial<CourseTrainerForm>;
}
