import { UserRole } from '../../enums/user-role';
import { LessonTrainer } from '../courses/course-details';
import { SocialPages } from '../social-pages/social-pages';

export interface Trainer {
  avatar: string;
  bio: string;
  created_at: Date;
  email: string;
  first_name: string;
  headline: string;
  id: number;
  last_name: string;
  links?: SocialPages;
  updated_at: Date;
  user_id: number;
  role_id: UserRole;
  trainers: LessonTrainer[];
  company_name?: string;
}

export interface TrainerDashboard {
  total_count: number;
  draft: number;
  courses_paid: CoursesPaid;
  published: number;
  under_review: number;
  reviews: TrainerDashboardReviews;
  payment_amount_monthly: PaymentAmountMonthly;
}

export interface CoursesPaid {
  courses: [];
  data: [];
}

export interface PaymentAmountMonthly {
  amount: [];
  months: [];
}
export interface TrainerDashboardReviews {
  average_number: number;
  total_reviews: number;
  rates: ReviewsRates[];
}

export interface ReviewsRates {
  name: number;
  count: number;
  percent: string;
}
