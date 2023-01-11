import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { AuthorizationService } from '../../../../shared/services/auth/authorization.service';
import { ApiError } from '../../../../shared/interfaces/api/api-error.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'us-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public readonly isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;

  public readonly emailForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  public loader: boolean = false;

  public resetForm: FormGroup;

  private readonly title: string = 'auth.reset.title';

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthorizationService,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
    });
  }

  public resetPassword(): void {
    this.loader = true;

    this.authService.requestResetMail(this.resetForm.value.email).subscribe(
      (res) => {
        if (res.success) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
        this.loader = false;
      },
      (err: ApiError) => {
        this.toastr.error(err.error.message);
      },
    );
  }
}
