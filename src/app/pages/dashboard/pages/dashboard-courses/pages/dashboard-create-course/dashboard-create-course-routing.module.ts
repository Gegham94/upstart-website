import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCreateCourseComponent } from './components/dashboard-create-course.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCreateCourseComponent,
    data: {
      dashboard: true,
    },
  },
  {
    path: ':id',
    component: DashboardCreateCourseComponent,
    data: {
      dashboard: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardCreateCourseRoutingModule {}
