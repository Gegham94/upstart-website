import { UserRole } from '../enums/user-role';

export interface Student {
  phone?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password?: string | null;
  verifyPassword?: string | null;
  trainingName?: string;
  identityNum?: number;
  role_id?: UserRole;
}
