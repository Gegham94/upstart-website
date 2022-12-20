import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UploadFile, UploadFileResponse } from '../interfaces/current-user.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api/api-response.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  public uploadFile(body: UploadFile): Observable<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', body.file, 'image.png');
    formData.append('type', body.type);
    return this.http.post<UploadFileResponse>(`${API_URL}file-upload`, formData);
  }

  public deleteUserAvatar() {
    return this.http.delete<ApiResponse<ApiResponse>>(`${API_URL}user/delete-avatar`);
  }
}
