import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseTicketComponent } from './component/course-ticket.component';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CourseTypeModule } from '../course-type/course-type.module';

@NgModule({
  declarations: [CourseTicketComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    StarRatingModule,
    PipesModule,
    TranslateModule,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule,
    CourseTypeModule,
  ],
  exports: [CourseTicketComponent],
})
export class CourseTicketModule {}
