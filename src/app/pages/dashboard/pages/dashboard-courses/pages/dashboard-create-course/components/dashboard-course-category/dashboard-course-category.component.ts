import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { CourseFormService } from '../../services/course-form.service';
import { CategoriesInterface } from '../../../../../../../../shared/interfaces/categories/categories.interface';
import { GlobalService } from '../../../../../../../../shared/services/global.service';
import { ConfirmationModalComponent } from '../../../../../../../../shared/components/confirmation-modal/components/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-dashboard-course-category',
  templateUrl: './dashboard-course-category.component.html',
  styleUrls: ['./dashboard-course-category.component.scss'],
})
export class DashboardCourseCategoryComponent implements OnInit {
  @Input()
  public publishDisabled!: boolean;

  @Input()
  public courseId!: number;

  @Output()
  public nextStep: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public errorReceived: EventEmitter<boolean> = new EventEmitter<boolean>();

  public readonly buttonTheme = ButtonTheme;

  public categoryList: SelectOptions[] = [];

  public categoryForm!: FormGroup;

  public errors?: { [key: string]: string | string[] };

  private isSelectedFromList: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseFormService: CourseFormService,
    private readonly globalService: GlobalService,
    private readonly translateService: TranslateService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      category: new FormControl<string>(''),
    });

    this.globalService.categoriesListObservable.subscribe((categories) => {
      const mapCategoryToSelectOption = (category: CategoriesInterface): SelectOptions => {
        return {
          displayName: category.title,
          value: category.id,
          children: category.children.map(mapCategoryToSelectOption),
        };
      };
      this.categoryList = categories.map(mapCategoryToSelectOption);
      if (this.courseFormService.formData.category) {
        this.categoryControl.setValue(this.courseFormService.formData.category);
      }
    });

    this.courseFormService.errors.subscribe((errors) => {
      this.errorReceived.emit(!!errors && Object.keys(errors).length > 0);
      this.errors = errors;
    });

    this.categoryControl.valueChanges.subscribe(() => {
      this.errorReceived.emit(!!this.categoryControl.errors);
    });
  }

  public setCategoryByClick(category: number): void {
    this.isSelectedFromList = this.categoryControl.value !== category;
    if (this.isSelectedFromList) {
      this.categoryControl.setValue(category);
      this.categoryControl.disable();
    } else {
      this.categoryControl.setValue(-1);
      this.categoryControl.enable();
    }

    this.categoryControl.updateValueAndValidity();
  }

  public saveAndNext() {
    this.save();
    this.nextStep.emit();
  }

  public save(): void {
    this.courseFormService.updateFormData({ ...this.categoryForm.value, status: undefined });
  }

  public publish(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.translateService.instant('dashboard.courses.publish-modal.title'),
        description: this.translateService.instant('dashboard.courses.publish-modal.description'),
        confirmed: () => {
          this.courseFormService.updateFormData({
            ...this.categoryForm.value,
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

  public get categoryControl(): FormControl<number> {
    return this.categoryForm.get('category') as FormControl<number>;
  }
}
