import { Cources } from './courses.interface';

export interface SearchResponseInterface {
  courses: Array<Cources>;
  success: boolean;
  text: [];
}
