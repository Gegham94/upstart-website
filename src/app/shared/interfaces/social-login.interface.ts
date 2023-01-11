import { UserRole } from '../enums/user-role';
import { Student } from './registration-form.intrface';

export interface SocialLogin extends Partial<Student> {
  provider: string;
  unique_id: string;
  role_id?: UserRole;
}
