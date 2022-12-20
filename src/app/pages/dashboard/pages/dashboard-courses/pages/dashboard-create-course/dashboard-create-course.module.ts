import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardCreateCourseRoutingModule } from './dashboard-create-course-routing.module';
import { DashboardCreateCourseComponent } from './components/dashboard-create-course.component';
import { ButtonModule } from '../../../../../../shared/components/button/button.module';
import { TabsModule } from '../../../../../../shared/components/tabs/tabs.module';
import { DashboardCourseCategoryComponent } from './components/dashboard-course-category/dashboard-course-category.component';
import { SelectModule } from '../../../../../../shared/components/select/select.module';
import { DashboardCourseLandingComponent } from './components/dashboard-course-landing/dashboard-course-landing.component';
import { EditorModule } from '../../../../../../shared/components/forms/editor/editor.module';
import { InputModule } from '../../../../../../shared/components/forms/input/input.module';
import { IconModule } from '../../../../../../shared/components/icon/icon.module';
import { ImageInputModule } from '../../../../../../shared/components/forms/file-input/image-input.module';
import { ConfirmableInputModule } from '../../../../../../shared/components/forms/confirmable-input/confirmable-input.module';
import { DashboardCourseInformationComponent } from './components/dashboard-course-information/dashboard-course-information.component';
import { PriceKeeperModule } from '../../../../../../shared/components/forms/price-keeper/price-keeper.module';
import { AccordionModule } from '../../../../../../shared/components/accordion/accordion.module';
import { DashboardCourseSectionListComponent } from './components/dashboard-course-section-list/dashboard-course-section-list.component';
import { DashboardCourseLessonComponent } from './components/dashboard-course-lesson/dashboard-course-lesson.component';
import { DashboardCourseQuizComponent } from './components/dashboard-course-quiz/dashboard-course-quiz.component';
import { CheckboxModule } from '../../../../../../shared/components/forms/checkbox/checkbox.module';
import { DropdownModule } from '../../../../../../shared/directives/dropdown/dropdown.module';
import { DashboardCourseTrainerComponent } from './components/dashboard-course-trainer/dashboard-course-trainer.component';
import { LessonsApiService } from '../../../../../../shared/services/lessons-api.service';
import { DashboardCourseLessonListComponent } from './components/dashboard-course-lesson-list/dashboard-course-lesson-list.component';
import { DateInputModule } from '../../../../../../shared/components/forms/date-input/date-input.module';
import { QuizApiService } from '../../../../../../shared/services/quiz-api.service';
import { SearchableInputModule } from '../../../../../../shared/components/forms/searchable-input/searchable-input.module';
import { TrainerCenterApiService } from '../../../../../../shared/services/trainer-center-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from '../../../../../../shared/directives/tooltip/tooltip.module';
import { ValidationErrorModule } from '../../../../../../shared/directives/validation-error/validation-error.module';
import { ConfirmationModalModule } from '../../../../../../shared/components/confirmation-modal/confirmation-modal.module';

@NgModule({
  declarations: [
    DashboardCreateCourseComponent,
    DashboardCourseCategoryComponent,
    DashboardCourseLandingComponent,
    DashboardCourseInformationComponent,
    DashboardCourseSectionListComponent,
    DashboardCourseLessonComponent,
    DashboardCourseQuizComponent,
    DashboardCourseTrainerComponent,
    DashboardCourseLessonListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardCreateCourseRoutingModule,
    ButtonModule,
    TabsModule,
    SelectModule,
    EditorModule,
    InputModule,
    IconModule,
    ImageInputModule,
    ConfirmableInputModule,
    PriceKeeperModule,
    AccordionModule,
    CheckboxModule,
    DropdownModule,
    DateInputModule,
    SearchableInputModule,
    TranslateModule,
    TooltipModule,
    ValidationErrorModule,
    ConfirmationModalModule,
  ],
  providers: [LessonsApiService, QuizApiService, TrainerCenterApiService],
})
export class DashboardCreateCourseModule {}
