import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourseFormService } from '../../services/course-form.service';
import { TrainerCenterApiService } from '../../../../../../../../shared/services/trainer-center-api.service';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options.interface';
import { CenterTrainer } from '../../../../../../../../shared/interfaces/center-trainer.interface';
import { ConfirmationModalComponent } from '../../../../../../../../shared/components/confirmation-modal/components/confirmation-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'us-dashboard-course-trainer',
  templateUrl: './dashboard-course-trainer.component.html',
  styleUrls: ['./dashboard-course-trainer.component.scss'],
})
export class DashboardCourseTrainerComponent implements OnInit {
  public trainersOptions: SelectOptions[] = [];

  public displayTrainerOptions: SelectOptions[] = [];

  public readonly buttonTheme = ButtonTheme;

  @Input()
  public courseId!: number;

  @Input()
  public publishDisabled!: boolean;

  @Output()
  public nextStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public errorReceived: EventEmitter<boolean> = new EventEmitter<boolean>();

  public trainerForm!: FormGroup;

  public trainerList: CenterTrainer[];

  public selectedTrainer: SelectOptions | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseForm: CourseFormService,
    private readonly trainerCenterApiService: TrainerCenterApiService,
    private readonly translateService: TranslateService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.courseForm.currentCourseUpdated$.subscribe(() => {
      if (
        this.courseForm.currentCourse &&
        this.courseForm.currentCourse?.cover_image &&
        typeof this.courseForm.currentCourse.cover_image === 'string'
      ) {
        this.trainerForm.get('coverImage')?.setValue(this.courseForm.currentCourse.cover_image);
      }
    });

    this.trainerForm = this.formBuilder.group({
      id: new FormControl<number | null>(null),
      name: new FormControl<string>(''),
      surname: new FormControl<string>(''),
      bio: new FormControl<string>(''),
      image: new FormControl<File | null>(null),
    });

    this.courseForm.errors.subscribe((errors) => {
      if (errors) {
        this.trainerForm.get('name')?.setErrors({ custom: errors['trainer.first_name'] });
        this.trainerForm.get('surname')?.setErrors({ custom: errors['trainer.last_name'] });
        this.trainerForm.get('bio')?.setErrors({ custom: errors['trainer.bio'] });
        this.trainerForm.get('image')?.setErrors({ custom: errors['trainer.avatar'] });
      } else {
        this.trainerForm.get('name')?.setErrors(null);
        this.trainerForm.get('surname')?.setErrors(null);
        this.trainerForm.get('bio')?.setErrors(null);
        this.trainerForm.get('image')?.setErrors(null);
      }
      this.errorReceived.emit(!!errors);
    });

    this.trainerForm.valueChanges.subscribe(() => {
      this.errorReceived.emit(
        !(
          !this.trainerForm.get('name')?.errors &&
          !this.trainerForm.get('surname')?.errors &&
          !this.trainerForm.get('bio')?.errors &&
          !this.trainerForm.get('avatar')?.errors
        ),
      );
    });

    this.trainerForm.patchValue(this.courseForm.formData.trainer as { [key: string]: unknown });

    this.trainerCenterApiService.getCurrentTrainers().subscribe((trainers) => {
      this.trainerList = trainers;
      this.trainersOptions = trainers.map((trainer) => ({
        displayName: trainer.first_name + ' ' + trainer.last_name,
        value: trainer.id,
      }));

      this.displayTrainerOptions = this.trainersOptions;
    });
  }

  public saveAndNext(): void {
    this.save();
    this.nextStep.emit();
  }

  public save(): void {
    this.courseForm.updateFormData({ trainer: this.trainerForm.value, status: undefined });
  }

  public publish(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.translateService.instant('dashboard.courses.publish-modal.title'),
        description: this.translateService.instant('dashboard.courses.publish-modal.description'),
        confirmed: () => {
          this.courseForm.updateFormData({
            trainer: this.trainerForm.value,
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

  public trainerSelected(selectedOption: SelectOptions): void {
    if (selectedOption.value !== -1) {
      const currentTrainer = this.trainerList.find(
        (trainer) => trainer.id === selectedOption.value,
      );

      if (currentTrainer) {
        this.trainerForm.reset();

        this.trainerForm.patchValue({
          id: currentTrainer.id,
          name: currentTrainer.first_name,
          surname: currentTrainer.last_name,
          bio: currentTrainer.bio,
          image: currentTrainer.avatar ?? null,
        });
      }
    } else {
      this.trainerForm.reset();
      this.selectedTrainer = null;
    }
  }

  public get isUpdating(): boolean {
    return !!this.trainerForm.get('id')?.value;
  }
}
