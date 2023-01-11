export interface SuccessApi {
  success: string;
  message: string;
  errors: Errors;
}

export interface Errors {
  email: string[];
}
