import { Component, Input, OnChanges } from '@angular/core';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SectionElementType } from '../../enums/section-element-type.enum';
import { ResourceType } from '../../enums/resource-type.enum';
import { TooltipOrientationEnum } from '../../../../../../../../shared/enums/tooltip-orientation.enum';
import { CourseType } from '../../../../../../../../shared/enums/course-type.enum';
import { CoursesApiService } from '../../../../../../../../shared/services/courses/courses-api.service';
import { Section } from '../../../../../../../../shared/interfaces/section.interface';
import { LessonsApiService } from '../../../../../../../../shared/services/lessons-api.service';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../../../../../../../../shared/interfaces/api/api-error.interface';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from 'src/app/shared/interfaces/lesson.interface';
import { Quiz } from '../../../../../../../../shared/interfaces/quiz.interface';
import { ApiResponse } from '../../../../../../../../shared/interfaces/api/api-response.interface';
import { CourseFormService } from '../../services/course-form.service';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-dashboard-course-section-list',
  templateUrl: './dashboard-course-section-list.component.html',
  styleUrls: ['./dashboard-course-section-list.component.scss'],
})
export class DashboardCourseSectionListComponent implements OnChanges {
  public readonly buttonTheme = ButtonTheme;

  public readonly sectionElementType = SectionElementType;

  public readonly tooltipOrientation = TooltipOrientationEnum;

  public sectionForms!: FormArray;

  @Input()
  public sectionList?: Section[];

  @Input()
  public type!: CourseType;

  @Input()
  public courseId!: number;

  @Input()
  public resourceOptions!: SelectOptions[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly coursesApiService: CoursesApiService,
    private readonly lessonsApiService: LessonsApiService,
    private readonly courseFormService: CourseFormService,
    private readonly toastrService: ToastrService,
    private translateService: TranslateService,
  ) {
    this.sectionForms = this.formBuilder.array([]);
  }

  public ngOnChanges(): void {
    this.sectionForms = new FormArray(
      this.sectionList
        ? this.sectionList.map(
            (section) =>
              new FormGroup({
                id: new FormControl(section.id),
                title: new FormControl(section.title, Validators.required),
                isEdit: new FormControl(false),
                elements:
                  section.lessons.length || section.quiz.length
                    ? new FormArray([
                        ...this.getElementList(section).map(
                          (el) =>
                            new FormGroup({
                              id: new FormControl(el.id),
                              ...this.getLessonForm(el),
                              ...this.getQuizForm(el),
                              isOpened: new FormControl(false),
                            }),
                        ),
                      ])
                    : new FormArray([
                        new FormGroup({
                          id: new FormControl(''),
                          title: new FormControl(''),
                          isEdit: new FormControl(false),
                          type: new FormControl(SectionElementType.UNTYPED),
                          resource: new FormControl(ResourceType.UNTYPED),
                          isOpened: new FormControl(true),
                        }),
                      ]),
              }),
          )
        : [],
    );
  }

  private getElementList(section: Section): ((Lesson | Quiz) & { isQuiz: boolean })[] {
    const quizes = section.quiz.map((quiz) => ({ ...quiz, isQuiz: true }));
    const lessons = section.lessons.map((lesson) => ({ ...lesson, isQuiz: false }));

    return [...lessons, ...quizes].sort((a, b) => a.position - b.position);
  }

  private getLessonForm(lesson: (Quiz | Lesson) & { isQuiz: boolean }): {
    [key: string]: FormControl;
  } {
    if (!lesson.isQuiz) {
      let controlObject: { [key: string]: FormControl } = {
        id: new FormControl(lesson.id),
        type: new FormControl(SectionElementType.LESSON),
        title: new FormControl((lesson as Lesson).title),
        isEdit: new FormControl(false),
        resource: new FormControl((lesson as Lesson).type),
        videoLink: new FormControl(
          (lesson as Lesson).video_url ? (lesson as Lesson).video_url : undefined,
        ),
        article: new FormControl(
          (lesson as Lesson).article ? (lesson as Lesson).article : undefined,
        ),
      };
      if (!!(lesson as Lesson).resources && (lesson as Lesson).resources.length > 0) {
        controlObject = {
          ...controlObject,
          resources: new FormControl((lesson as Lesson).resources.map((resource) => resource.id)),
        };
      }
      if (!!(lesson as Lesson).description) {
        controlObject = {
          ...controlObject,
          description: new FormControl((lesson as Lesson).description),
        };
      }
      return controlObject;
    } else {
      return {};
    }
  }

  private getQuizForm(quiz: (Quiz | Lesson) & { isQuiz: boolean }): {
    [key: string]: AbstractControl;
  } {
    if (quiz.isQuiz) {
      return {
        id: new FormControl(quiz.id),
        type: new FormControl(this.sectionElementType.QUIZ),
        isEdit: new FormControl(false),
        title: new FormControl(quiz.title),
        questions: new FormArray(
          (quiz as Quiz).question?.length > 0
            ? (quiz as Quiz).question.map(
                (question) =>
                  new FormGroup({
                    id: new FormControl(question.id, Validators.required),
                    question: new FormControl(question.question, Validators.required),
                    isOpen: new FormControl(false),
                    multiple: new FormControl(JSON.parse(question.right_answers).length > 1),
                    answerList: new FormArray(
                      (JSON.parse(question.answers) as string[]).map(
                        (answer) =>
                          new FormGroup({
                            text: new FormControl(answer, Validators.required),
                            correct: new FormControl(
                              JSON.parse(question.right_answers).indexOf(answer) > -1,
                            ),
                          }),
                      ),
                    ),
                  }),
              )
            : [],
        ),
      };
    } else {
      return {};
    }
  }

  public addSection(): void {
    this.courseFormService.isLoading = true;
    this.coursesApiService.createSection(this.courseId).subscribe((res) => {
      if (!(res as ApiResponse).success && (res as ApiResponse).message) {
        const message = (res as ApiResponse).errors
          ? Object.values((res as ApiResponse).errors as { [key: string]: string[] })
              .map((errorsArray) => (errorsArray as string[]).join('\n'))
              .join('\n')
          : '';
        this.toastrService.error((res as ApiResponse).message + (message ? '\n' + message : ''));
      } else {
        this.sectionForms.push(
          this.formBuilder.group({
            id: new FormControl((res as Section).id, Validators.required),
            title: new FormControl((res as Section).title, Validators.required),
            isEdit: new FormControl(false),
            elements: this.formBuilder.array([
              this.formBuilder.group({
                type: SectionElementType.UNTYPED,
                resource: ResourceType.UNTYPED,
              }),
            ]),
          }),
        );

        this.sectionForms.updateValueAndValidity();
        this.toastrService.success(this.translateService.instant('toast-messages.section-created'));
      }

      this.courseFormService.isLoading = false;
    });
  }

  public updateSection(sectionControl: AbstractControl): void {
    if (sectionControl.get('title')?.valid && sectionControl.get('id')) {
      this.courseFormService.isLoading = true;
      this.coursesApiService
        .updateSection({
          id: sectionControl.get('id')?.value,
          title: sectionControl.get('title')?.value,
        })
        .subscribe((res) => {
          if (!(res as ApiResponse).success && (res as ApiResponse).message) {
            const message = (res as ApiResponse).errors
              ? Object.values((res as ApiResponse).errors as { [key: string]: string[] })
                  .map((errorsArray) => (errorsArray as string[]).join('\n'))
                  .join('\n')
              : '';
            this.toastrService.error(
              (res as ApiResponse).message + (message ? '\n' + message : ''),
            );
          } else {
            const section = res as Section;

            sectionControl.patchValue({
              id: section.id,
              title: section.title,
            });

            sectionControl.get('isEdit')?.setValue(false);

            const sectionId = (sectionControl as FormGroup).get('id')?.value;
            const sectionFromlist = this.sectionList?.find(
              (sectionEl: Section) => sectionEl.id === sectionId,
            );

            if (sectionFromlist) {
            }

            this.toastrService.success(
              this.translateService.instant('toast-messages.section-update'),
            );
          }

          this.courseFormService.isLoading = false;
        });
    }
  }

  public cancelRename(control: AbstractControl): void {
    control.get('isEdit')?.setValue(false);
    const sectionId = (control as FormGroup).get('id')?.value;
    const section = this.sectionList?.find((sectionEl: Section) => sectionEl.id === sectionId);

    if (section) {
      control.get('title')?.setValue(section.title);
    }
  }

  public getElementFormGroups(index: number): FormGroup[] {
    return ((this.sectionForms.controls[index] as FormGroup)?.get('elements') as FormArray)
      .controls as FormGroup[];
  }

  public convertAbstractControlToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public setElementType(control: FormGroup, type: SectionElementType, index: number): void {
    const sectionId = control.parent?.parent?.get('id')?.value;
    if (sectionId) {
      if (type === SectionElementType.LESSON) {
        this.lessonsApiService
          .createLesson({
            title: 'Lesson ' + (index + 1),
            section_id: sectionId,
            course_id: this.courseId,
            position: control.get('position')?.value ?? undefined,
          })
          .pipe(
            catchError((errResponse: ApiError) => {
              this.toastrService.error(errResponse.error.message);
              return throwError(errResponse);
            }),
          )
          .subscribe((res) => {
            if (res && !(res as ApiResponse).success && (res as ApiResponse).message) {
              const message = (res as ApiResponse).errors
                ? Object.values((res as ApiResponse).errors as { [key: string]: string[] })
                    .map((errorsArray) => (errorsArray as string[]).join('\n'))
                    .join('\n')
                : '';
              this.toastrService.error(
                (res as ApiResponse).message + (message ? '\n' + message : ''),
              );
            } else {
              if (!control.get('id')) {
                control.addControl('id', new FormControl(''));
              }
              if (!control.get('isEdit')) {
                control.addControl('isEdit', new FormControl(false));
              }
              if (!control.get('title')) {
                control.addControl('title', new FormControl(''));
              }
              control.get('type')?.setValue(type);
              control.get('id')?.setValue((res as Lesson).id);
              control.get('title')?.setValue((res as Lesson).title);
              control.get('isOpened')?.setValue(true);
              control.updateValueAndValidity();
              this.sectionForms.updateValueAndValidity();
            }
          });
      } else if (type === SectionElementType.QUIZ) {
        if (!control.get('title')) {
          control.addControl('title', new FormControl(''));
        }
        control.get('type')?.setValue(type);
        control.get('isOpened')?.setValue(true);
        control.updateValueAndValidity();
        this.sectionForms.updateValueAndValidity();
      }
    }
  }

  public removeSection(sectionId: number, index: number): void {
    this.courseFormService.isLoading = true;
    this.coursesApiService.deleteSection(sectionId).subscribe((res) => {
      if (res && !res.success && res.message) {
        this.toastrService.error(res.message);
      } else {
        this.sectionForms.removeAt(index);
        this.sectionForms.updateValueAndValidity();
        this.toastrService.success(this.translateService.instant('toast-messages.section-removed'));
      }

      this.courseFormService.isLoading = false;
    });
  }

  public addElementToSection(
    control: AbstractControl,
    toggleFunc: () => void,
    expanded?: boolean,
  ): void {
    (control.get('elements') as FormArray).push(
      this.formBuilder.group({
        type: new FormControl(SectionElementType.UNTYPED),
        isEdit: new FormControl(false),
        isOpened: new FormControl(false),
        resource: new FormControl(null),
        position: new FormControl((control.get('elements') as FormArray).length),
      }),
    );

    control.updateValueAndValidity();
    this.sectionForms.updateValueAndValidity();

    if (!expanded) {
      toggleFunc();
    }
  }
}
