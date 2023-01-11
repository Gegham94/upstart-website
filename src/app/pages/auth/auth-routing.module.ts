import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthComponent } from './components/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          footerless: true,
        },
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        data: {
          footerless: true,
        },
      },
      {
        path: 'reset',
        component: ForgotPasswordComponent,
        data: {
          footerless: true,
        },
      },
      {
        path: 'password-reset/:token',
        component: ResetPasswordComponent,
        data: {
          footerless: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
