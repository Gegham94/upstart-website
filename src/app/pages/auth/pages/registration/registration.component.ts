import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { UserRole } from '../../../../shared/enums/user-role';

@Component({
  selector: 'us-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public readonly buttonTheme = ButtonTheme;

  public readonly userRole = UserRole;

  private readonly title: string = 'auth.register.title';

  constructor(
    private router: Router,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  // public get f(): { [key: string]: FormControl } {
  //   return this.studentForm.controls;
  // }

  public goLogin() {
    this.router.navigate(['auth/login']);
  }
}
