import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseTypeComponent } from './components/course-type.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CourseTypeComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CourseTypeComponent],
})
export class CourseTypeModule {}
