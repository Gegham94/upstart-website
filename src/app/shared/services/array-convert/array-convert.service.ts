import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayConvertService {
  public convertToArray(value: string): string[] {
    // let temp = String(value);
    // temp = temp.replace(/\\/g, '');
    // temp = temp.replace(/"/g, '');
    // temp = temp.replace(/]/g, '');
    // temp = temp.slice(1, temp.length);

    return JSON.parse(value);
  }
}
