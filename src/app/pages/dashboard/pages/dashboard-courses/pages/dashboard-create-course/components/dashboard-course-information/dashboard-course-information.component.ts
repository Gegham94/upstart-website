import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options.interface';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { CourseFormService } from '../../services/course-form.service';
import { CourseType } from '../../../../../../../../shared/enums/course-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { ResourceService } from '../../../../../../../../shared/services/resources/resource.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../../../../../../shared/components/confirmation-modal/components/confirmation-modal.component';

@Component({
  selector: 'us-dashboard-course-information',
  templateUrl: './dashboard-course-information.component.html',
  styleUrls: ['./dashboard-course-information.component.scss'],
})
export class DashboardCourseInformationComponent implements OnInit {
  @Input()
  public isLast: boolean = false;

  @Input()
  public publishDisabled!: boolean;

  @Output()
  public errorReceived: EventEmitter<boolean> = new EventEmitter<boolean>();

  public informationForm!: FormGroup;

  public readonly buttonTheme = ButtonTheme;

  public readonly courseTypeEnum = CourseType;

  public readonly languageOptions: SelectOptions[] = [
    {
      displayName: 'Հայերեն',
      value: 1,
    },
    {
      displayName: 'English',
      value: 2,
    },
  ];

  public readonly levelOptions: SelectOptions[] = [
    {
      displayName: 'All Levels',
      value: 1,
    },
    {
      displayName: 'Beginner',
      value: 2,
    },
    {
      displayName: 'Middle',
      value: 3,
    },
    {
      displayName: 'Advanced',
      value: 4,
    },
  ];

  public courseType!: CourseType;

  public lessonCount: number = 1;

  @Input()
  public courseId: number = 0;

  @Output()
  public nextStep: EventEmitter<void> = new EventEmitter<void>();

  public lessonInvalidList: boolean[] = [];

  public resourcesOptions: SelectOptions[] = [];

  public isPaid: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly courseFormService: CourseFormService,
    private readonly translateService: TranslateService,
    private readonly resourceService: ResourceService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      language: new FormControl(this.translateService.currentLang === 'hy' ? 1 : 2),
      level: new FormControl(''),
      whatWillLearn: new FormArray([new FormControl('')]),
      price: new FormControl({
        currency: 'usd',
        amount: 0,
      }),
      paid: new FormControl(false),
    });

    this.courseFormService.errors.subscribe((errors) => {
      if (errors) {
        this.informationForm
          .get('language')
          ?.setErrors(errors['language'] ? { custom: errors['language'] } : null);
        this.informationForm
          .get('level')
          ?.setErrors(errors['level'] ? { custom: errors['level'] } : null);
        this.informationForm
          .get('address')
          ?.setErrors(errors['address'] ? { custom: errors['address'] } : null);
        this.informationForm
          .get('link')
          ?.setErrors(errors['link'] ? { custom: errors['link'] } : null);
        if (!errors['lessons']) {
          const lessonKeys = Object.keys(errors).filter((key) => key.indexOf('lesson') > -1);
          if (lessonKeys.length > 0) {
            lessonKeys.forEach((el) => {
              const lessonError = el.split('.');
              if (lessonError[2] !== 'duration') {
                (this.informationForm.get('lessons') as FormArray)?.controls[+lessonError[1]]
                  .get('enterDate')
                  ?.setErrors({ custom: errors[el] });
              } else {
                (this.informationForm.get('lessons') as FormArray)?.controls[+lessonError[1]]
                  .get('duration')
                  ?.setErrors({ custom: errors[el] });
              }
            });
          }
          this.informationForm.get('lessons')?.setErrors({ custom: null });
        } else {
          this.informationForm.get('lessons')?.setErrors({ custom: errors['lessons'] });
        }
        this.informationForm.updateValueAndValidity();
      }
    });

    this.courseType = this.courseFormService.formData.type as CourseType;

    combineLatest([this.informationForm.valueChanges]).subscribe(() => {
      this.errorReceived.emit(
        !(
          !this.informationForm.get('language')?.errors &&
          !this.informationForm.get('address')?.errors &&
          !this.informationForm.get('link')?.errors &&
          !this.informationForm.get('level')?.errors &&
          this.lessonInvalidList.filter((el) => el).length === 0
        ),
      );
    });

    if (this.courseType !== CourseType.ONLINE) {
      const course = this.courseFormService.currentCourse;
      if (this.courseType === CourseType.ONLINE_WEBINAR) {
        this.informationForm.addControl('link', new FormControl(course?.link ?? ''));
      } else {
        this.informationForm.addControl('address', new FormControl(course?.address ?? ''));
      }

      this.informationForm.addControl('lessonCount', new FormControl(course?.lessons_count ?? 1));
      this.informationForm.get('lessonCount')?.valueChanges.subscribe((newValue: number) => {
        const lessonNumber: number = this.lessonGroupList.controls.length - newValue;

        if (lessonNumber < 0) {
          for (let i = 0; i < -lessonNumber; i++) {
            this.addLesson();
          }
        } else {
          for (let i = 0; i <= lessonNumber; i++) {
            this.removeLesson(this.lessonGroupList.controls.length - i);
          }
        }

        (this.informationForm.get('lessons') as FormArray)?.controls.forEach((control, index) => {
          this.lessonInvalidList[index] = false;
          control.get('enterDate')?.statusChanges.subscribe(() => {
            this.lessonInvalidList[index] = !!control.get('enterDate')?.errors;
          });
          control.get('enterTime')?.statusChanges.subscribe(() => {
            this.lessonInvalidList[index] = !!control.get('enterTime')?.errors;
          });
          control.get('duration')?.statusChanges.subscribe(() => {
            this.lessonInvalidList[index] = !!control.get('duration')?.errors;
          });
        });
      });

      this.informationForm.addControl(
        'maxParticipants',
        new FormControl(course?.max_participants ?? 1),
      );
      this.informationForm.addControl('lessons', new FormArray([]));

      if (
        this.courseFormService.currentCourse?.lessons &&
        this.courseFormService.currentCourse.lessons.length > 0
      ) {
        this.courseFormService.currentCourse.lessons.forEach((lesson) => {
          const date = lesson.start_time ? new Date(lesson.start_time) : new Date();
          (this.informationForm.get('lessons') as FormArray).push(
            this.formBuilder.group({
              title: new FormControl<string>(
                !!lesson.title
                  ? lesson.title
                  : `Lesson ${
                      (this.informationForm.get('lessons') as FormArray)?.controls.length + 1
                    }`,
              ),
              enterDate: new FormControl<Date>(date),
              enterTime: new FormControl<Date>(date),
              duration: new FormControl<number>(lesson.duration ? lesson.duration / 60 : 1),
            }),
          );
        });
      } else {
        (this.informationForm.get('lessons') as FormArray).push(
          this.formBuilder.group({
            title: new FormControl<string>(`Lesson 1`),
            enterDate: new FormControl<Date>(new Date()),
            enterTime: new FormControl<Date>(new Date()),
            duration: new FormControl<number>(120),
          }),
        );
      }
    } else {
      this.resourceService.getResources().subscribe((res) => {
        this.resourcesOptions = [
          ...res.data.data.map((el) => ({
            displayName: el.title,
            value: el.id,
          })),
          {
            displayName: this.translateService.instant('dashboard.courses.add-resource'),
            value: -1,
          },
        ];
      });
      this.informationForm.addControl('link', new FormControl(''));
      this.informationForm.addControl('resources', new FormControl([]));
    }

    (this.informationForm.get('lessons') as FormArray)?.controls.forEach((control, index) => {
      this.lessonInvalidList[index] = false;
      control.get('enterDate')?.statusChanges.subscribe(() => {
        this.lessonInvalidList[index] = !!control.get('enterDate')?.errors;
      });
      control.get('enterTime')?.statusChanges.subscribe(() => {
        this.lessonInvalidList[index] = !!control.get('enterTime')?.errors;
      });
      control.get('duration')?.statusChanges.subscribe(() => {
        this.lessonInvalidList[index] = !!control.get('duration')?.errors;
      });
    });

    if (this.courseFormService.currentCourse) {
      this.informationForm.patchValue({
        language: this.courseFormService.currentCourse.language
          ? this.courseFormService.currentCourse.language
          : this.translateService.currentLang === 'hy'
          ? 1
          : 2,
        level: this.courseFormService.currentCourse.level ?? '',
        price: {
          currency: this.courseFormService.currentCourse.currency,
          amount: this.courseFormService.currentCourse.price,
        },
        paid:
          !!this.courseFormService.currentCourse.price &&
          this.courseFormService.currentCourse.price > 0,
      });

      this.isPaid =
        !!this.courseFormService.currentCourse.price &&
        this.courseFormService.currentCourse.price > 0;

      const willLearn = JSON.parse(this.courseFormService.currentCourse.will_learn as string);

      if (willLearn && willLearn.length > 0) {
        this.whatWillLearn.removeAt(0);
        willLearn.map((element: string) => {
          this.whatWillLearn.push(new FormControl(element));
        });
      }
    }
  }

  public setPaidValue(isPaid: boolean): void {
    this.isPaid = isPaid;
    this.informationForm.get('paid')?.setValue(isPaid);
  }

  public saveAndNext(): void {
    this.save();
    this.nextStep.emit();
  }

  public save(): void {
    this.courseFormService.updateFormData({
      courseInformation: {
        ...this.informationForm.value,
        price: this.informationForm.value.paid
          ? this.informationForm.value.price
          : { ...this.informationForm.value.price, amount: 0 },
      },
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
            courseInformation: this.informationForm.value,
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

  public addLesson(): void {
    this.lessonGroupList.push(
      this.formBuilder.group({
        enterDate: new FormControl(null),
        enterTime: new FormControl(null),
        duration: new FormControl(null),
      }),
    );
  }

  public removeLesson(index: number): void {
    this.lessonGroupList.removeAt(index);
  }

  public removeWhatWillLearn(index: number): void {
    this.whatWillLearn.removeAt(index);
  }

  public addWhatWillLearn(): void {
    this.whatWillLearn.push(new FormControl(''));
  }

  public convertAbstractControlToFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  public get whatWillLearn(): FormArray {
    return this.informationForm.get('whatWillLearn') as FormArray;
  }

  public get lessonGroupList(): FormArray {
    return this.informationForm.get('lessons') as FormArray;
  }

  public get lessonGroupListControls(): FormGroup[] {
    return (this.informationForm.get('lessons') as FormArray).controls as FormGroup[];
  }
}
