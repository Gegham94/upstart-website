import { Component, Inject, Input, OnChanges, Optional } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../../validators/validation';
import { FormTypeEnum } from '../../../../shared/enums/form-type.enum';
import { ApiResponse } from '../../../../shared/interfaces/api/api-response.interface';
import { UserRole } from '../../../../shared/enums/user-role';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../../shared/services/auth/authorization.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocialRegistrationModalData } from '../../modals/social-registration-modal/interfaces/social-registration-modal-data.interface';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'us-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnChanges {
  public verifyTextType = false;

  public errorMessage: string | undefined;

  public fieldTextType = false;

  public readonly buttonTheme = ButtonTheme;

  public readonly userRole = UserRole;

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

  public readonly formTypeEnum = FormTypeEnum;

  public loader: boolean = false;

  private socialUser: Partial<SocialUser>;

  @Input()
  public social: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly registrationUser: AuthorizationService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private readonly data: SocialRegistrationModalData,
    @Optional()
    private readonly dialogRef: MatDialogRef<RegistrationFormComponent>,
    private readonly toastr: ToastrService,
  ) {}

  public ngOnChanges(): void {
    if (this.social) {
      (this.trainerForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'password',
      );
      (this.trainerForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'verifyPassword',
      );
      (this.studentForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'password',
      );
      (this.studentForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'verifyPassword',
      );
      (this.trainingForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'password',
      );
      (this.trainingForm as unknown as FormGroup<{ [key: string]: AbstractControl }>).removeControl(
        'verifyPassword',
      );
    } else {
      const passwordControl = new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
      ]);
      const verifyControl = new FormControl('', Validators.required);

      this.trainerForm.addControl('password', passwordControl);
      this.trainerForm.addControl('verifyPassword', verifyControl);
      this.studentForm.addControl('password', passwordControl);
      this.studentForm.addControl('verifyPassword', verifyControl);
      this.trainingForm.addControl('password', passwordControl);
      this.trainingForm.addControl('verifyPassword', verifyControl);
    }

    this.socialUser = this.data?.defaultValues;

    if (this.socialUser) {
      this.trainerForm.patchValue(this.socialUser);
      this.trainerForm.get('email')?.disable();

      this.trainingForm.patchValue(this.socialUser);
      this.trainingForm.get('email')?.disable();

      this.studentForm.patchValue(this.socialUser);
      this.studentForm.get('email')?.disable();
    }
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

  public toggleEye() {
    this.verifyTextType = !this.verifyTextType;
  }

  public changeType(type: FormTypeEnum) {
    this.type = type;
    this.isStudent = this.type === this.formTypeEnum.student;
    this.studentForm.reset(this.socialUser);
    this.trainerForm.reset(this.socialUser);
    this.trainingForm.reset(this.socialUser);
    if (this.social) {
      this.studentForm.get('email')?.disable();
      this.trainerForm.get('email')?.disable();
      this.trainingForm.get('email')?.disable();
    }
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

    if (!this.social) {
      this.registrationUser
        .signup({ ...form, email: form.email?.toLowerCase() ?? null }, roleId)
        .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.loader = false;
            this.dialogRef?.close();
            this.router.navigate(['']);
          } else {
            this.errorMessage = res.errors?.['email'] as string;
            this.loader = false;
          }
        });
    } else {
      this.registrationUser
        .socialLogin({
          ...form,
          role_id: roleId,
          unique_id: this.socialUser.id as string,
          provider: this.socialUser.provider as string,
        })
        .subscribe(
          (res) => {
            if (res.success) {
              if (res.data.api_token) {
                this.router.navigate(['']);
              } else {
                this.router.navigate(['auth/login']);
              }
              this.loader = false;
              this.dialogRef?.close();
            } else {
              this.toastr.error(res.message);
              this.loader = false;
              this.dialogRef?.close();
            }
          },
          (error: Error) => {
            this.toastr.error(error.message);
            this.loader = false;
            this.dialogRef?.close();
            return of(error);
          },
        );
    }
  }

  public closeRegistrationModal(): void {
    this.dialogRef.close();
  }
}
