import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { GlobalNotificationsService } from '../../shared/services/notifications/global-notifications.service';

@Component({
  selector: 'us-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', './notifications.component.media.scss'],
})
export class NotificationsComponent implements OnInit {
  public allNotifications?: NotificationsInterface[];

  public newNotifications?: NotificationsInterface[];

  public unreadCount: number = 0;

  public isLoading: boolean = false;

  public notificationList: number[] = [];

  constructor(
    private readonly notificationService: NotificationsService,
    private readonly globalNotificationService: GlobalNotificationsService,
    private readonly router: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.getNotifications();
    this.globalNotificationService.allNotifications.subscribe((data) => {
      this.isLoading = true;
      if (data) {
        this.allNotifications = data;
        this.unreadCount = data.filter((el) => el.status === 0).length;
        this.isLoading = false;
      }
    });
  }

  private getNotifications() {
    this.isLoading = true;
    this.notificationService.getNotifications().subscribe();
    this.notificationService.getNotificationList().subscribe();
  }

  public readNotification(id: number, status: number) {
    if (status === 0 && !this.notificationList.includes(id)) {
      this.notificationService.changeStatus(id).subscribe((res) => {
        if (res.success) {
          const notificationToRead = this.allNotifications?.find((el) => el.id === id);
          if (notificationToRead) {
            notificationToRead.status = 1;
          }
          this.getNotifications();
          this.unreadCount--;
        }
      });
    }
    // this.router.navigate(['notifications', id]);
  }

  public markAllRead() {
    if (this.unreadCount) {
      this.isLoading = true;
      this.notificationService.markAsRead().subscribe(() => {
        this.unreadCount = 0;
        this.getNotifications();
      });
    }
  }

  public deleteNotification(id: number, event: Event) {
    event.stopPropagation();
    this.notificationService.delete(id).subscribe(
      () => {
        this.getNotifications();
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }
}
