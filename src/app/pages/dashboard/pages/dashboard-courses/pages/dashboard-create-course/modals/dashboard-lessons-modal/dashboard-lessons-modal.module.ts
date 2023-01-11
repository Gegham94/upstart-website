import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLessonsModalComponent } from './components/dashboard-lessons-modal.component';
import { ButtonModule } from '../../../../../../../../shared/components/button/button.module';
import { DashboardCreateCourseModule } from '../../dashboard-create-course.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardLessonsModalComponent],
  imports: [CommonModule, ButtonModule, DashboardCreateCourseModule, TranslateModule],
})
export class DashboardLessonsModalModule {}
