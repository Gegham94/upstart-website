import { Component } from '@angular/core';
import { TranslatedTitleService } from '../../../services/translated-title.service';

@Component({
  selector: 'us-warning-message',
  templateUrl: './warning-message.component.html',
  styleUrls: ['./warning-message.component.scss'],
})
export class WarningMessageComponent {
  public title = 'dashboard.courses.warning';

  public hideMessage: boolean = true;

  constructor(private readonly translatedTitleService: TranslatedTitleService) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }
}
