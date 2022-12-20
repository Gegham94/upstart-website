import { Component } from '@angular/core';
import { LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
export interface Preview {
  preview: boolean;
  trainer: LessonTrainer;
}
@Component({
  selector: 'us-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss', './course-view.component.media.scss'],
})
export class CourseViewComponent {
  // TODO: Make this dynamically generated
  private readonly title: string = 'course.title';

  public preview: boolean = false;

  public reviewCount: number = 0;

  public trainer: LessonTrainer;

  constructor(private readonly translatedTitleService: TranslatedTitleService) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public lessonTrainer(event: LessonTrainer): void {
    this.trainer = event;
  }

  public getPrevew(event: Preview): void {
    this.preview = event.preview;
    this.trainer = event.trainer;
  }

  public getRviewCount(reviewCount: number) {
    this.reviewCount = reviewCount;
  }
}
