import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { TrainerCourse } from '../../interfaces/courses/trainer-course';
import { SuccessApi } from '../../interfaces/success-api/success-api';
import { GlobalService } from '../global.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthAttantionComponent } from '../../modules/modal/components/auth-attantion/auth-attantion.component';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private matDialog: MatDialog,
  ) {}

  public getProducts(): Observable<ApiResponse<TrainerCourse[]>> {
    return this.http.get<ApiResponse<TrainerCourse[]>>(`${API_URL}basket/list`);
  }

  public deleteFromBasket(id: number): Observable<ApiResponse<SuccessApi>> {
    return this.http.post<ApiResponse<SuccessApi>>(`${API_URL}basket/remove/${id}`, {});
  }

  public addToBasket(courseId: number, userId?: number): Observable<SuccessApi> {
    const requestBody = {
      course_id: courseId,
      user_id: userId,
    };
    if (this.globalService.isAuthenticated) {
      return this.http.post<SuccessApi>(`${API_URL}basket/add`, requestBody);
    } else {
      this.matDialog.open(AuthAttantionComponent, this.dialogConfig('600px', 'max-content'));
      return new Observable<SuccessApi>();
    }
  }

  private dialogConfig(width: string, height: string): object {
    const config = {
      width: width,
      height: height,
      panelClass: 'attention-dialog',
    };
    return config;
  }
}
