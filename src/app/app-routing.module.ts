import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnAuthGuard } from './shared/guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UnAuthGuard],
  },
  {
    path: 'courses/:id',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/course-view/course-view.module').then((m) => m.CourseViewModule),
  },
  {
    path: 'course/:id',
    loadChildren: () =>
      import('./pages/course-view/course-view.module').then((m) => m.CourseViewModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then((m) => m.NotificationsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/trainer/trainer.module').then((m) => m.TrainerModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./pages/privacy-policy/privacy.module').then((m) => m.PrivacyModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./pages/contact-us/contact-us.module').then((m) => m.ContactUsModule),
  },
  {
    path: 'my-learning',
    loadChildren: () =>
      import('./pages/my-learning/my-learning.module').then((m) => m.MyLearningModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'ignore',
      scrollPositionRestoration: 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
