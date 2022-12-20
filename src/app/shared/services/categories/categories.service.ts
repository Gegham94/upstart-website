import { GlobalService } from './../global.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriesInterface } from '../../interfaces/categories/categories.interface';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public lang: string = '';

  constructor(
    private http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly globalService: GlobalService,
  ) {}

  public getCategories() {
    this.lang = this.translateService.currentLang;
    return this.http.get<CategoriesInterface[]>(`${API_URL}categories`).pipe(
      map((data) => {
        this.globalService.categoriesList = data;
        return data;
      }),
    );
  }
}
