import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';

@Component({
  selector: 'us-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  private readonly title: string = 'auth.reset.title';

  public readonly buttonTheme = ButtonTheme;

  public readonly emailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public goRegistration() {
    this.router.navigate(['auth/registration']);
  }

  public submitForm() {
    console.log('asdasd');
  }
}
