import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Student } from '../../interfaces/registration-form.intrface';
import { LoginStudent } from '../../interfaces/login-form.interface';
import { CreatedUserInterface } from '../../interfaces/createdUser.interface';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { CurrentUserUpdateInterface } from '../../interfaces/current-user.interface';
import { ResponseError } from '../../interfaces/settings.interface';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { SocialLogin } from '../../interfaces/social-login.interface';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ResetPassword } from '../../interfaces/reset-password.interface';

const API_URL = environment.apiUrl;
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class AuthorizationService {
  public lang: string = '';

  private readonly authToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    @Inject(PLATFORM_ID)
    private readonly privateId: string,
    private readonly router: Router,
    private readonly socialAuthService: SocialAuthService,
    private globalService: GlobalService,
  ) {
    if (isPlatformBrowser(this.privateId)) {
      this.authToken$.next(localStorage.getItem('auth') ?? '');
    }
  }

  public signup(data: Student, role_id: number): Observable<ApiResponse<CreatedUserInterface>> {
    this.lang = this.translateService.currentLang;
    return this.http
      .post<ApiResponse<CreatedUserInterface>>(
        `${API_URL}registration`,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,
          company_name: data.trainingName,
          tax_identity_number: data.identityNum,
          role_id: role_id,
        },
        { headers: headers },
      )
      .pipe(
        tap((res) => {
          if (res.success) {
            if (res.data.api_token != null) {
              this.authToken$.next(res.data.api_token);
            }
            localStorage.setItem('auth', <string>res.data.api_token);
          } else {
            // this.localLogout();
          }
        }),
      );
  }

  public login(data: LoginStudent): Observable<ApiResponse<CreatedUserInterface>> {
    this.lang = this.translateService.currentLang;

    return this.http
      .post<ApiResponse<CreatedUserInterface>>(
        `${API_URL}login`,
        {
          email: data.email,
          password: data.password,
          role_id: 3,
        },
        { headers: headers },
      )
      .pipe(
        tap((res) => {
          if (res.data?.api_token) {
            this.authToken$.next(res.data.api_token);
            localStorage.setItem('auth', res.data.api_token);
          } else {
            this.localLogout();
          }
        }),
      );
  }

  public localLogout(): void {
    localStorage.removeItem('auth');
    this.globalService.currentUser = null;
    this.socialAuthService.signOut();
    this.authToken$.next('');
    this.router.navigate(['auth/login']);
  }

  public get authToken(): Observable<string> {
    return this.authToken$.asObservable();
  }

  public logout() {
    return this.http.post(`${API_URL}logout`, '').pipe(
      tap(() => {
        this.localLogout();
        localStorage.removeItem('auth');
      }),
    );
  }

  public checkPasswordUser(password: string): Observable<ResponseError> {
    return this.http.post<ResponseError>(`${API_URL}check-password`, { password });
  }

  public updateUser(data: CurrentUserUpdateInterface): Observable<ResponseError> {
    return this.http.post<ResponseError>(`${API_URL}update/user`, { ...data });
  }

  public requestResetMail(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}forgot-password`, { email });
  }

  public resetPassword(data: ResetPassword): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}reset-password`, { ...data });
  }

  public socialLogin(data: SocialLogin): Observable<ApiResponse<CreatedUserInterface>> {
    return this.http
      .post<ApiResponse<CreatedUserInterface>>(`${API_URL}social/login`, {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        company_name: data.trainingName,
        tax_identity_number: data.identityNum,
        role_id: data.role_id,
        unique_id: data.unique_id,
        provider: data.provider,
      })
      .pipe(
        tap((res) => {
          if (res.success) {
            if (res.data?.api_token) {
              this.authToken$.next(res.data.api_token);
              localStorage.setItem('auth', res.data.api_token);
            } else {
              this.localLogout();
            }
          } else {
            this.localLogout();
          }
        }),
      );
  }
}
