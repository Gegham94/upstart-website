import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SuccessApi } from '../../interfaces/success-api/success-api';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class EmailSubscribeService {
  constructor(private http: HttpClient) {}

  public subscribeToEmail(body: object): Observable<SuccessApi> {
    return this.http.post<SuccessApi>(`${API_URL}subscribe`, body);
  }
}
