import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CourseFormService } from '../services/course-form.service';
import { ButtonTheme } from '../../../../../../../shared/enums/button-theme.enum';
import { TabsComponent } from '../../../../../../../shared/components/tabs/components/tabs.component';
import { CoursesApiService } from '../../../../../../../shared/services/courses/courses-api.service';
import { courseTypeList } from '../../../../../../../shared/constants/course-type-list.constant';
import { LoadingService } from '../../../../../../../shared/services/loading.service';
import { CourseFormToObjectDto } from '../../../../../../../shared/dtos/course-form-to-object.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CourseCreateSteps } from '../../../../../../../shared/enums/course-create-steps.enum';
import { GlobalService } from '../../../../../../../shared/services/global.service';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { UserRole } from '../../../../../../../shared/enums/user-role';

@Component({
  selector: 'us-dashboard-create-course',
  templateUrl: './dashboard-create-course.component.html',
  styleUrls: ['./dashboard-create-course.component.scss'],
})
export class DashboardCreateCourseComponent implements OnInit, OnDestroy {
  @ViewChildren(TabsComponent)
  public tabs!: QueryList<TabsComponent>;

  public readonly buttonTheme = ButtonTheme;

  public readonly userRole = UserRole;

  public readonly types = courseTypeList;

  public readonly courseCreateSteps = CourseCreateSteps;

  public invalidSteps: string[] = [];

  public typeForm!: FormGroup;

  public isLoading: boolean = false;

  private readonly destroyed$: Subject<void> = new Subject<void>();

  public publishDisabled: boolean = true;

  public currentUser?: CurrentUserInfoInterface | null;

  public isReasonCollapsed: boolean = true;

  constructor(
    private readonly coursesApiService: CoursesApiService,
    public readonly courseFormService: CourseFormService,
    public readonly translateService: TranslateService,
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly globalService: GlobalService,
  ) {}

  public ngOnInit(): void {
    this.typeForm = this.formBuilder.group({
      type: new FormControl(null, Validators.required),
    });
    this.courseFormService.clearPublicCourse();
    this.isLoading = true;
    this.loadingService.show();

    this.courseFormService.isLoadingObservable.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.loadingService.show();
      if (params['id']) {
        this.getCurrentCourse(params['id']);
      } else {
        this.loadingService.hide();
      }
    });

    if (this.courseFormService.currentCourse?.id) {
      this.loadingService.show();
      this.getCurrentCourse(this.courseFormService.currentCourse.id);
    } else {
      this.courseFormService.clearFormData();
    }

    this.globalService.currentUserObservable.subscribe((user) => {
      this.currentUser = user;
      this.courseFormService.isLoading = false;
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.courseFormService.courseID = +params['id'];
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public setActiveType(newTypeId: number): void {
    this.typeControl.setValue(newTypeId);
  }

  public getCurrentCourse(courseId: number): void {
    this.courseFormService.isLoading = true;
    this.coursesApiService.getCourse(courseId).subscribe((res) => {
      this.courseFormService.setCurrentCourse(res.data);
      this.courseFormService.updateFormData(
        CourseFormToObjectDto.deserialize(res.data, this.translateService.currentLang),
        false,
      );

      this.courseFormService.setCompletedSteps(res.data.completed_steps);
      this.typeForm.patchValue({ type: this.courseFormService.formData.type });
      this.loadingService.hide();
      this.courseFormService.isLoading = false;
    });
  }

  public saveType(): void {
    this.courseFormService.isLoading = true;
    this.coursesApiService.createCourse(this.typeForm.value.type).subscribe((course) => {
      this.courseFormService.setCurrentCourse(course.data);
      this.courseFormService.updateFormData(this.typeForm.value, false);
      this.courseFormService.isLoading = false;
    });
  }

  public nextStep(): void {
    this.tabs.first.nextTab();
  }

  public saveCourse(): void {
    this.router.navigate(['dashboard', 'courses']);
  }

  public get isStepsShown(): boolean {
    return this.courseFormService.showCourseCreationSteps;
  }

  public get typeControl(): FormControl {
    return this.typeForm.get('type') as FormControl;
  }

  public get getPublishDisabledState(): boolean {
    return !this.courseFormService.isFormFilled;
  }

  public get completedSteps(): { [key: string]: boolean } {
    return this.courseFormService.completedSteps;
  }

  public get isReasonTextLarge(): boolean {
    return (
      !!this.courseFormService.currentCourse?.declined_reason &&
      this.courseFormService.currentCourse.declined_reason.length > 418
    );
  }

  public receivedError(event: boolean, key: CourseCreateSteps) {
    if (event) {
      if (!this.invalidSteps.includes(key)) {
        this.invalidSteps.push(key);
      }
    } else {
      this.invalidSteps = this.invalidSteps.filter((step) => step !== key);
    }
  }
}
