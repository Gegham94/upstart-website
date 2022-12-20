import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerInfoComponent } from './components/trainer-info.component';
import { IconModule } from '../../components/icon/icon.module';
import { StarRatingModule } from '../../components/star-rating/star-rating.module';

@NgModule({
  declarations: [TrainerInfoComponent],
  imports: [CommonModule, IconModule, StarRatingModule],
  exports: [TrainerInfoComponent],
})
export class TrainerInfoModule {}
