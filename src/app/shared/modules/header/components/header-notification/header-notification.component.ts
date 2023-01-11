import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { Router } from '@angular/router';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { GlobalNotificationsService } from '../../../../services/notifications/global-notifications.service';

@Component({
  selector: 'us-header-notification',
  templateUrl: './header-notification.component.html',
  styleUrls: ['./header-notification.component.scss'],
})
export class HeaderNotificationComponent implements OnInit {
  @Output()
  public hideNotificationsList: EventEmitter<void> = new EventEmitter();

  @Output()
  public unreadCountEmmit: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public set unreadCountNoti(count: number) {
    if (count > 0) {
      this.unreadCount = count;
    }
  }

  public allNotifications?: NotificationsInterface[];

  public unreadCount: number = 0;

  public destroyed$: Subject<boolean> = new Subject<boolean>();

  public loader: boolean = false;

  constructor(
    private notificationService: NotificationsService,
    private globalNotificationService: GlobalNotificationsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.loader = true;
    this.fetchData();
    this.globalNotificationService.lastNotifications
      .pipe(takeUntil(this.destroyed$))
      .subscribe((notifications) => {
        if (notifications) {
          this.allNotifications = [...notifications];
          this.loader = false;
        }
      });
  }

  public fetchData() {
    this.notificationService.getNotifications().subscribe();
    this.notificationService.getNotificationList().subscribe();
  }

  public readNotification(id: number, status: number) {
    if (!status) {
      this.notificationService.changeStatus(id).subscribe((res) => {
        if (res.success) {
          const notificationToRead = this.allNotifications?.find((el) => el.id === id);
          if (notificationToRead) {
            notificationToRead.status = 1;
          }
          this.fetchData();
          this.unreadCount--;
          this.unreadCountEmmit.emit(this.unreadCount);
        }
      });
    }
  }

  public deleteNotification(id: number, event: Event, index: number) {
    event.stopPropagation();
    this.notificationService.delete(id).subscribe(
      () => {
        this.allNotifications?.splice(index, 1);
        this.fetchData();
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }

  public goAllnotificationsPage() {
    this.hideNotificationsList.emit();
    this.router.navigateByUrl('/notifications');
  }

  public markAllRead() {
    if (this.unreadCount) {
      this.notificationService.markAsRead().subscribe(() => {
        this.unreadCount = 0;
        this.fetchData();
        this.allNotifications?.forEach((el) => {
          el.status = 1;
        });
      });
    }
  }

  public redirectNotification(url: string = '') {
    if (url) {
      this.router.navigate([url]);
      this.hideNotificationsList.emit();
    }
  }
}
