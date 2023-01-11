import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseViewRoutingModule } from './course-view-routing.module';
import { CourseViewComponent } from './components/course-view.component';
import { CourseGeneralComponent } from './components/course-general/course-general.component';
import { CourseGeneralDetailsComponent } from './components/course-general/components/course-general-details/course-general-details.component';
import { CourseGeneralSideComponent } from './components/course-general/components/course-general-side/course-general-side.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { IconModule } from '../../shared/components/icon/icon.module';
import { CourseRelatedComponent } from './components/course-related/course-related.component';
import { CourseModule } from '../../shared/modules/course/course.module';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CourseReviewsComponent } from './components/course-reviews/course-reviews.component';
import { ReviewsModule } from '../../shared/modules/reviews/reviews.module';
import { ReviewsModalComponent } from './components/course-reviews/component/reviews-modal/reviews-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingModule } from '../../shared/components/star-rating/star-rating.module';
import { EditorModule } from '../../shared/components/forms/editor/editor.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutAreaModule } from 'src/app/shared/modules/about-area/about-area.module';
import { CourseSliderModule } from 'src/app/shared/modules/course-slider/course-slider.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CourseTrainerComponent } from './components/course-trainer/course-trainer.component';
import { PreviewCourseComponent } from './components/preview-course/preview-course.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CourseContentComponent } from './components/course-general/components/course-content/course-content.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccordionModule } from '../../shared/components/accordion/accordion.module';
import { InputModule } from '../../shared/components/forms/input/input.module';
import { CoursePreviewModalComponent } from './components/course-general/components/course-content/course-preview-modal/course-preview-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CourseQuizModalComponent } from './components/course-general/components/course-content/course-quiz-modal/course-quiz-modal.component';
import { ScrollTopModule } from 'src/app/shared/components/scroll-top/scroll-top.module';

@NgModule({
  declarations: [
    CourseViewComponent,
    CourseGeneralComponent,
    CourseGeneralDetailsComponent,
    CourseGeneralSideComponent,
    CourseContentComponent,
    CourseRelatedComponent,
    CourseReviewsComponent,
    ReviewsModalComponent,
    CourseTrainerComponent,
    PreviewCourseComponent,
    CoursePreviewModalComponent,
    CourseQuizModalComponent,
  ],
  imports: [
    CommonModule,
    CourseViewRoutingModule,
    ButtonModule,
    IconModule,
    CourseModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    SlickCarouselModule,
    ReviewsModule,
    StarRatingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    AboutAreaModule,
    CourseSliderModule,
    NgxSkeletonLoaderModule,
    ReviewsModule,
    PipesModule,
    AccordionModule,
    InputModule,
    ScrollTopModule,
  ],
  exports: [CourseContentComponent],
})
export class CourseViewModule {}
