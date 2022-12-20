import { Component, Input } from '@angular/core';
import { LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';

@Component({
  selector: 'us-course-trainer',
  templateUrl: './course-trainer.component.html',
  styleUrls: ['./course-trainer.component.scss', './course-trainer.component.media.scss'],
})
export class CourseTrainerComponent {
  public trainerData: LessonTrainer;

  @Input()
  public set trainer(data: LessonTrainer) {
    this.trainerData = data;
  }
}
