import { Injectable } from '@angular/core';
import { CourseFormToObjectDto } from '../../../../../../../shared/dtos/course-form-to-object.dto';
import { CourseForm } from '../../../../../../../shared/interfaces/courses/course-form.interface';
import { CoursesApiService } from '../../../../../../../shared/services/courses/courses-api.service';
import { Course } from '../../../../../../../shared/interfaces/courses/course.interface';
import { FileUploadService } from '../../../../../../../shared/services/file-upload.service';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiResponse } from '../../../../../../../shared/interfaces/api/api-response.interface';
import { CourseStatus } from '../../../../../../../shared/enums/course-status';
import { ConfirmationModalComponent } from '../../../../../../../shared/components/confirmation-modal/components/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class CourseFormService {
  private _formData: Partial<CourseForm> = {};

  public currentCourse?: Partial<Course> = {};

  public _completedSteps?: { [key: string]: boolean };

  public readonly currentCourseUpdated$: Subject<void> = new Subject<void>();

  private _courseID?: number;

  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public errors: BehaviorSubject<{ [key: string]: string | string[] } | undefined> =
    new BehaviorSubject<{ [p: string]: string | string[] } | undefined>(undefined);

  constructor(
    private readonly coursesApiService: CoursesApiService,
    private readonly fileUploadService: FileUploadService,
    private readonly toastrService: ToastrService,
    private readonly translateService: TranslateService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  public setCurrentCourse(course?: Partial<Course>) {
    this.currentCourse = course;
    if (course) {
      this._formData = {
        ...this._formData,
        ...CourseFormToObjectDto.deserialize(course, this.translateService.currentLang),
      };

      this.router.navigate(['dashboard', 'courses', 'create', course.id]);
    } else {
      this.clearFormData();
    }
  }

  public updateFormData(data: Partial<CourseForm>, updateOnServer: boolean = true): void {
    this.isLoading = true;
    this._formData = {
      ...this._formData,
      ...data,
    };

    if (updateOnServer) {
      const serializedCourse = CourseFormToObjectDto.serialize(
        this._formData,
        Number(this._courseID),
      );

      const subjectList: BehaviorSubject<string | undefined>[] = [];

      let coverImageSubject = new BehaviorSubject<string | undefined>(undefined);
      let trainerAvatarSubject = new BehaviorSubject<string | undefined>(undefined);

      if (
        this._formData.landingPage?.coverImage &&
        typeof this._formData.landingPage.coverImage !== 'string'
      ) {
        this.fileUploadService
          .uploadFile(this._formData.landingPage.coverImage as File, 'course')
          .subscribe((res) => {
            coverImageSubject.next(res.data.path);
          });
      } else {
        coverImageSubject.next(
          (this._formData.landingPage?.coverImage as string)
            ?.replace(/https:\/\/upstart.brainfors.am\//gm, '')
            .replace(/https:\/\/api.upstart.am\//gm, '') ?? '',
        );
      }
      subjectList[0] = coverImageSubject;
      if (this._formData.trainer?.image && typeof this._formData.trainer.image !== 'string') {
        this.fileUploadService
          .uploadFile(this._formData.trainer?.image as File, 'course')
          .subscribe((res) => {
            trainerAvatarSubject.next(res.data.path);
          });
      } else {
        trainerAvatarSubject.next(
          (this._formData.trainer?.image as string)
            ?.replace(/https:\/\/upstart.brainfors.am\//gm, '')
            .replace(/https:\/\/api.upstart.am\//gm, '') ?? '',
        );
      }
      subjectList[1] = trainerAvatarSubject;

      let updateSubscription: Subscription;

      combineLatest(subjectList).subscribe(([coverImage, trainerAvatar]) => {
        updateSubscription?.unsubscribe();
        if (
          (coverImage !== undefined && trainerAvatar !== undefined) ||
          ((coverImage || typeof coverImage === 'string' || coverImage !== undefined) &&
            (trainerAvatar || typeof trainerAvatar === 'string' || trainerAvatar !== undefined))
        ) {
          serializedCourse.cover_image = coverImage ? coverImage : undefined;

          if (serializedCourse.trainer) {
            serializedCourse.trainer.avatar = trainerAvatar ? trainerAvatar : undefined;
          }

          updateSubscription = this.coursesApiService
            .updateCourse(serializedCourse)
            .subscribe((res) => {
              if (res && res.success) {
                this.currentCourse = res.data;
                this.setCompletedSteps(res.data.completed_steps);
                if (data.status && data.status === CourseStatus.UNDER_REVIEW) {
                  this.publish();
                } else {
                  this.toastrService.success(
                    this.translateService.instant('dashboard.courses.saved-toast'),
                  );
                }

                if (data.status === CourseStatus.UNDER_REVIEW) {
                  this.router.navigate(['dashboard', 'courses']);
                }

                this.currentCourseUpdated$.next();
              } else {
                this.errors.next(res.errors);
                const message = (res as ApiResponse).errors
                  ? Object.values((res as ApiResponse).errors as { [key: string]: string }).join(
                      '<br/>',
                    )
                  : '';
                this.toastrService.error(
                  (res as ApiResponse).message + (message ? '<br/><br/>' + message : ''),
                );
                this.setCompletedSteps(
                  res.completed_steps as {
                    [key: string]: boolean;
                  },
                );
              }
              this.isLoading = false;
            });
        }
      });
    }
  }

  public clearFormData(): void {
    this._formData = {};
    this.errors.next({});
  }

  public clearPublicCourse(): void {
    this.setCurrentCourse(undefined);
  }

  public setCompletedSteps(data: { [key: string]: boolean }): void {
    this._completedSteps = data;
  }

  public get isFormFilled(): boolean {
    if (this._completedSteps) {
      for (const completedKey in this._completedSteps) {
        if (!this._completedSteps[completedKey]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  public get formData(): Partial<CourseForm> {
    return this._formData;
  }

  public get completedSteps(): { [key: string]: boolean } {
    return this._completedSteps as { [key: string]: boolean };
  }

  public get showCourseCreationSteps(): boolean {
    return !!this._formData.type;
  }

  public set isLoading(newValue: boolean) {
    this._isLoading.next(newValue);
  }

  public get isLoadingObservable(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  public set courseID(value: number) {
    this._courseID = value;
  }

  public publish(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        description: this.translateService.instant('dashboard.courses.published_success'),
        confirmed: () => {
          dialogRef.close();
        },
      },
    });
  }
}
