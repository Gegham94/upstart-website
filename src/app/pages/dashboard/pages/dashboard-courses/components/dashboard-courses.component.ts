import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonTheme } from '../../../../../shared/enums/button-theme.enum';
import { Course } from '../../../../../shared/interfaces/courses/course.interface';
import { CoursesApiService } from '../../../../../shared/services/courses/courses-api.service';
import { CurrentUserInfoInterface } from '../../../../../shared/interfaces/current-user.interface';
import { UserRole } from '../../../../../shared/enums/user-role';
import { GlobalService } from '../../../../../shared/services/global.service';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { PaginatePipeArgs } from 'ngx-pagination/lib/paginate.pipe';
import { SelectOptions } from '../../../../../shared/interfaces/select-options.interface';
import { CourseStatus } from '../../../../../shared/enums/course-status';

@Component({
  selector: 'us-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.scss'],
})
export class DashboardCoursesComponent implements OnInit, OnDestroy {
  public readonly buttonTheme = ButtonTheme;

  public courseList?: Course[];

  public totalPages: number = 0;

  public pageSize: number = 0;

  public currentPage: number = 0;

  public unsubscribe$: Subject<void> = new Subject<void>();

  public readonly userRole = UserRole;

  public userInfo!: CurrentUserInfoInterface | null;

  public config: PaginatePipeArgs;

  public selectedOption?: SelectOptions;

  public readonly courseStatusOptions: SelectOptions[] = [
    {
      displayName: 'All',
      value: -1,
    },
    {
      displayName: 'Draft',
      value: CourseStatus.DRAFT,
    },
    {
      displayName: 'Under Review',
      value: CourseStatus.UNDER_REVIEW,
    },
    {
      displayName: 'Published',
      value: CourseStatus.PUBLISHED,
    },
  ];

  public isFilterActive: boolean = false;

  public filterToggled: boolean = false;

  private coursesSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly courseApiService: CoursesApiService,
    private globalService: GlobalService,
  ) {}

  public ngOnInit(): void {
    this.getCourseList();
    this.currentUserInfo();

    this.route.queryParams.subscribe((params) => {
      if (params && params['status']) {
        const statusOption = this.courseStatusOptions.find((el) => el.value === +params['status']);
        this.filterCoursesBy(statusOption ?? this.courseStatusOptions[0]);
      } else {
        this.filterCoursesBy(this.courseStatusOptions[0]);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getCourseList(status?: CourseStatus): void {
    if (this.courseList) {
      this.courseList = undefined;
    }
    this.coursesSubscription = this.courseApiService
      .getCurrentUserCourses(this.currentPage, status)
      .subscribe((response) => {
        this.courseList = response.data.data;
        this.totalPages = response.data.total;
        this.pageSize = response.data.per_page;
        this.currentPage = response.data.current_page;

        this.setPaginationConfig(this.pageSize, this.currentPage, this.totalPages);
      });
  }

  public toggleFilterBlock(state?: boolean): void {
    this.filterToggled = state !== undefined ? state : !this.filterToggled;
  }

  private currentUserInfo(): void {
    this.globalService.currentUserObservable
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((res) => res !== null),
      )
      .subscribe((data) => {
        this.userInfo = data;
      });
  }

  public createCourse(): void {
    this.router.navigate(['dashboard', 'courses', 'create']);
  }

  public pageChanged(event: number): void {
    this.currentPage = event;
    this.getCourseList();
  }

  public setPaginationConfig(pageSize: number, currentPage: number, totalPages: number) {
    this.config = {
      itemsPerPage: pageSize,
      currentPage: currentPage,
      totalItems: totalPages,
    };
  }

  public filterCoursesBy(option: SelectOptions): void {
    this.courseList = undefined;
    this.coursesSubscription?.unsubscribe();
    this.selectedOption = option;

    if (option.value !== -1) {
      this.getCourseList(option.value as CourseStatus);
      this.isFilterActive = true;
      this.router.navigate([], {
        queryParams: {
          status: option.value,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.getCourseList();
      this.isFilterActive = false;
      this.router.navigate([], {
        queryParams: {
          status: null,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  public get getUserRole() {
    if (this.userInfo?.role_id === this.userRole.STUDENT) {
      return 'ST';
    } else if (this.userInfo?.role_id === this.userRole.TRAINER) {
      return 'TR';
    } else if (this.userInfo?.role_id === this.userRole.TRAINING_CENTER) {
      return 'TRC';
    }
    return '';
  }
}
