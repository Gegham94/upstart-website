import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Stats } from '../../interfaces/stats/stats';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  public getStats(): Observable<ApiResponse<Stats>> {
    return this.http.get<ApiResponse<Stats>>(`${API_URL}trainer/stats`);
  }
}
