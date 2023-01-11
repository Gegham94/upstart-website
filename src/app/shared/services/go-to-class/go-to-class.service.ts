import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessApi } from '../../interfaces/success-api/success-api';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class GoToClassService {
  constructor(private http: HttpClient) {}

  public joinToClass(id: number): Observable<SuccessApi> {
    return this.http.post<SuccessApi>(`${API_URL}course/join/${id}`, {});
  }

  public passQuize(data: object): Observable<SuccessApi> {
    return this.http.post<SuccessApi>(`${API_URL}pass-quize`, data);
  }

  public passLesson(data: object): Observable<SuccessApi> {
    return this.http.post<SuccessApi>(`${API_URL}course/lesson/pass`, data);
  }
}
