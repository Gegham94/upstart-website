import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil, mergeMap, timer, repeat, takeWhile } from 'rxjs';

import { AuthorizationService } from '../../../services/auth/authorization.service';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'us-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly mobileMaxWidth: number = 1024;

  public isMobile: boolean = false;

  public isScrolled: boolean = false;

  public isLoggedIn: boolean = false;

  public userInfo!: CurrentUserInfoInterface;

  private destroyed$: Subject<void> = new Subject<void>();

  public allNotifications!: NotificationsInterface[];

  @HostListener('window:resize', ['$event'])
  public resizeHandler(event: Event) {
    this.isMobile = (event.target as Window).innerWidth <= this.mobileMaxWidth;
  }

  @HostListener('window:scroll', ['$event'])
  public scrollHandler(event: Event) {
    if (event.cancelable) event.preventDefault();

    this.isScrolled = window.scrollY > 0;
  }

  constructor(
    @Inject('PLATFORM_ID')
    private readonly platformId: string,
    private readonly authorizationService: AuthorizationService,
    private readonly globalService: GlobalService,
    private readonly notificationService: NotificationsService,
  ) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.dispatchEvent(new Event('resize'));
    }

    this.authorizationService.authToken.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      this.isLoggedIn = !!res;
      if (!!res) {
        this.getCurrentUserInfo();
        this.getNotifications();
      }
    });
  }

  private getCurrentUserInfo() {
    this.globalService.currentUserObservable.subscribe((data) => {
      if (data) {
        this.userInfo = data;
      }
    });
  }

  private getNotifications() {
    timer(0, 5000)
      .pipe(
        repeat(),
        takeWhile(() => this.isLoggedIn),
        mergeMap(() => this.notificationService.getNotifications()),
      )
      .subscribe(({ data }) => {
        this.allNotifications = data;
        this.allNotifications = [...this.allNotifications];
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
