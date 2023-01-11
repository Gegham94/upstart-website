import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { RoleGuard } from '../../shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      role: ['TR', 'TRC'],
      dashboard: true,
    },
    canActivate: [RoleGuard],
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/dashboard-courses/dashboard-courses.module').then(
        (m) => m.DashboardCoursesModule,
      ),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/dashboard-students/dashboard-students.module').then(
        (m) => m.DashboardStudentsModule,
      ),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./pages/dashboard-resources/dashboard-resources.module').then(
        (m) => m.DashboardResourcesModule,
      ),
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./pages/dashboard-stats/dashboard-stats.module').then((m) => m.DashboardStatsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
