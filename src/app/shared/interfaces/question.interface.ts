export interface Question {
  title?: string;
  position?: number;
  quiz_id: number;
  section_id: number;
  multiple_choice?: number;
  id: number;
  question: string;
  answers: string;
  right_answers: string;
}
