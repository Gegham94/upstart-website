import { Component, Input } from '@angular/core';
import { Students } from '../../../interfaces/students/students.interface';

@Component({
  selector: 'us-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  @Input()
  public studentList: Students;
}
