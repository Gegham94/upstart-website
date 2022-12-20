import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResourceUpload } from '../../interfaces/resources/resource-upload';
import { ResourceData } from '../../interfaces/resources/resource-data';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { SuccessApi } from '../../interfaces/success-api/success-api';
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  public addResource(resource: ResourceUpload): Observable<ResourceUpload> {
    const body = {
      path: resource.path,
      title: resource.title,
    };
    return this.http.post<ResourceUpload>(`${API_URL}resources/create`, body);
  }

  public getResources(): Observable<ApiResponse<ResourceData>> {
    return this.http.get<ApiResponse<ResourceData>>(`${API_URL}resources`);
  }

  public deleteResource(id: number): Observable<SuccessApi> {
    return this.http.delete<SuccessApi>(`${API_URL}resources/delete/${id}`, {});
  }

  public updateResource(data: ResourceUpload): Observable<SuccessApi> {
    const body = {
      id: data.id,
      title: data.title,
    };
    return this.http.put<SuccessApi>(`${API_URL}resources/update`, body);
  }
}
