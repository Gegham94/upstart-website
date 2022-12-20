import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api/api-response.interface';
import { environment } from '../../../environments/environment';
import { FileUploadResponse } from '../interfaces/file-upload-response.interface';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;

@Injectable()
export class FileUploadService {
  constructor(private readonly httpClient: HttpClient) {}

  public uploadFile(file: File, location: string): Observable<ApiResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', location);

    return this.httpClient.post<ApiResponse<FileUploadResponse>>(`${API_URL}file-upload`, formData);
  }
}
