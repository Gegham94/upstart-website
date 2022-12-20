import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardStudentsComponent } from './component/dashboard-students.component';
import { CoursesForStudentComponent } from './component/courses-for-student/courses-for-student.component';
import { StudentsCourseContentComponent } from './component/students-course-content/students-course-content.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardStudentsComponent,
    data: {
      dashboard: true,
    },
  },
  {
    path: ':id/courses',
    component: CoursesForStudentComponent,
    data: {
      dashboard: true,
    },
  },
  {
    path: 'courses/lessons/:id',
    component: StudentsCourseContentComponent,
    data: {
      dashboard: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardStudentsRoutingModule {}
