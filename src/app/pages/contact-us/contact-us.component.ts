import { Component } from '@angular/core';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';

@Component({
  selector: 'us-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss', './contact-us.component.media.scss'],
})
export class ContactUsComponent {
  public readonly buttonTheme = ButtonTheme;
}
