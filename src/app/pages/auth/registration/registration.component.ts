import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { FormTypeEnum } from 'src/app/shared/enums/form-type.enum';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import Validation from '../validation';
import { AuthorizationService } from '../../../shared/services/auth/authorization.service';
import { ApiResponse } from '../../../shared/interfaces/api/api-response.interface';
import { UserRole } from '../../../shared/enums/user-role';

@Component({
  selector: 'us-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  private readonly title: string = 'auth.register.title';

  public readonly buttonTheme = ButtonTheme;

  public readonly formTypeEnum = FormTypeEnum;

  public readonly userRole = UserRole;

  public loader: boolean = false;

  public fieldTextType = false;

  public errorMessage: string | undefined;

  public readonly studentForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
      verifyPassword: new FormControl('', [
        Validators.required,
        // Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
    },
    {
      validators: [Validation.match('password', 'verifyPassword')],
    },
  );

  public readonly trainerForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
      verifyPassword: new FormControl('', Validators.required),
    },
    {
      validators: [Validation.match('password', 'verifyPassword')],
    },
  );

  public readonly trainingForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      identityNum: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.pattern('^[0-9]*$'),
      ]),
      trainingName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]),
      verifyPassword: new FormControl('', Validators.required),
    },
    {
      validators: [Validation.match('password', 'verifyPassword')],
    },
  );

  public isStudent: boolean = true;

  public type: FormTypeEnum = FormTypeEnum.student;

  constructor(
    private router: Router,
    private readonly translatedTitleService: TranslatedTitleService,
    private registrationUser: AuthorizationService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public get fS(): { [key: string]: AbstractControl } {
    return this.studentForm.controls;
  }

  public get fTr(): { [key: string]: AbstractControl } {
    return this.trainerForm.controls;
  }

  public get fTg(): { [key: string]: AbstractControl } {
    return this.trainingForm.controls;
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // public get f(): { [key: string]: FormControl } {
  //   return this.studentForm.controls;
  // }

  public goLogin() {
    this.router.navigate(['auth/login']);
  }

  public changeType(type: FormTypeEnum) {
    this.type = type;
    this.isStudent = this.type === this.formTypeEnum.student;
    this.studentForm.reset();
    this.trainerForm.reset();
    this.trainingForm.reset();
    this.errorMessage = '';
  }

  public submitForm() {
    this.loader = true;
    const form = this.isStudent
      ? this.studentForm.getRawValue()
      : this.type === this.formTypeEnum.trainer
      ? this.trainerForm.getRawValue()
      : this.trainingForm.getRawValue();
    const roleId = this.isStudent
      ? this.userRole.STUDENT
      : this.type === this.formTypeEnum.trainer
      ? this.userRole.TRAINER
      : this.userRole.TRAINING_CENTER;
    this.registrationUser
      .signup({ ...form, email: form.email?.toLowerCase() ?? null }, roleId)
      .subscribe(
        (res: ApiResponse) => {
          if (res.success) {
            this.loader = false;
            this.router.navigate(['']);
          } else {
            this.errorMessage = res.errors?.['email'] as string;
            this.loader = false;
          }
        },
        // (error) => {
        //   // this.showSuccess(this.errorMessage);
        //   return of(error);
        // },
      );
  }
}
