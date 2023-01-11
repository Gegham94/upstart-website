import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { AuthComponent } from './components/auth.component';
import { IconModule } from '../../shared/components/icon/icon.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ValidationErrorModule } from '../../shared/directives/validation-error/validation-error.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { SocialRegistrationModalComponent } from './modals/social-registration-modal/components/social-registration-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthComponent,
    RegistrationFormComponent,
    SocialRegistrationModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    TranslateModule,
    ButtonModule,
    IconModule,
    SocialLoginModule,
    ValidationErrorModule,
    MatDialogModule,
  ],
  exports: [RegistrationFormComponent],
})
export class AuthModule {}
