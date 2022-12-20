import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component';

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
