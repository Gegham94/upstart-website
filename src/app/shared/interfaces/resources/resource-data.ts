import { ResourceUpload } from './resource-upload';
export interface ResourceData {
  current_page: number;
  data: ResourceUpload[];
  next_page_url: string;
  per_page: number;
  prev_page_url: string;
  total: number;
}
