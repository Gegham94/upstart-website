import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { IFavorites } from '../../interfaces/favorites/Ifavorites';
import { GlobalService } from '../global.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthAttantionComponent } from '../../modules/modal/components/auth-attantion/auth-attantion.component';
import { PublicCourse } from '../../interfaces/courses/public-course.interface';
type SuccessType = {
  success: string;
};
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private dialog: MatDialog,
  ) {}

  public getFavorites(): Observable<ApiResponse<PublicCourse[]>> {
    return this.http.get<ApiResponse<PublicCourse[]>>(`${API_URL}wish/list`);
  }

  public removeFromWishList(id: number): Observable<ApiResponse> {
    if (this.globalService.isAuthenticated) {
      return this.http.delete<ApiResponse<SuccessType>>(`${API_URL}wish/remove/${id}`, {});
    } else {
      this.dialog.open(AuthAttantionComponent, this.dialogConfig('600px', '200px'));
      return new Observable<ApiResponse>();
    }
  }

  public addIntoFavorites(courseId: number): Observable<IFavorites> {
    if (this.globalService.isAuthenticated) {
      const params = {
        course_id: courseId,
      };
      return this.http.post(`${API_URL}wish/add`, params);
    } else {
      this.dialog.open(AuthAttantionComponent, this.dialogConfig('600px', 'max-content'));
      return new Observable<IFavorites>();
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
