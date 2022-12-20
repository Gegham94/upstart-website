import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer/trainer.component';
import { UserInfoModule } from 'src/app/shared/components/user-info/user-info.module';
import { AboutAreaModule } from 'src/app/shared/modules/about-area/about-area.module';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { ReviewsModule } from 'src/app/shared/modules/reviews/reviews.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CourseTicketModule } from 'src/app/shared/modules/course-ticket/course-ticket.module';
import { TrainerInfoModule } from 'src/app/shared/modules/trainer-info/trainer-info.module';

@NgModule({
  declarations: [TrainerComponent],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    IconModule,
    UserInfoModule,
    AboutAreaModule,
    ReviewsModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    CourseTicketModule,
    TrainerInfoModule,
  ],
})
export class TrainerModule {}
