import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SearchResponseInterface } from '../interfaces/search-response.interface';
const API_URL = environment.apiUrl;

let number = 0;

@Injectable({
  providedIn: 'root',
})
export class SearchAutocompleteService {
  constructor(private http: HttpClient) {}

  public getAutocompleteData(text: string) {
    number++;

    return this.http
      .get<SearchResponseInterface>(`${API_URL}autocompletes/${text}`, {
        params: {
          dummy: number,
        },
      })
      .pipe(
        map((data) => {
          return data;
        }),
      );
  }
}
