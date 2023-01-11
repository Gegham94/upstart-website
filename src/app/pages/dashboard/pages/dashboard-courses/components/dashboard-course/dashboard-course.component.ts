import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonTheme } from '../../../../../../shared/enums/button-theme.enum';
import { Course } from '../../../../../../shared/interfaces/courses/course.interface';
import { CourseFormService } from '../../pages/dashboard-create-course/services/course-form.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../../../../shared/services/global.service';
import { CategoriesInterface } from '../../../../../../shared/interfaces/categories/categories.interface';
import { TooltipOrientationEnum } from '../../../../../../shared/enums/tooltip-orientation.enum';
import { CoursesApiService } from '../../../../../../shared/services/courses/courses-api.service';
import { ToastrService } from 'ngx-toastr';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { CertificateComponent } from '../../../../../../shared/components/certificate/components/certificate.component';
import { CourseStatus } from '../../../../../../shared/enums/course-status';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-dashboard-course',
  templateUrl: './dashboard-course.component.html',
  styleUrls: ['./dashboard-course.component.scss'],
})
export class DashboardCourseComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public readonly tooltipOrientation = TooltipOrientationEnum;

  public readonly courseStatus = CourseStatus;

  @Input()
  public courseData!: Course;

  @Output()
  public courseDeleted: EventEmitter<void> = new EventEmitter<void>();

  public categories: CategoriesInterface[] = [];

  public courseTypePosition: boolean = true;

  constructor(
    private readonly globalService: GlobalService,
    private readonly courseFormService: CourseFormService,
    private readonly coursesApiService: CoursesApiService,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
    private readonly dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.globalService.categoriesListObservable.subscribe((categories) => {
      this.categories = categories;
    });
  }

  public editCourse(): void {
    this.router.navigate(['dashboard', 'courses', 'create', this.courseData.id]);
  }

  public deleteCourse(): void {
    this.coursesApiService.deleteCourse(this.courseData.id).subscribe(() => {
      this.toastrService.success(this.translateService.instant('toast-messages.course-deleted'));
      this.courseDeleted.emit();
    });
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }

  public openCertificateDialog(): void {
    this.dialog.open(CertificateComponent, {
      data: {
        course: this.courseData.id,
        coursePassed: true,
      },
      panelClass: 'certificate-dialog',
      width: '900px',
      height: '600px',
    });
  }
}
