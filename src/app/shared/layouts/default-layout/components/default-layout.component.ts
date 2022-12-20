import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { RouterDataService } from '../../../services/router-data.service';

@Component({
  selector: 'us-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss', './default-layout.component.media.scss'],
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public isPageHeaderless: boolean = false;

  public isPageFooterless: boolean = false;

  public isLoggedIn: boolean = false;

  private readonly destroyed$: Subject<void> = new Subject<void>();

  constructor(private readonly routerDataService: RouterDataService) {}

  public ngOnInit(): void {
    this.routerDataService
      .getRoutesData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Data) => {
        this.isPageFooterless = data['footerless'] ?? false;
        this.isPageHeaderless = data['headerless'] ?? false;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
