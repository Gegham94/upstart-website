import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { AuthorizationService } from '../../../shared/services/auth/authorization.service';
import { CreatedUserInterface } from '../../../shared/interfaces/createdUser.interface';
import { ApiResponse } from '../../../shared/interfaces/api/api-response.interface';
import { ApiError } from '../../../shared/interfaces/api/api-error.interface';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'us-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly title: string = 'auth.login.title';

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

  @ViewChild('googleBtn') private googleBtn: ElementRef | unknown;

  constructor(
    private router: Router,
    private readonly translatedTitleService: TranslatedTitleService,
    private loginUser: AuthorizationService,
    private toastr: ToastrService,
  ) {
    // FB.init({
    //   appId: 'my key',
    //   autoLogAppEvents: true,
    //   xfbml: true,
    //   version: 'v8.0',
    // });
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
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
        if (res.data.api_token) {
          this.loader = false;
          this.router.navigate(['']);
        } else {
          this.router.navigate(['auth/login']);
        }
      },
      (error: ApiError<string>) => {
        this.errorMessage = error.error.message;
        // this.showSuccess(this.errorMessage);
        this.loader = false;
        return of(error);
      },
    );
  }

  public showSuccess(error: string) {
    this.toastr.error(error, 'Unable to Login');
  }

  // ngAfterViewInit(): void {
  //   // this.googleInit()
  // }

  //  public googleInit(btn?:any) {
  //    const self = this;
  //    let auth2;
  //    gapi.load("auth2", function () {
  //
  //      auth2 = gapi.auth2.init({
  //        client_id:"211670253826-k1je5ikjku6ggjoknnqrgmgid913ufjd.apps.googleusercontent.com"
  //      });
  //
  //      auth2.then(
  //        function () {},
  //        function (error:string) {
  //        }
  //      );
  //      self.attachSignin(
  //        auth2,
  //        btn ? btn.nativeElement : self.googleBtn.nativeElement
  //      );
  //    });
  //  }
  // public attachSignin(auth2:any, element:string) {
  //    let userData;
  //    let profile;
  //    auth2.attachClickHandler(
  //      element,
  //      {},
  //      function (googleUser:any) {
  //        profile = googleUser.getBasicProfile();
  //        // userData = {
  //        //   id: profile.getId(),
  //        //   googleId: profile.getId(),
  //        //   fullName: profile.getName(),
  //        //   email: profile.getEmail(),
  //        //   firstName: profile.getGivenName(),
  //        //   lastName: profile.getFamilyName(),
  //        //   type: 'google'
  //        // }
  //        userData = {
  //          Type: "google",
  //          ID: profile.getId(),
  //          Email: profile.getEmail(),
  //          FirstName: profile.getGivenName(),
  //          LastName: profile.getFamilyName(),
  //          Phone: "",
  //        };
  //      },
  //      function (error:any) {
  //        console.log(error);
  //      }
  //    );
  //  }

  // public fbLogin() {
  //    let userData;
  //    FB.login(
  //      function (response:any) {
  //        if (response.authResponse) {
  //          FB.api(
  //            "/me",
  //            { fields: "name, email, id, first_name, last_name" },
  //            function (res:any) {
  //              if (!res.error) {
  //                // userData = {
  //                //   id: res.id,
  //                //   facebookId: res.id,
  //                //   fullName: res.name,
  //                //   email: res.email ? res.email : null,
  //                //   firstName: res.first_name,
  //                //   lastName: res.last_name,
  //                //   type: 'facebook'
  //                // }
  //                userData = {
  //                  Type: "facebook",
  //                  ID: res.id,
  //                  Email: res.email,
  //                  FirstName: res.first_name,
  //                  LastName: res.last_name,
  //                  Phone: "",
  //                };
  //              }
  //            }
  //          );
  //        } else {
  //          console.log(response, "fbresponse elseeee");
  //        }
  //      },
  //      {
  //        scope: "email",
  //      }
  //    );
  //  }
}
