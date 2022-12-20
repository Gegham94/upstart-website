import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { DashboardCoursesRoutingModule } from './dashboard-courses-routing.module';
import { DashboardCoursesComponent } from './components/dashboard-courses.component';

import { IconModule } from '../../../../shared/components/icon/icon.module';
import { ButtonModule } from '../../../../shared/components/button/button.module';
import { DashboardCourseComponent } from './components/dashboard-course/dashboard-course.component';
import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { CourseFormService } from './pages/dashboard-create-course/services/course-form.service';
import { FileUploadService } from '../../../../shared/services/file-upload.service';
import { PaginationModule } from '../../../../shared/components/pagination/pagination.module';
import { DropdownModule } from '../../../../shared/directives/dropdown/dropdown.module';
import { TranslateModule } from '@ngx-translate/core';
import { CourseTypeModule } from 'src/app/shared/modules/course-type/course-type.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import { SelectModule } from '../../../../shared/components/select/select.module';
import { ClickOutsideModule } from '../../../../shared/directives/click-outside/click-outside.module';

@NgModule({
  declarations: [DashboardCoursesComponent, DashboardCourseComponent],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    DashboardCoursesRoutingModule,
    CKEditorModule,
    ButtonModule,
    IconModule,
    PipesModule,
    PaginationModule,
    DropdownModule,
    TranslateModule,
    CourseTypeModule,
    MatProgressBarModule,
    NgxPaginationModule,
    SelectModule,
    ClickOutsideModule,
  ],
  providers: [CourseFormService, FileUploadService],
})
export class DashboardCoursesModule {}
