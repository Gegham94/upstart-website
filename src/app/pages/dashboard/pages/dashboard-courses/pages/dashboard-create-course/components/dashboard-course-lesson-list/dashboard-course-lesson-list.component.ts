import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CourseType } from '../../../../../../../../shared/enums/course-type.enum';

@Component({
  selector: 'us-dashboard-course-lesson-list',
  templateUrl: './dashboard-course-lesson-list.component.html',
  styleUrls: ['./dashboard-course-lesson-list.component.scss'],
})
export class DashboardCourseLessonListComponent {
  @Input()
  public lessonsForms!: FormGroup[];

  @Input()
  public type!: CourseType;

  @Input()
  public courseId!: number;

  public getFormGroupFromAbstractControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
