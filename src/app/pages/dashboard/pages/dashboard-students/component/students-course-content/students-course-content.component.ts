import { Component, OnInit } from '@angular/core';
import { TranslatedTitleService } from '../../../../../../shared/services/translated-title.service';
import { CoursesApiService } from '../../../../../../shared/services/courses/courses-api.service';
import { Subject, takeUntil } from 'rxjs';
import { CourseDetails } from '../../../../../../shared/interfaces/courses/course-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'us-students-course-content',
  templateUrl: './students-course-content.component.html',
  styleUrls: ['./students-course-content.component.scss'],
})
export class StudentsCourseContentComponent implements OnInit {
  public title: string = 'course-content.course_content';

  public subscribe$: Subject<boolean> = new Subject<boolean>();

  public course?: CourseDetails;

  public loader: boolean = false;

  constructor(
    private coursesApiService: CoursesApiService,
    private activatedRoute: ActivatedRoute,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.fetchData(param['id']);
      }
    });
  }

  public fetchData(id: number) {
    this.loader = true;
    this.coursesApiService
      .getCourseDetails(id)
      .pipe(takeUntil(this.subscribe$))
      .subscribe((res) => {
        this.course = res.data;
        this.loader = false;
      });
  }
}
