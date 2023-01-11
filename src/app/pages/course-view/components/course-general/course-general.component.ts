import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { CourseDetails, LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { Preview } from '../course-view.component';
import { CoursesApiService } from 'src/app/shared/services/courses/courses-api.service';

@Component({
  selector: 'us-course-general',
  templateUrl: './course-general.component.html',
  styleUrls: ['./course-general.component.scss', './course-general.component.media.scss'],
})
export class CourseGeneralComponent implements OnChanges {
  public isJoined: boolean = false;

  @Input()
  public preview: boolean = false;

  @Input()
  public loader: boolean = true;

  public previewCourse!: CourseDetails;

  public readonly CourseType = CourseType;

  @Input()
  public reviewCount: number = 0;

  @Input()
  public course?: CourseDetails;

  public trainer: LessonTrainer;

  @Output()
  public trainerEmitter$: EventEmitter<LessonTrainer> = new EventEmitter<LessonTrainer>();

  @Output()
  public previewEmitter$: EventEmitter<Preview> = new EventEmitter<Preview>();

  @Output()
  public reloadCourse: EventEmitter<Preview> = new EventEmitter<Preview>();

  constructor(private activatedRoute: ActivatedRoute, private courseService: CoursesApiService) {}

  public ngOnChanges(): void {
    if (this.preview) {
      this.getPreviewDetails();
    }
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
      this.reloadCourse.emit();
      this.getPreviewDetails();
    }
    if (event === -1) {
      this.isJoined = true;
      this.reloadCourse.emit();
    }
  }
}
