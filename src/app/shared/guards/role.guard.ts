import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';
import { UserRole } from '../enums/user-role';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private readonly userRole = UserRole;

  private role: String;

  constructor(private readonly globalService: GlobalService, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.globalService.currentUserObservable
      .pipe(filter((val) => val !== null))
      .subscribe((user) => {
        if (user?.role_id === this.userRole.STUDENT) {
          this.role = 'ST';
        } else if (user?.role_id === this.userRole.TRAINER) {
          this.role = 'TR';
        } else if (user?.role_id === this.userRole.TRAINING_CENTER) {
          this.role = 'TRC';
        }
        if (route.data['role'].indexOf(this.role) !== -1) {
          return true;
        }

        // when routing there is dashboard data and value true
        if (route.data['dashboard']) {
          this.router.navigate([state.url + '/courses']);
        } else {
          this.router.navigate(['/']);
        }
        return false;
      });
    return true;
  }
}
