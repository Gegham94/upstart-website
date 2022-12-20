import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyLearnings } from '../../interfaces/my-learnings/my-learnings';
import { ApiResponse } from '../../interfaces/api/api-response.interface';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class MyLearningsService {
  constructor(private http: HttpClient) {}

  public getMyLearnings(): Observable<ApiResponse<MyLearnings[]>> {
    return this.http.get<ApiResponse<MyLearnings[]>>(`${API_URL}my-learnings`);
  }
}
