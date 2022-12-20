import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthorizationService } from '../services/auth/authorization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string = '';

  constructor(private readonly authorizationService: AuthorizationService) {
    authorizationService.authToken.subscribe((token) => {
      this.token = token;
    });
  }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authorizationService.localLogout();
          }
        }
        return throwError(err);
      }),
    );
  }
}
