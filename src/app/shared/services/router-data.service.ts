import { Injectable } from '@angular/core';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';

@Injectable()
export class RouterDataService {
  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {}

  public getRoutesData(): Observable<Data> {
    return this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        let child = route;

        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }

        return route;
      }),
      mergeMap((route) => route!.data),
    );
  }
}
