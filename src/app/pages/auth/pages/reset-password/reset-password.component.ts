import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { AuthorizationService } from '../../../../shared/services/auth/authorization.service';
import { mergeWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ApiError } from '../../../../shared/interfaces/api/api-error.interface';

@Component({
  selector: 'us-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public readonly isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;

  public readonly emailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  public loader: boolean = false;

  public resetForm: FormGroup;

  public passwordFieldTextType: boolean = false;

  public confirmPasswordFieldTextType: boolean = false;

  private readonly title: string = 'auth.reset.title';

  private resetToken: string = '';

  private userEmail: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthorizationService,
    private readonly translateService: TranslateService,
    private readonly toastr: ToastrService,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  public ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
      confirm: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
    });

    this.route.params.pipe(mergeWith(this.route.queryParams)).subscribe((res) => {
      if (res['token']) {
        this.resetToken = res['token'];
      }

      if (res['email']) {
        this.userEmail = res['email'];
      }
    });
  }

  public passwordToggleFieldTextType(): void {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }

  public confirmPasswordToggleFieldTextType(): void {
    this.confirmPasswordFieldTextType = !this.confirmPasswordFieldTextType;
  }

  public resetPassword(): void {
    this.loader = true;

    this.authService
      .resetPassword({
        email: this.userEmail,
        password: this.resetForm.value.password,
        password_confirmation: this.resetForm.value.confirm,
        token: this.resetToken,
      })
      .subscribe(
        (res) => {
          if (!res.success) {
            if (!res.message) {
              const passwordErrors = (res.errors?.['password'] as string[])?.join('\n');
              const confirmErrors = (res.errors?.['password_confirmation'] as string[])?.join('\n');

              this.resetForm.get('password')?.setErrors({ custom: passwordErrors });
              this.resetForm.get('confirm')?.setErrors({
                custom: confirmErrors,
              });

              const errorLine =
                (passwordErrors ? passwordErrors : '') +
                '\n' +
                (confirmErrors ? confirmErrors : '');
              this.toastr.error(errorLine);
            } else {
              this.toastr.error(res.message);
            }
          } else {
            this.toastr.success(res.message);
            this.router.navigate(['auth', 'login']);
          }
          this.loader = false;
        },
        (error: ApiError) => {
          this.toastr.error(error.error.message);
          this.loader = false;
        },
      );
  }
}
