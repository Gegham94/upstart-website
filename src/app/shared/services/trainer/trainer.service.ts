import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Trainer, TrainerDashboard } from '../../interfaces/trainer/trainer';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private readonly httpClient: HttpClient) {}

  public getTrainerById(id: number): Observable<ApiResponse<Trainer>> {
    return this.httpClient.get<ApiResponse<Trainer>>(`${API_URL}trainer/meta/${id}`);
  }

  public getTrainerDashboard(): Observable<ApiResponse<TrainerDashboard>> {
    return this.httpClient.get<ApiResponse<TrainerDashboard>>(`${API_URL}trainer/dashboard`);
  }
}
