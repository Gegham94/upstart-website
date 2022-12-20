import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { Router } from '@angular/router';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'us-header-notification',
  templateUrl: './header-notification.component.html',
  styleUrls: ['./header-notification.component.scss'],
})
export class HeaderNotificationComponent {
  @Output()
  public hideNotificationsList: EventEmitter<void> = new EventEmitter();

  @Input()
  public set notifications(data: NotificationsInterface[]) {
    if (data) {
      this.unreadCount = 0;
      this.allNotifications = data;
      for (const notification of data) {
        if (notification.status === 0) {
          this.unreadCount++;
        }
      }
    }
  }

  public allNotifications?: NotificationsInterface[];

  public unreadCount: number = 0;

  constructor(
    private notificationService: NotificationsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  public readNotification(id: number, status: number) {
    if (status === 0) {
      this.notificationService.changeStatus(id).subscribe();
    }
    this.hideNotificationsList.emit();
    this.router.navigate(['notifications']);
  }

  public deleteNotification(id: number, event: Event, index: number) {
    event.stopPropagation();
    this.notificationService.delete(id).subscribe(
      () => {
        this.allNotifications?.splice(index, 1);
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
}
