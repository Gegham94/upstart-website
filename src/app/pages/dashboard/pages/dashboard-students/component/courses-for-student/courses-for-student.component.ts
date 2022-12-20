import { Component, OnInit } from '@angular/core';
import { TranslatedTitleService } from '../../../../../../shared/services/translated-title.service';
import { StudentsService } from '../../../../../../shared/services/students/students.service';
import { Subject, takeUntil } from 'rxjs';
import { PublicCourse } from '../../../../../../shared/interfaces/courses/public-course.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'us-courses-for-student',
  templateUrl: './courses-for-student.component.html',
  styleUrls: ['./courses-for-student.component.scss'],
})
export class CoursesForStudentComponent implements OnInit {
  public title: string = 'students.participated_courses';

  public subscribe$: Subject<boolean> = new Subject<boolean>();

  public courseList: PublicCourse[] = [];

  public loader: Boolean = false;

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      if (res['id']) {
        this.fetchData(res['id']);
      }
    });
  }

  public fetchData(userId: number) {
    this.loader = true;
    this.studentsService
      .getStudentCourse(userId)
      .pipe(takeUntil(this.subscribe$))
      .subscribe((res) => {
        this.courseList = res.data;
        this.loader = false;
      });
  }
}
