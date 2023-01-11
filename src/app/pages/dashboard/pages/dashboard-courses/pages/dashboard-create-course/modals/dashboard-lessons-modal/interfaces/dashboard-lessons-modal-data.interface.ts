import { FormGroup } from '@angular/forms';
import { CourseType } from '../../../../../../../../../shared/enums/course-type.enum';

export interface DashboardLessonsModalData {
  lessonGroupListControls: FormGroup[];
  courseType: CourseType;
  courseId: number;
}
