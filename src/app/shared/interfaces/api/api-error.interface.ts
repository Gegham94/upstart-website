interface HttpErrorResponse {}

export interface ApiError<T = { [key: string]: string[] }> extends HttpErrorResponse {
  error: {
    errors: T;
    message: string;
    success: boolean;
  };
}
