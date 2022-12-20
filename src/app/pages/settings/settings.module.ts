import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { IconModule } from '../../shared/components/icon/icon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '../../shared/components/forms/editor/editor.module';
import { InputModule } from '../../shared/components/forms/input/input.module';
import { ButtonModule } from '../../shared/components/button/button.module';
import { UserInfoModule } from '../../shared/components/user-info/user-info.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ValidationErrorModule } from '../../shared/directives/validation-error/validation-error.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    IconModule,
    EditorModule,
    InputModule,
    ButtonModule,
    UserInfoModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    ValidationErrorModule,
  ],
  providers: [],
})
export class SettingsModule {}
