import { Trainer } from '../trainer/trainer';

export interface TrainerReview {
  course_id: number;
  created_at: null;
  id: number;
  message: string;
  rate: number;
  updated_at: Date;
  avatar: string;
  date: Date;
  first_name: string;
  last_name: string;
  user_id: number;
  user?: Trainer;
}

export interface Reviews {
  course_id: number;
  rate: number;
  message: string;
  id?: number;
}
