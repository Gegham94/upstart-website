import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import {
  NotificationsInterface,
  NotificationsUnread,
} from '../../interfaces/notifications/notifications.interface';
import { Observable, tap } from 'rxjs';
import { GlobalNotificationsService } from './global-notifications.service';

const API_URL = environment.apiUrl;

let number = 0;

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public lang: string = '';

  constructor(
    private readonly http: HttpClient,
    private readonly globalNotificationService: GlobalNotificationsService,
  ) {}

  public getNotifications() {
    number++;
    return this.http
      .get<ApiResponse<NotificationsInterface[]>>(`${API_URL}get-notifications`, {
        params: {
          dummy: number,
        },
      })
      .pipe(
        tap(({ data }) => {
          this.globalNotificationService.updateAllNotifications(data);
        }),
      );
  }

  public getNotification(id: number) {
    return this.http.get<ApiResponse<NotificationsInterface[]>>(
      `${API_URL}get-notifications/${id}`,
    );
  }

  public changeStatus(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}change-notification-status?id=${id}`);
  }

  public markAsRead() {
    return this.http.post(`${API_URL}mark-as-read`, '').pipe(
      tap(() => {
        this.getNotifications().subscribe();
      }),
    );
  }

  public delete(id: number) {
    return this.http.delete(`${API_URL}notification/remove/${id}`);
  }

  public unread(): Observable<NotificationsUnread> {
    number++;

    return this.http.get<NotificationsUnread>(`${API_URL}get-unread-notifications-count`, {
      params: {
        dummy: number,
      },
    });
  }

  public getNotificationList() {
    number++;
    return this.http
      .get<ApiResponse<NotificationsInterface[]>>(`${API_URL}get-last-notifications`, {
        params: {
          dummy: number,
        },
      })
      .pipe(
        tap(({ notifications }) => {
          this.globalNotificationService.updateLastNotifications(notifications);
        }),
      );
  }
}
