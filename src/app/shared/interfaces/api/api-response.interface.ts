export interface ApiResponse<T = unknown> {
  data: T;
  reviews: T;
  success: boolean;
  current_page?: number;
  per_page?: number;
  total_count?: number;
  completed_steps?: {
    [key: string]: boolean;
  };
  errors?: {
    [key: string]: string | string[];
  };
  message?: string;
}
