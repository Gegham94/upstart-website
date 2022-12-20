export interface Student {
  phone?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  verifyPassword: string | null;
  trainingName?: string;
  identityNum?: number;
  language_code?: string;
  role_id?: string;
}
