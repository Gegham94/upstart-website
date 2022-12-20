import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api/api-response.interface';
import { CertificateInterface } from '../../interfaces/certificate/certificate.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  public getCertificate(id: number): Observable<ApiResponse<CertificateInterface>> {
    return this.http.get<ApiResponse<CertificateInterface>>(
      `${API_URL}trainer/certificate-info/${id}`,
    );
  }

  public saveCertificateData(body: CertificateInterface): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}trainer/generate-certificate`, body);
  }

  public getCertificatePDF(id: number): Observable<ApiResponse<CertificateInterface>> {
    return this.http.get<ApiResponse<CertificateInterface>>(
      `${API_URL}course/generate-certificate/${id}`,
    );
  }
}
