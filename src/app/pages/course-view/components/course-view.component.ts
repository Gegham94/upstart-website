import { Component, OnInit } from '@angular/core';
import { CourseDetails, LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesApiService } from '../../../shared/services/courses/courses-api.service';

export interface Preview {
  preview: boolean;
  trainer: LessonTrainer;
}
@Component({
  selector: 'us-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss', './course-view.component.media.scss'],
})
export class CourseViewComponent implements OnInit {
  // TODO: Make this dynamically generated
  private readonly title: string = 'course.title';

  public preview: boolean = false;

  public reviewCount: number = 0;

  public trainer: LessonTrainer;

  public course?: CourseDetails;

  public loader: boolean = true;

  public hasFullAccess: boolean = false;

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly courseService: CoursesApiService,
    private readonly router: Router,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.getCourseById();
  }

  public getCourseById(): void {
    this.loader = true;
    this.activatedRoute.params.subscribe((param) => {
      const parts = this.router.url.split('/');
      const result = parts[parts.length - 1];
      if (result != 'preview') {
        this.courseService.getCourseDetails(param['id']).subscribe(
          (res) => {
            this.course = res.data;
            this.loader = false;
            this.trainer = res.data.trainer;
            this.lessonTrainer(this.trainer);
            this.translatedTitleService.setTitle(this.course.title);
            this.hasFullAccess = this.course.full_access;
          },
          () => {
            this.router.navigate(['not-found']);
            this.loader = false;
          },
        );
      } else {
        this.preview = true;
      }
    });
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
