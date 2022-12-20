import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Students } from '../../interfaces/students/students.interface';
import { PublicCourse } from '../../interfaces/courses/public-course.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  public getStudentsList(): Observable<ApiResponse<Students[]>> {
    return this.http.get<ApiResponse<Students[]>>(`${API_URL}students/list`);
  }

  public getStudentCourse(user_id: number): Observable<ApiResponse<PublicCourse[]>> {
    return this.http.get<ApiResponse<PublicCourse[]>>(`${API_URL}students/courses-list/${user_id}`);
  }
}
