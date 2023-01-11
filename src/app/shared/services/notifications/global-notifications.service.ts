import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsInterface } from '../../interfaces/notifications/notifications.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalNotificationsService {
  public readonly allNotifications: BehaviorSubject<NotificationsInterface[] | null> =
    new BehaviorSubject<NotificationsInterface[] | null>(null);

  public readonly lastNotifications: BehaviorSubject<NotificationsInterface[] | null> =
    new BehaviorSubject<NotificationsInterface[] | null>(null);

  public updateAllNotifications(data?: NotificationsInterface[]) {
    this.allNotifications.next(data ?? null);
  }

  public updateLastNotifications(data?: NotificationsInterface[]) {
    this.lastNotifications.next(data ?? null);
  }
}
