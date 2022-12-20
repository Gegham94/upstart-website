import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLearningRoutingModule } from './my-learning-routing.module';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CourseModule } from 'src/app/shared/modules/course/course.module';
import { StarRatingModule } from 'src/app/shared/components/star-rating/star-rating.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MyLearningComponent],
  imports: [
    CommonModule,
    MyLearningRoutingModule,
    TranslateModule,
    IconModule,
    NgxSkeletonLoaderModule,
    CourseModule,
    StarRatingModule,
    PipesModule,
    MatProgressSpinnerModule,
  ],
})
export class MyLearningModule {}
