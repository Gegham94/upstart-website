import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CenterTrainer } from '../interfaces/center-trainer.interface';

const API_URL = environment.apiUrl;

@Injectable()
export class TrainerCenterApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly translateService: TranslateService,
  ) {}

  public getCurrentTrainers(): Observable<CenterTrainer[]> {
    return this.httpClient.get<CenterTrainer[]>(`${API_URL}trainers/get-user-trainers`, {
      params: {
        language_code: this.translateService.currentLang,
      },
    });
  }
}
