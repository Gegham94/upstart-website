import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsPreviewService {
  public isPreview(): boolean {
    return window.location.pathname.split('/').includes('preview');
  }
}
