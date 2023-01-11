import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonTheme } from '../../shared/enums/button-theme.enum';
import { InputTypeEnum } from '../../shared/enums/input-type.enum';
import {
  CurrentUserInfoInterface,
  UploadFileData,
} from '../../shared/interfaces/current-user.interface';
import { filter, Subject, takeUntil } from 'rxjs';
import { SettingsService } from '../../shared/services/settings/settings.service';
import {
  ErrorInput,
  MetaDataFormGroup,
  MetaDataInterface,
  TrainerMetaInterface,
} from '../../shared/interfaces/settings.interface';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../shared/services/global.service';
import { AuthorizationService } from '../../shared/services/auth/authorization.service';
import { CurrentUserInfoService } from '../../shared/services/current-user-info/current-user-info.service';
import { TranslatedTitleService } from '../../shared/services/translated-title.service';
import { UserRole } from '../../shared/enums/user-role';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('input')
  public inputRef: ElementRef<HTMLInputElement>;

  public readonly title: string = 'settings.profile_settings';

  public readonly buttonTheme = ButtonTheme;

  public readonly inputTypeEnum = InputTypeEnum;

  public readonly userRole = UserRole;

  public unsubscribe$: Subject<void> = new Subject<void>();

  public userInfo!: CurrentUserInfoInterface | null;

  public userAvatar!: string;

  public isUpload: boolean = true;

  public trainerData: TrainerMetaInterface;

  public errors?: ErrorInput | object;

  public loader = false;

  public loaderFirstData!: boolean;

  public activeInputs = true;

  public changeTypeBtn: boolean = true;

  public showChangePasswordInputs = false;

  public getData: MetaDataFormGroup;

  public URLreg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  public URLYoutube: string = '^(https?\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.be)\\/.+$';

  public settingsForm = new FormGroup({
    first_name: new FormControl<string>('', Validators.required),
    last_name: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>(''),
    headline: new FormControl<string>('', [Validators.minLength(5)]),
    bio: new FormControl<string>(''),
    website: new FormControl<string>('', Validators.pattern(this.URLreg)),
    twitter: new FormControl<string>('', Validators.pattern(this.URLreg)),
    facebook: new FormControl<string>('', Validators.pattern(this.URLreg)),
    linkedin: new FormControl<string>('', Validators.pattern(this.URLreg)),
    youtube: new FormControl<string>('', Validators.pattern(this.URLYoutube)),
    tax_identity_number: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(8),
      Validators.minLength(8),
      Validators.pattern('^[0-9]*$'),
    ]),
    company_name: new FormControl<string>('', Validators.required),
  });

  public changeCredentials = new FormGroup({
    email: new FormControl(''),
    current_password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
    ]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
    ]),
    verifyPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[A-Za-z0-9_]\\w{7,15}$'),
    ]),
  });

  constructor(
    private authorizationService: AuthorizationService,
    private currentUserInfoService: CurrentUserInfoService,
    private globalService: GlobalService,
    private settingsService: SettingsService,
    private toastr: ToastrService,
    private readonly translatedTitleService: TranslatedTitleService,
    private translateService: TranslateService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.settingsForm.valueChanges.subscribe((value) => {
      for (let key in value) {
        // @ts-ignore
        if (value[key] && value[key].trim() !== this.getData?.[key as keyof MetaDataFormGroup]) {
          this.changeTypeBtn = false;
        }
      }
    });
    this.currentUserInfo();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private currentUserInfo() {
    this.globalService.currentUserObservable
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((res) => res !== null),
      )
      .subscribe((data) => {
        this.userInfo = data;
        this.getTrainerMetaData();
      });
  }

  public getCurrentUserInfo() {
    this.currentUserInfoService.getUserInfo().subscribe((userInfo) => {
      this.globalService.currentUser = userInfo.data;
    });
  }

  private getTrainerMetaData() {
    this.loaderFirstData = true;
    this.settingsService
      .getTrainerData(this.userInfo?.id)
      .subscribe((res: TrainerMetaInterface) => {
        this.trainerData = res;
        this.fillForm(this.trainerData?.data);
        this.validateForm(this.userInfo?.role_id!);
        this.loaderFirstData = false;
        this.changeCredentials.patchValue({
          email: this.trainerData?.data?.email,
        });
      });
  }

  public fillForm(formData: MetaDataInterface) {
    const data = {
      ...formData,
      ...formData?.links,
    };
    delete data.links;
    this.getData = data;
    this.settingsForm.patchValue(data);
  }

  public validateForm(role_id: number) {
    if (role_id === this.userRole.STUDENT) {
      this.trainingName.clearValidators();
      this.identityNum.clearValidators();
      this.biography.clearValidators();
    } else if (role_id === this.userRole.TRAINER) {
      this.trainingName.clearValidators();
      this.identityNum.clearValidators();
    }
    this.trainingName.updateValueAndValidity();
    this.identityNum.updateValueAndValidity();
  }

  public get firstName(): FormControl {
    return this.settingsForm.get('first_name') as FormControl;
  }

  public get lastName(): FormControl {
    return this.settingsForm.get('last_name') as FormControl;
  }

  public get phone(): FormControl {
    return this.settingsForm.get('phone') as FormControl;
  }

  public get headline(): FormControl {
    return this.settingsForm.get('headline') as FormControl;
  }

  public get biography(): FormControl {
    return this.settingsForm.get('bio') as FormControl;
  }

  public get website(): FormControl {
    return this.settingsForm.get('website') as FormControl;
  }

  public get twitter(): FormControl {
    return this.settingsForm.get('twitter') as FormControl;
  }

  public get facebook(): FormControl {
    return this.settingsForm.get('facebook') as FormControl;
  }

  public get linkedIn(): FormControl {
    return this.settingsForm.get('linkedin') as FormControl;
  }

  public get youtube(): FormControl {
    return this.settingsForm.get('youtube') as FormControl;
  }

  public get identityNum(): FormControl {
    return this.settingsForm.get('tax_identity_number') as FormControl;
  }

  public get trainingName(): FormControl {
    return this.settingsForm.get('company_name') as FormControl;
  }

  public get email(): FormControl {
    return this.changeCredentials.get('email') as FormControl;
  }

  public get oldPassword(): FormControl {
    return this.changeCredentials.get('current_password') as FormControl;
  }

  public get newPassword(): FormControl {
    return this.changeCredentials.get('new_password') as FormControl;
  }

  public get verifyPassword(): FormControl {
    return this.changeCredentials.get('verifyPassword') as FormControl;
  }

  public saveSettingsChanges() {
    this.loader = true;
    const { website, twitter, facebook, linkedin, youtube, ...links } = this.settingsForm.value;
    let body = {
      avatar: this.userAvatar || this.trainerData?.data?.avatar_path,
      links: { website, twitter, facebook, linkedin, youtube },
      ...links,
    };
    this.settingsService
      .updateTrainerData(body as MetaDataInterface)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (metaData: MetaDataInterface) => {
          if (metaData.success) {
            this.toastr.success(this.translateService.instant('toast-messages.success'));
            this.getCurrentUserInfo();
          } else if (metaData.errors) {
            this.errors = metaData.errors;
          }
          this.loader = false;
        },
        () => {
          this.loader = false;
        },
      );
  }

  public showChangePassword() {
    this.showChangePasswordInputs = !this.showChangePasswordInputs;
  }

  public savePasswordChanges() {
    this.loader = true;
    const data = {
      current_password: this.changeCredentials.value.current_password!,
      new_password: this.changeCredentials.value.new_password!,
    };
    this.authorizationService
      .updateUser(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toastr.success(this.translateService.instant('toast-messages.password-update'));
        this.showChangePasswordInputs = false;
        this.loader = false;
      });
  }

  public checkPassword() {
    if (this.oldPassword.invalid) {
      return;
    }
    this.authorizationService
      .checkPasswordUser(this.oldPassword.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this.toastr.success(this.translateService.instant('toast-messages.password-confirmed'));
          this.activeInputs = false;
        } else {
          this.toastr.error(this.translateService.instant('toast-messages.password-invalid'));
        }
      });
  }

  public getImagePath(event: UploadFileData) {
    if (event) {
      this.userAvatar = event.path;
    } else {
      this.userAvatar = '';
    }
    this.getCurrentUserInfo();
  }

  public cancel() {
    this.fillForm(this.trainerData?.data);
  }

  public changeUploadFunc(isUpload: boolean) {
    if (isUpload === this.isUpload) {
      return;
    }
    this.isUpload = isUpload;
  }

  public get getUserRole() {
    if (this.userInfo?.role_id === this.userRole.STUDENT) {
      return 'ST';
    } else if (this.userInfo?.role_id === this.userRole.TRAINER) {
      return 'TR';
    } else if (this.userInfo?.role_id === this.userRole.TRAINING_CENTER) {
      return 'TRC';
    }
    return '';
  }
}
