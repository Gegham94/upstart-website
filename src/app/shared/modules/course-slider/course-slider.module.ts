import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSliderComponent } from './components/course-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';
import { ButtonModule } from '../../components/button/button.module';
import { CourseModule } from '../course/course.module';
import { IconModule } from '../../components/icon/icon.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalModule } from '../modal/modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CourseSliderComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    IconModule,
    StarRatingModule,
    ButtonModule,
    CourseModule,
    StarRatingModule,
    PipesModule,
    NgxSkeletonLoaderModule,
    ModalModule,
    TranslateModule,
  ],
  exports: [CourseSliderComponent],
})
export class CourseSliderModule {}
