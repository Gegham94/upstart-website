import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './component/reviews.component';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';
import { RouterModule } from '@angular/router';
import { IconModule } from '../../components/icon/icon.module';
import { ButtonModule } from '../../components/button/button.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    RouterModule,
    TranslateModule,
    IconModule,
    ButtonModule,
    MatProgressSpinnerModule,
  ],
  exports: [ReviewsComponent],
})
export class ReviewsModule {}
