import { Component, OnChanges, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CourseStatus } from 'src/app/shared/enums/course-status';
import { CourseType } from 'src/app/shared/enums/course-type.enum';

@Component({
  selector: 'us-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.scss'],
})
export class CourseTypeComponent implements OnChanges {
  @Input()
  public courseType: CourseType;

  @Input()
  public courseStatus: CourseStatus;

  @Input()
  public blockPosition: boolean = false;

  @Input()
  public basketMobile: boolean = false;

  public online: string = '';

  public offline: string = '';

  public onlineWebinar: string = '';

  public consultation: string = '';

  public draft: string = '';

  public published: string = '';

  public underReview: string = '';

  constructor(private translateService: TranslateService) {}

  public ngOnChanges(): void {
    switch (this.courseType) {
      case CourseType.ONLINE:
        this.online = this.translateService.instant('trainer_profile.course_type.online');
        break;
      case CourseType.OFFLINE:
        this.offline = this.translateService.instant('trainer_profile.course_type.offline');
        break;
      case CourseType.ONLINE_WEBINAR:
        this.onlineWebinar = this.translateService.instant(
          'trainer_profile.course_type.online_webinar',
        );
        break;
      case CourseType.CONSULTATION:
        this.consultation = this.translateService.instant(
          'trainer_profile.course_type.consultation',
        );
        break;
    }

    switch (this.courseStatus) {
      case CourseStatus.DRAFT:
        this.draft = 'draft';
        break;
      case CourseStatus.PUBLISHED:
        this.published = 'published';
        break;
      case CourseStatus.UNDER_REVIEW:
        this.underReview = 'under review';
    }
  }

  public get courseTypes(): typeof CourseType {
    return CourseType;
  }

  public get courseStatusType(): typeof CourseStatus {
    return CourseStatus;
  }
}
