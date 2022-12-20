import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardSidebarService {
  private readonly isOpened$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public setOpenedState(value: boolean): BehaviorSubject<boolean> {
    this.isOpened$.next(value);
    return this.isOpened$;
  }

  public get isOpened(): BehaviorSubject<boolean> {
    return this.isOpened$;
  }
}
