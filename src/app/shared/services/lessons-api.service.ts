import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api/api-response.interface';
import { environment } from '../../../environments/environment';
import { Lesson } from '../interfaces/lesson.interface';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable()
export class LessonsApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public createLesson(lesson: Partial<Lesson>): Observable<Lesson | ApiResponse> {
    return this.httpClient.post<Lesson | ApiResponse>(`${API_URL}lessons/create`, lesson);
  }

  public updateLesson(lesson: Partial<Lesson>): Observable<Lesson | ApiResponse> {
    return this.httpClient.put<Lesson | ApiResponse>(`${API_URL}lessons/update`, lesson);
  }

  public deleteLesson(id: number): Observable<ApiResponse<Lesson>> {
    return this.httpClient.delete<ApiResponse<Lesson>>(`${API_URL}lessons/delete/${id}`);
  }
}
