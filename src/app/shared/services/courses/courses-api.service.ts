import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { CourseCreateResponse } from '../../interfaces/courses/course-create-response.interface';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Course } from '../../interfaces/courses/course.interface';
import { ApiPaginatedResponse } from '../../interfaces/api/api-paginated-response.interface';
import { TrainerCourse } from '../../interfaces/courses/trainer-course';
import { CourseDetails } from '../../interfaces/courses/course-details';
import { PublicCourse } from '../../interfaces/courses/public-course.interface';
import { Section } from '../../interfaces/section.interface';
import { GlobalService } from '../global.service';
import { CourseStatus } from '../../enums/course-status';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CoursesApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly globalService: GlobalService,
  ) {}

  public createCourse(type: number): Observable<ApiResponse<CourseCreateResponse>> {
    return this.httpClient.post<ApiResponse<CourseCreateResponse>>(
      `${API_URL}courses/create`,
      null,
      {
        params: {
          type,
        },
      },
    );
  }

  public getCourse(id: number): Observable<ApiResponse<Course>> {
    return this.httpClient.get<ApiResponse<Course>>(`${API_URL}courses/${id}`);
  }

  public getCourseDetails(id: number): Observable<ApiResponse<CourseDetails>> {
    return this.httpClient.get<ApiResponse<CourseDetails>>(`${API_URL}course-details/${id}`);
  }

  public updateCourse(course: Partial<Course>): Observable<ApiResponse<Course>> {
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    let formData: FormData = new FormData();

    Object.keys(course).map((key) => {
      const value = (course as { [key: string]: unknown })[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    return this.httpClient.post<ApiResponse<Course>>(`${API_URL}courses/update`, course, {
      headers,
    });
  }

  public createSection(courseId: number): Observable<Section | ApiResponse> {
    return this.httpClient.post<Section | ApiResponse>(`${API_URL}courses/create-section`, {
      course_id: courseId,
    });
  }

  public deleteSection(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${API_URL}courses/delete-section`, {
      body: {
        id,
      },
    });
  }

  public getCurrentUserCourses(
    currentPage: number,
    status?: CourseStatus,
  ): Observable<ApiResponse<ApiPaginatedResponse<Course[]>>> {
    const params: HttpParams | { [header: string]: string | string[] } = {
      page: String(currentPage),
    };
    if (status) {
      params['status'] = String(status as number);
    }
    return this.httpClient.get<ApiResponse<ApiPaginatedResponse<Course[]>>>(
      `${API_URL}courses/get-user-courses`,
      {
        params,
      },
    );
  }

  public getCoursesByTrainerId(id: number): Observable<ApiPaginatedResponse<TrainerCourse[]>> {
    return this.httpClient.get<ApiPaginatedResponse<TrainerCourse[]>>(`${API_URL}${id}/courses`);
  }

  public getCoursesByLang(): Observable<ApiResponse<PublicCourse[]>> {
    return this.httpClient.get<ApiResponse<PublicCourse[]>>(`${API_URL}search`).pipe(
      map((res) => {
        this.globalService.coursesByLangList = res.data;
        return res;
      }),
    );
  }

  public deleteCourse(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${API_URL}courses/delete/${id}`);
  }

  public updateSection(body: Partial<Section>): Observable<Section | ApiResponse> {
    return this.httpClient.post<Section | ApiResponse>(`${API_URL}courses/update-section`, body);
  }

  public coursePreviewDetails(id: number): Observable<ApiResponse<CourseDetails>> {
    return this.httpClient.get<ApiResponse<CourseDetails>>(`${API_URL}course-preview/${id}`);
  }
}
