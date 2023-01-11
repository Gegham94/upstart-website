import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ButtonTheme } from '../../../../enums/button-theme.enum';
import { Router } from '@angular/router';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { AuthorizationService } from 'src/app/shared/services/auth/authorization.service';
import {
  NotificationsInterface,
  NotificationsUnread,
} from 'src/app/shared/interfaces/notifications/notifications.interface';
import { CourseCountService } from 'src/app/shared/services/course-count/course-count.service';
import { mergeMap, Subject, takeUntil, takeWhile, timer } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications/notifications.service';
@Component({
  selector: 'us-header-action-panel',
  templateUrl: './header-action-panel.component.html',
  styleUrls: ['./header-action-panel.component.scss'],
})
export class HeaderActionPanelComponent implements OnInit, OnDestroy {
  public loggedIn: boolean = false;

  @Output()
  public unreadCountEmit: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public dashboard?: boolean = false;

  @Input()
  public isMobile?: boolean = false;

  @Input()
  public userInfo?: CurrentUserInfoInterface;

  @ViewChild('sideMenuToggler')
  public sideMenuToggler!: ElementRef<HTMLElement>;

  public allNotifications!: NotificationsInterface[];

  public hasNewNotification: boolean = false;

  public isHover: boolean = false;

  public unreadCount: number = 0;

  public coursesInBasket: number = 0;

  public coursesInWishList: number = 0;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  private wishListCount = 0;

  private basketCount = 0;

  public showWishList = 0;

  public showBasket = 0;

  constructor(
    private router: Router,
    private readonly authorizationService: AuthorizationService,
    private courseCountService: CourseCountService,
    private readonly notificationService: NotificationsService,
  ) {
    this.courseCountService.coursesInBasket$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((bCount) => {
        this.basketCount = bCount;
        if (bCount === 1) {
          this.coursesInBasket += 1;
        } else if (bCount === 0 && this.coursesInBasket !== 0) {
          this.coursesInBasket -= 1;
        } else {
          this.coursesInBasket = this.basketCount;
        }
      });

    this.courseCountService.coursesInWishList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((wCount) => {
        this.wishListCount = wCount;
        if (wCount === 1) {
          this.coursesInWishList += 1;
        } else if (wCount === 0 && this.coursesInWishList !== 0) {
          this.coursesInWishList -= 1;
        } else {
          this.coursesInWishList = this.wishListCount;
        }
      });
  }

  public readonly buttonTheme = ButtonTheme;

  public ngOnInit(): void {
    this.authorizationService.authToken.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      this.loggedIn = !!res;
      if (!!res) {
        this.getNotifications();
      }
    });
  }

  public goLogin() {
    this.router.navigate(['auth/login']);
  }

  public goSignup() {
    this.router.navigate(['auth/registration']);
  }

  public logOut() {
    this.sideMenuToggler.nativeElement.click();
    this.authorizationService
      .logout()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.coursesInBasket = 0;
        this.coursesInWishList = 0;
        this.router.navigate(['/']);
        this.loggedIn = false;
      });
  }

  public goBasket() {
    this.router.navigate(['basket']);
  }

  public get nameFirstLetters() {
    if (!this.userInfo?.avatar) {
      return this.userInfo?.first_name[0]! + this.userInfo?.last_name[0];
    } else return;
  }

  public hideNotificationList() {
    setTimeout(() => {
      this.isHover = false;
    }, 50);
  }

  public goFavorites() {
    this.router.navigate(['favorites']);
  }

  public showNotificationList() {
    this.isHover = true;
  }

  public ngOnDestroy(): void {
    this.coursesInWishList = 0;
    this.coursesInBasket = 0;
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private getNotifications() {
    timer(0, 5000)
      .pipe(
        takeWhile(() => this.loggedIn),
        mergeMap(() => this.notificationService.unread()),
        takeUntil(this.destroyed$),
      )
      .subscribe((data: NotificationsUnread) => {
        if (data.success) {
          if (this.unreadCount !== data.unread) {
            this.notificationService.getNotificationList().subscribe();
            this.notificationService.getNotifications().subscribe();
          }

          this.unreadCount = data.unread;
          this.unreadCountEmit.emit(data.unread);
          this.hasNewNotification = data.unread > 0;
        }
      });
  }

  public changeUnreadCount(count: number) {
    if (count === 0) {
      this.hasNewNotification = false;
    }
  }
}
