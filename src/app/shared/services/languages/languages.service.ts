import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { GlobalService } from '../global.service';
import { TranslateService } from '@ngx-translate/core';
import { FilterToggleItemsInterface } from '../../interfaces/filter-toggle-items.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  constructor(
    private http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly globalService: GlobalService,
  ) {}

  public getLanguages() {
    return this.http.get<FilterToggleItemsInterface[]>(`${API_URL}get-languages`).pipe(
      map((data) => {
        this.globalService.languagesList = data;
        return data;
      }),
    );
  }
}
