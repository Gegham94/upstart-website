import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { CourseFormService } from '../../services/course-form.service';
import { combineLatest } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../../../../../shared/components/confirmation-modal/components/confirmation-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'us-dashboard-course-landing',
  templateUrl: './dashboard-course-landing.component.html',
  styleUrls: ['./dashboard-course-landing.component.scss'],
})
export class DashboardCourseLandingComponent implements OnInit {
  @Input()
  public publishDisabled!: boolean;

  @Input()
  public courseId!: number;

  @Output()
  public nextStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public errorReceived: EventEmitter<boolean> = new EventEmitter<boolean>();

  public readonly buttonTheme = ButtonTheme;

  public landingForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseFormService: CourseFormService,
    private readonly translateService: TranslateService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.courseFormService.currentCourseUpdated$.subscribe(() => {
      if (
        this.courseFormService.currentCourse &&
        this.courseFormService.currentCourse?.cover_image &&
        typeof this.courseFormService.currentCourse.cover_image === 'string'
      ) {
        this.landingForm
          .get('coverImage')
          ?.setValue(this.courseFormService.currentCourse.cover_image);
      }
    });

    this.landingForm = this.formBuilder.group({
      title: new FormControl<string>(''),
      subtitle: new FormControl<string>(''),
      description: new FormControl<string>(''),
      coverImage: new FormControl<File | null>(null),
      promotionalVideo: new FormControl<string>(''),
      requirements: this.formBuilder.array([new FormControl('')]),
    });
    this.courseFormService.errors.subscribe((errors) => {
      if (errors) {
        this.titleControl.setErrors(errors['title'] ? { custom: errors['title'] } : null);
        this.subtitleControl.setErrors(
          errors['sub_title'] ? { custom: errors['sub_title'] } : null,
        );
        this.coverImageControl.setErrors(
          errors['cover_image'] ? { custom: errors['cover_image'] } : null,
        );
        this.promotionalVideoControl.setErrors(
          errors['promo_video'] ? { custom: errors['promo_video'] } : null,
        );
      } else {
        this.titleControl.setErrors(null);
        this.subtitleControl.setErrors(null);
        this.coverImageControl.setErrors(null);
        this.promotionalVideoControl.setErrors(null);
      }
      this.errorReceived.emit(
        !!this.titleControl.errors ||
          !!this.subtitleControl.errors ||
          !!this.coverImageControl.errors,
      );
      this.landingForm.updateValueAndValidity();
      this.landingForm.markAllAsTouched();
    });
    combineLatest([
      this.titleControl.valueChanges,
      this.subtitleControl.valueChanges,
      this.descriptionControl.valueChanges,
      this.coverImageControl.valueChanges,
      this.promotionalVideoControl.valueChanges,
    ]).subscribe(() => {
      this.errorReceived.emit(
        !(
          !this.titleControl.errors &&
          !this.subtitleControl.errors &&
          !this.descriptionControl.errors &&
          !this.coverImageControl.errors &&
          !this.promotionalVideoControl.errors
        ),
      );
    });

    const currentCourse = this.courseFormService.currentCourse;

    if (currentCourse) {
      this.landingForm.patchValue({
        title: currentCourse.title ?? '',
        subtitle: currentCourse.sub_title ?? '',
        description: currentCourse.description ?? '',
        coverImage: currentCourse.cover_image ?? undefined,
        promotionalVideo: currentCourse.promo_video ?? '',
      });

      const requirements = currentCourse.requirements
        ? (JSON.parse(currentCourse.requirements as string) as string[])
        : [];

      if (requirements && requirements.length > 0) {
        this.requirementsControlArray.removeAt(0);
        requirements.forEach((requirement: string) => {
          this.requirementsControlArray.push(new FormControl(requirement));
        });
      }

      this.landingForm.updateValueAndValidity();
      this.titleControl.markAsDirty();
      this.subtitleControl.markAsDirty();
      this.descriptionControl.markAsDirty();
      this.coverImageControl.markAsDirty();
      this.promotionalVideoControl.markAsDirty();
    }
  }

  public convertAbstractControlToFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  public addRequirement(): void {
    this.requirementsControlArray.push(new FormControl(''));
  }

  public removeRequirement(index: number): void {
    this.requirementsControlArray.removeAt(index);
  }

  public saveAndNext(): void {
    this.save();
    this.courseFormService.currentCourseUpdated$.subscribe(() => {
      this.nextStep.emit();
    });
  }

  public save(): void {
    this.courseFormService.updateFormData({
      landingPage: this.landingForm.value,
      status: undefined,
    });
  }

  public publish(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.translateService.instant('dashboard.courses.publish-modal.title'),
        description: this.translateService.instant('dashboard.courses.publish-modal.description'),
        confirmed: () => {
          this.courseFormService.updateFormData({
            landingPage: this.landingForm.value,
            status: 2,
          });
          dialogRef.close();
        },
        cancelled: () => {
          dialogRef.close();
        },
      },
    });
  }

  public preview(): void {
    window.open(location.origin + '/course/' + this.courseId + '/preview', '_blank');
  }

  public get titleControl(): FormControl {
    return this.landingForm.get('title') as FormControl;
  }

  public get subtitleControl(): FormControl {
    return this.landingForm.get('subtitle') as FormControl;
  }

  public get descriptionControl(): FormControl {
    return this.landingForm.get('description') as FormControl;
  }

  public get coverImageControl(): FormControl {
    return this.landingForm.get('coverImage') as FormControl;
  }

  public get promotionalVideoControl(): FormControl {
    return this.landingForm.get('promotionalVideo') as FormControl;
  }

  public get requirementsControlArray(): FormArray {
    return this.landingForm.get('requirements') as FormArray;
  }
}
