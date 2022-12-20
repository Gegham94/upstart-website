import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { NotificationsInterface } from '../../interfaces/notifications/notifications.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public lang: string = '';

  constructor(private http: HttpClient) {}

  public getNotifications() {
    return this.http.get<ApiResponse<NotificationsInterface[]>>(`${API_URL}get-notifications`);
  }

  public getNotification(id: number) {
    return this.http.get<ApiResponse<NotificationsInterface[]>>(
      `${API_URL}get-notifications/${id}`,
    );
  }

  public changeStatus(id: number) {
    return this.http.get(`${API_URL}change-notification-status?id=${id}`);
  }

  public markAsRead() {
    return this.http.post(`${API_URL}mark-as-read`, '');
  }

  public delete(id: number) {
    return this.http.delete(`${API_URL}notification/remove/${id}`);
  }
}
