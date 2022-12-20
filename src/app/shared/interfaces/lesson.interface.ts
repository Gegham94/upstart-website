import { ResourceUpload } from './resources/resource-upload';

export interface Lesson {
  id: number;
  title: string;
  course_id: number;
  section_id: number;
  type: string;
  video_url: string;
  article: string;
  position: number;
  description: string;
  resources: ResourceUpload[];
}
