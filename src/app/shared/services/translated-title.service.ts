import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslatedTitleService {
  private readonly titleSuffix: string = '| Upstart';

  private title = '';

  constructor(
    private readonly titleService: Title,
    private readonly translateService: TranslateService,
  ) {}

  public setTranslatedTitle(newTitle: string): void {
    this.title = newTitle;
    this.translateService.get(newTitle).subscribe((translatedNewTitle) => {
      this.titleService.setTitle(translatedNewTitle + ' ' + this.titleSuffix);
    });
  }

  public updateTitle(): void {
    this.setTranslatedTitle(this.title);
  }
}
