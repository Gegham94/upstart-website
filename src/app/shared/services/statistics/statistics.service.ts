import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StatisticInterface } from '../../interfaces/statistic/statistic.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  public getStatistic(): Observable<StatisticInterface> {
    return this.http.get<StatisticInterface>(`${API_URL}home-page-statistics`);
  }
}
