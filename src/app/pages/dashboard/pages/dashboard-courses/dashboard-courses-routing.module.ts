import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCoursesComponent } from './components/dashboard-courses.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCoursesComponent,
    data: {
      dashboard: true,
    },
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/dashboard-create-course/dashboard-create-course.module').then(
        (m) => m.DashboardCreateCourseModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardCoursesRoutingModule {}
