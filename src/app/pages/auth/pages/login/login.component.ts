import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subject, takeUntil } from 'rxjs';
import * as $ from 'jquery';

import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { AuthorizationService } from '../../../../shared/services/auth/authorization.service';
import { CreatedUserInterface } from '../../../../shared/interfaces/createdUser.interface';
import { ApiResponse } from '../../../../shared/interfaces/api/api-response.interface';
import { ApiError } from '../../../../shared/interfaces/api/api-error.interface';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { SocialRegistrationModalComponent } from '../../modals/social-registration-modal/components/social-registration-modal.component';
import { SocialRegistrationModalData } from '../../modals/social-registration-modal/interfaces/social-registration-modal-data.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'us-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public emailError: string = '';

  public loader: boolean = false;

  public errorMessage: string = '';

  public passwordError: string = '';

  public isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;

  public readonly buttonTheme = ButtonTheme;

  public isloggetIn: boolean = false;

  public fieldTextType = false;

  public readonly loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
    ]),
  });

  @ViewChild('googleBtn')
  public googleBtn: ElementRef;

  private readonly title: string = 'auth.login.title';

  private socialUser?: SocialUser;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly socialAuthService: SocialAuthService,
    private readonly loginUser: AuthorizationService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog,
    public readonly translateService: TranslateService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
    this.socialAuthService.authState.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      if (user) {
        this.loader = true;
        this.socialUser = user;

        this.loginUser
          .socialLogin({
            provider: user.provider,
            unique_id: user.id,
          })
          .subscribe(
            (res) => {
              if (res.success) {
                if (res.data?.api_token) {
                  this.router.navigate(['']);
                } else {
                  this.openSocialRegistrationDialog();
                }
              } else {
                this.toastr.error(res.message);
              }
              this.loader = false;
            },
            (error: Error) => {
              this.toastr.error(error.message);
              this.loader = false;
              return of(error);
            },
          );
      }
    });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public clickGoogleButton(): void {
    $(this.googleBtn.nativeElement).find('div').click();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public facebookLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  public openSocialRegistrationDialog(): void {
    this.dialog.open<SocialRegistrationModalComponent, SocialRegistrationModalData>(
      SocialRegistrationModalComponent,
      {
        width: '80vw',
        height: '90vh',
        panelClass: 'social-registration-modal__body',
        data: {
          defaultValues: {
            ...this.socialUser,
          },
        },
      },
    );
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public goRegistration() {
    this.router.navigate(['auth/registration']);
  }

  public goReset() {
    this.router.navigate(['auth/reset']);
  }

  public submitForm() {
    this.loader = true;
    const form = this.loginForm.getRawValue();
    this.loginUser.login({ ...form, email: form.email?.toLowerCase() ?? null }).subscribe(
      (res: ApiResponse<CreatedUserInterface>) => {
        if (res.data?.api_token) {
          this.loader = false;
          this.router.navigate(['']);
        } else {
          this.router.navigate(['auth/login']);
        }
      },
      (error: ApiError<string>) => {
        this.errorMessage = error.error.message;
        this.loader = false;
        return of(error);
      },
    );
  }

  public showSuccess(error: string) {
    this.toastr.error(error, 'Unable to Login');
  }
}
