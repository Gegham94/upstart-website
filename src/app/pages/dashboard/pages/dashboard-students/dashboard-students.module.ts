import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardStudentsComponent } from './component/dashboard-students.component';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardStudentsRoutingModule } from './dashboard-students-routing.module';
import { StudentsModule } from '../../../../shared/modules/students/students.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CoursesForStudentComponent } from './component/courses-for-student/courses-for-student.component';
import { InlineCourseModule } from '../../../../shared/modules/inline-course/inline-course.module';
import { StudentsCourseContentComponent } from './component/students-course-content/students-course-content.component';
import { CourseViewModule } from '../../../course-view/course-view.module';

@NgModule({
  declarations: [
    DashboardStudentsComponent,
    CoursesForStudentComponent,
    StudentsCourseContentComponent,
  ],
  imports: [
    CommonModule,
    DashboardStudentsRoutingModule,
    TranslateModule,
    StudentsModule,
    NgxSkeletonLoaderModule,
    InlineCourseModule,
    CourseViewModule,
  ],
})
export class DashboardStudentsModule {}
