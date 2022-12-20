import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineCourseComponent } from './components/inline-course.component';
import { IconModule } from '../../components/icon/icon.module';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';
import { ButtonModule } from '../../components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '../../directives/dropdown/dropdown.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from '../modal/modal.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../pipes/pipes.module';
import { CourseTypeModule } from '../course-type/course-type.module';

@NgModule({
  declarations: [InlineCourseComponent],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    StarRatingModule,
    ButtonModule,
    TranslateModule,
    DropdownModule,
    MatDialogModule,
    ModalModule,
    MatProgressSpinnerModule,
    PipesModule,
    CourseTypeModule,
  ],
  exports: [InlineCourseComponent],
})
export class InlineCourseModule {}
