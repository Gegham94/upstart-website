import { Component } from '@angular/core';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { TranslateService } from '@ngx-translate/core';
import { ButtonTheme } from '../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly title: string = 'home.title';

  public readonly buttonTheme = ButtonTheme;

  constructor(
    private readonly translateService: TranslateService,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public languageChanged(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    this.translateService.use(language);
  }
}
