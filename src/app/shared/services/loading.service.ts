import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private readonly loadingState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public show(): void {
    this.loadingState$.next(true);
  }

  public hide(): void {
    this.loadingState$.next(false);
  }

  public get loadingState(): Observable<boolean> {
    return this.loadingState$;
  }
}
