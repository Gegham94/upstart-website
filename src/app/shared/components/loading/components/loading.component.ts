import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { Observable, Subscription } from 'rxjs';
import { hideBodyOverflow, showBodyOverflow } from '../../../helpers/body-overflow.helper';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'us-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input()
  public isGlobal: boolean = false;

  @Input()
  public show: boolean = false;

  private loadingStateSubscription?: Subscription;

  constructor(
    private readonly loadingService: LoadingService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {}

  public ngOnInit(): void {
    if (this.isGlobal && isPlatformBrowser(this.platformId)) {
      this.loadingStateSubscription = this.loadingState.subscribe((state) => {
        if (state) {
          hideBodyOverflow();
        } else {
          showBodyOverflow();
        }
      });
    }
  }

  public get loadingState(): Observable<boolean> {
    return this.loadingService.loadingState;
  }

  public ngOnDestroy(): void {
    this.loadingStateSubscription?.unsubscribe();

    if (this.isGlobal && isPlatformBrowser(this.platformId)) {
      showBodyOverflow();
    }
  }
}
