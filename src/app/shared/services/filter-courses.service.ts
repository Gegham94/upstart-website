import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiResponse } from './../interfaces/api/api-response.interface';
import { TranslateService } from '@ngx-translate/core';
import { CourseGlobalFilter } from './../interfaces/courses/course-global-filter.interface';
import { PublicCourse } from '../interfaces/courses/public-course.interface';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class FilterCoursesService {
  public lang: string = '';

  constructor(private http: HttpClient, private readonly translateService: TranslateService) {}

  // Global API for Courses filter
  public getFilteredCoursesData(
    filter: CourseGlobalFilter,
    currentPage: number = 1,
    search_text?: string,
    sort?: string,
  ) {
    let params = new HttpParams().set('current_page', currentPage!);
    if (search_text) {
      params = params.append('search_text', search_text);
    } else if (sort) {
      params = params.append('sort', sort);
    }

    Object.entries(filter).forEach(([key, value]) => {
      if (key === 'price' && value.ids.length > 0) {
        params = params.append('price_from', filter.price.ids[0]);
        params = params.append('price_to', filter.price.ids[1]);
      } else if (value.ids?.length) {
        params = params.append(key, value.ids.join(','));
      }
    });
    return this.http.get<ApiResponse<PublicCourse[]>>(`${API_URL}search`, { params }).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
