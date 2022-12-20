import { Component } from '@angular/core';
import { LessonTrainer } from '../../../../shared/interfaces/courses/course-details';

@Component({
  selector: 'us-preview-course',
  templateUrl: './preview-course.component.html',
  styleUrls: ['./preview-course.component.scss'],
})
export class PreviewCourseComponent {
  public trainer: LessonTrainer;

  public lessonTrainer(event: LessonTrainer): void {
    this.trainer = event;
  }
}
