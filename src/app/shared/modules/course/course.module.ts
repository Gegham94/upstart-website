import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './components/course.component';
import { IconModule } from '../../components/icon/icon.module';
import { ButtonModule } from '../../components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '../../directives/dropdown/dropdown.module';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';
import { ModalModule } from '../modal/modal.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CourseTypeModule } from '../course-type/course-type.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    ButtonModule,
    TranslateModule,
    DropdownModule,
    StarRatingModule,
    ModalModule,
    PipesModule,
    CourseTypeModule,
    MatProgressSpinnerModule,
  ],
  exports: [CourseComponent],
})
export class CourseModule {}
