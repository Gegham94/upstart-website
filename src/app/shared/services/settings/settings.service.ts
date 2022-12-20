import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetaDataInterface, TrainerMetaInterface } from '../../interfaces/settings.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public readonly$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  public getTrainerData(user_id: number | undefined): Observable<TrainerMetaInterface> {
    return this.http.get<TrainerMetaInterface>(`${API_URL}trainer/meta/${user_id}`);
  }

  public updateTrainerData(body: MetaDataInterface): Observable<MetaDataInterface> {
    return this.http.post<MetaDataInterface>(`${API_URL}trainer/meta/save`, body);
  }
}
