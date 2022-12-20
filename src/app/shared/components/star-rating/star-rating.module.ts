import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './component/star-rating.component';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  declarations: [StarRatingComponent],
  exports: [StarRatingComponent],
  imports: [CommonModule, NgxStarsModule],
})
export class StarRatingModule {}
