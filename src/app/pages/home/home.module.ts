import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeNewCoursesComponent } from './components/home-new-courses/home-new-courses.component';
import { CourseModule } from '../../shared/modules/course/course.module';
import { HomeCoursesComponent } from './components/home-courses/home-courses.component';
import { HomeTopCategoriesComponent } from './components/home-top-categories/home-top-categories.component';
import { HomeBecomeInstructorComponent } from './components/home-become-instructor/home-become-instructor.component';
import { HomeJoinUsComponent } from './components/home-join-us/home-join-us.component';
import { DropdownModule } from '../../shared/directives/dropdown/dropdown.module';
import { IconModule } from '../../shared/components/icon/icon.module';
import { CoursesComponent } from './components/courses/courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TogglebarComponent } from './components/courses/togglebar/togglebar.component';
import { TreeviewModule } from 'ngx-treeview';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RangeSliderComponent } from './components/courses/range-slider/range-slider.component';
import { MatRadioModule } from '@angular/material/radio';
import { BasketComponent } from './components/basket/basket.component';
import { InlineCourseModule } from '../../shared/modules/inline-course/inline-course.module';
import { CourseTicketModule } from 'src/app/shared/modules/course-ticket/course-ticket.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CourseSliderModule } from 'src/app/shared/modules/course-slider/course-slider.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StarRatingModule } from 'src/app/shared/components/star-rating/star-rating.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { StatisticService } from '../../shared/services/statistics/statistics.service';
import { PaginationModule } from '../../shared/components/pagination/pagination.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from '../../shared/components/select/select.module';

@NgModule({
  declarations: [
    HomeComponent,
    HomeCategoriesComponent,
    HomeMainComponent,
    HomeNewCoursesComponent,
    HomeCoursesComponent,
    HomeTopCategoriesComponent,
    HomeBecomeInstructorComponent,
    HomeJoinUsComponent,
    CoursesComponent,
    TogglebarComponent,
    RangeSliderComponent,
    BasketComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SlickCarouselModule,
    ButtonModule,
    CourseModule,
    DropdownModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
    NgxSliderModule,
    MatRadioModule,
    InlineCourseModule,
    MatProgressSpinnerModule,
    CourseTicketModule,
    CourseSliderModule,
    NgxSkeletonLoaderModule,
    StarRatingModule,
    PipesModule,
    PaginationModule,
    NgxPaginationModule,
    SelectModule,
  ],
  providers: [StatisticService],
})
export class HomeModule {}
