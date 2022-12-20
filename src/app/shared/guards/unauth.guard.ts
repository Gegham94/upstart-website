import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthorizationService } from '../services/auth/authorization.service';

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(private loggedInService: AuthorizationService, private router: Router) {}

  public canActivate() {
    if (localStorage.getItem('auth')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
