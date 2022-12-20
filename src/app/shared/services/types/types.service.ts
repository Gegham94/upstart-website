import { FilterToggleItemsInterface } from './../../interfaces/filter-toggle-items.interface';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { GlobalService } from '../global.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  public lang: string = '';

  constructor(private http: HttpClient, private readonly globalService: GlobalService) {}

  public getTypes() {
    return this.http.get<FilterToggleItemsInterface[]>(`${API_URL}course-types`).pipe(
      map((data) => {
        this.globalService.typesList = data;
        return data;
      }),
    );
  }
}
