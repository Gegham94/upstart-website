import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { AuthComponent } from './auth.component';
import { IconModule } from '../../shared/components/icon/icon.module';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, ResetPasswordComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    TranslateModule,
    ButtonModule,
    IconModule,
  ],
})
export class AuthModule {}
