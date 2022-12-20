import { ApiResponse } from './../interfaces/api/api-response.interface';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SearchedDataInterface } from '../interfaces/search.interface';
import { SearchResponseInterface } from '../interfaces/search-response.interface';
import { PublicCourse } from '../interfaces/courses/public-course.interface';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SearchAutocompleteService {
  constructor(private http: HttpClient) {}

  public getAutocompleteData(text: string) {
    return this.http.get<SearchResponseInterface>(`${API_URL}autocompletes/${text}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  public getAllCourses() {
    return this.http.get<ApiResponse<PublicCourse[]>>(`${API_URL}search`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  public getSearchData(search_text: string) {
    return this.http.get<SearchedDataInterface>(`${API_URL}search?search_text=${search_text}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
