import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';

@Component({
  selector: 'us-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', './notifications.comonent.media.scss'],
})
export class NotificationsComponent implements OnInit {
  public allNotifications?: NotificationsInterface[];

  public newNotifications?: NotificationsInterface[];

  public unreadCount: number = 0;

  public isLoading: boolean = false;

  constructor(
    private readonly notificationService: NotificationsService,
    private readonly router: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.getNotifications();
  }

  private getNotifications() {
    this.isLoading = true;
    this.notificationService.getNotifications().subscribe(({ data }) => {
      this.allNotifications = data;
      for (const notification of data) {
        if (notification.status === 0) {
          this.unreadCount++;
        }
      }
      this.isLoading = false;
    });
  }

  public readNotification(id: number, status: number) {
    if (status === 0) {
      this.notificationService.changeStatus(id).subscribe();
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
        this.unreadCount = 0;
        this.getNotifications();
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }
}
