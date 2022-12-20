import { Component } from '@angular/core';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { TranslatedTitleService } from '../../shared/services/translated-title.service';

@Component({
  selector: 'us-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss', './not-found.component.media.scss'],
})
export class NotFoundComponent {
  public readonly title: string = 'global.header.not-found';

  public readonly buttonTheme = ButtonTheme;

  constructor(private readonly translatedTitleService: TranslatedTitleService) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }
}
