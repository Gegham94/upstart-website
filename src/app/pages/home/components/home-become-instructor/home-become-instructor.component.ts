import { Component } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-home-become-instructor',
  templateUrl: './home-become-instructor.component.html',
  styleUrls: [
    './home-become-instructor.component.scss',
    './home-become-instructor.component.media.scss',
  ],
})
export class HomeBecomeInstructorComponent {
  public readonly buttonTheme = ButtonTheme;
}
