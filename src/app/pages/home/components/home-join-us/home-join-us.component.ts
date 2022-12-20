import { Component } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-home-join-us',
  templateUrl: './home-join-us.component.html',
  styleUrls: ['./home-join-us.component.scss', './home-join-us.component.media.scss'],
})
export class HomeJoinUsComponent {
  public readonly buttonTheme = ButtonTheme;
}
