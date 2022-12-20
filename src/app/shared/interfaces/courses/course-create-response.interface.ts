export interface CourseCreateResponse {
  created_at: string;
  id: number;
  rate: number | null;
  //TODO: Use Status enum
  status: number;
  type: number;
  updated_at: string;
  user_id: number;
}
