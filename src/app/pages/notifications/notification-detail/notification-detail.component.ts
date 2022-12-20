import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications/notifications.interface';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'us-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss', './notification-detail.component.media.scss'],
})
export class NotificationDetailComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();

  public notification?: NotificationsInterface;

  private id!: number;

  constructor(
    private readonly notificationService: NotificationsService,
    private readonly router: ActivatedRoute,
    private readonly route: Router,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
      this.id = res['id'];
      if (this.id) {
        this.getNotifications();
      }
    });
  }

  private getNotifications() {
    this.notificationService.getNotification(this.id).subscribe(({ data }) => {
      this.notification = data[0];
    });
  }

  public deleteNotification() {
    this.notificationService.delete(this.id).subscribe(
      () => {
        this.route.navigateByUrl('/notifications');
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
