import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDate',
})
export class TranslateDatePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  public transform(value: Date | undefined, pattern: string = 'mediumDate'): unknown {
    const datePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, pattern);
  }
}
