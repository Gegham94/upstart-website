import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Reviews, TrainerReview } from '../../interfaces/reviews/trainer-review';
import { SuccessApi } from '../../interfaces/success-api/success-api';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public getTrainerReviews(trainerId: number): Observable<ApiResponse<TrainerReview[]>> {
    return this.http.get<ApiResponse<TrainerReview[]>>(`${API_URL}user-review/${trainerId}`);
  }

  public getCourseReviews(courseId: number): Observable<ApiResponse<TrainerReview[]>> {
    return this.http.get<ApiResponse<TrainerReview[]>>(`${API_URL}course/${courseId}/reviews`);
  }

  public addReviews(body: Reviews): Observable<Reviews> {
    return this.http.post<Reviews>(`${API_URL}course/set-rate`, body);
  }

  public deleteReview(id: number): Observable<ApiResponse<SuccessApi>> {
    return this.http.delete<ApiResponse<SuccessApi>>(`${API_URL}review/delete/${id}`, {});
  }
}
