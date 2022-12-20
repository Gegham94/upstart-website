import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { CourseDetails, LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { Preview } from '../course-view.component';
import { CoursesApiService } from 'src/app/shared/services/courses/courses-api.service';
import { GlobalService } from 'src/app/shared/services/global.service';
@Component({
  selector: 'us-course-general',
  templateUrl: './course-general.component.html',
  styleUrls: ['./course-general.component.scss', './course-general.component.media.scss'],
})
export class CourseGeneralComponent implements OnInit, OnChanges {
  public course?: CourseDetails;

  public loader: boolean = true;

  public isJoined: boolean = false;

  @Input()
  public preview: boolean = false;

  public previewCourse!: CourseDetails;

  public readonly CourseType = CourseType;

  @Input()
  public reviewCount: number = 0;

  public trainer: LessonTrainer;

  @Output()
  public trainerEmitter$: EventEmitter<LessonTrainer> = new EventEmitter<LessonTrainer>();

  @Output()
  public previewEmitter$: EventEmitter<Preview> = new EventEmitter<Preview>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesApiService,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  public ngOnInit(): void {
    this.getCourseById();
    this.globalService.currentUserObservable.subscribe((res) => {
      console.log(res);
    });
  }

  public ngOnChanges(): void {
    if (this.preview) {
      this.getPreviewDetails();
    }
  }

  public getCourseById(): void {
    this.activatedRoute.params.subscribe((param) => {
      var parts = this.router.url.split('/');
      var result = parts[parts.length - 1];
      if (result != 'preview') {
        this.courseService.getCourseDetails(param['id']).subscribe(
          (res) => {
            this.course = res.data;
            this.loader = false;
            this.trainer = res.data.trainer;
            this.trainerEmitter$.emit(this.trainer);
          },
          () => {
            this.router.navigate(['not-found']);
            this.loader = false;
          },
        );
      } else {
        this.preview = true;
        this.getPreviewDetails();
      }
    });
  }

  public getPreviewDetails(): void {
    let id = -1;
    this.activatedRoute.params.subscribe((param) => {
      id = param['id'];
    });
    this.courseService.coursePreviewDetails(id).subscribe((res) => {
      this.course = res.data;
      this.loader = false;
      this.previewCourse = res.data;
      this.trainer = res.data.trainer;
    });
  }

  public reloadData(event: boolean | number): void {
    if (event && event !== -1) {
      this.getCourseById();
      this.getPreviewDetails();
    }
    if (event === -1) {
      this.isJoined = true;
      this.getCourseById();
    }
  }
}
