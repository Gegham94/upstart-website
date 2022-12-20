import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { CurrentUserInfoInterface } from '../../interfaces/current-user.interface';
import { AuthorizationService } from '../auth/authorization.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CurrentUserInfoService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthorizationService,
  ) {}

  public getUserInfo() {
    return this.http.get<ApiResponse<CurrentUserInfoInterface>>(`${API_URL}get-current-user`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.authService.localLogout();
        }
        return throwError(err);
      }),
    );
  }
}
