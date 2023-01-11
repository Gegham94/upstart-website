import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { QuizApiService } from '../../../../../../../../shared/services/quiz-api.service';
import { CourseFormService } from '../../services/course-form.service';
import { ToastrService } from 'ngx-toastr';
import { SectionElementType } from '../../enums/section-element-type.enum';
import { Quiz } from '../../../../../../../../shared/interfaces/quiz.interface';
import { ApiResponse } from '../../../../../../../../shared/interfaces/api/api-response.interface';
import { AccordionComponent } from '../../../../../../../../shared/components/accordion/components/accordion.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-dashboard-course-quiz',
  templateUrl: './dashboard-course-quiz.component.html',
  styleUrls: ['./dashboard-course-quiz.component.scss'],
})
export class DashboardCourseQuizComponent {
  public readonly buttonTheme = ButtonTheme;

  public editMode: boolean = true;

  @Input()
  public quizForm!: FormGroup;

  @Input()
  public index!: number;

  @Input()
  public sectionId!: number;

  @Input()
  public courseId!: number;

  @Input()
  public collapsed: boolean = false;

  @ViewChildren(AccordionComponent)
  public accordionQueryList!: QueryList<AccordionComponent>;

  constructor(
    private readonly quizApiService: QuizApiService,
    private readonly courseFormService: CourseFormService,
    private readonly toastrService: ToastrService,
    private translateService: TranslateService,
  ) {}

  public addQuestionField(): void {
    if (!this.quizForm.get('questions')) {
      this.quizForm.addControl(
        'questions',
        new FormArray(
          [
            new FormGroup(
              {
                question: new FormControl('', Validators.required),
                multiple: new FormControl(false),
                isOpen: new FormControl(true),
                answerList: new FormArray([
                  new FormGroup({
                    text: new FormControl('', Validators.required),
                    correct: new FormControl(true),
                  }),
                ]),
              },
              Validators.required,
            ),
          ],
          Validators.required,
        ),
      );
    } else {
      (this.quizForm.get('questions') as FormArray).push(
        new FormGroup(
          {
            question: new FormControl('', Validators.required),
            multiple: new FormControl(false),
            isOpen: new FormControl(true),
            answerList: new FormArray([
              new FormGroup({
                text: new FormControl('', Validators.required),
                correct: new FormControl(true),
              }),
            ]),
          },
          Validators.required,
        ),
      );
    }
  }

  public saveQuestion(control: AbstractControl): void {
    const sectionId = control.parent?.parent?.parent?.parent?.get('id')?.value;
    this.courseFormService.isLoading = true;

    if (!control.value.id) {
      this.quizApiService
        .createQuestion(sectionId, {
          quiz_id: this.quizForm.value.id ? this.quizForm.value.id : undefined,
          position:
            !control.value.id && control.parent?.parent?.value.position
              ? control.parent?.parent?.value.position
              : undefined,
          multiple_choice: control.value.multiple ? 1 : 0,
          question: control.value.question,
          answers: control.value.answerList.map(
            (answer: { text: string; correct: boolean }) => answer.text,
          ),
          title: !control.value.id
            ? this.quizForm.value.title
              ? this.quizForm.value.title
              : 'Quiz ' + (this.index + 1)
            : undefined,
          right_answers: control.value.answerList
            .filter((answer: { text: string; correct: boolean }) => answer.correct)
            .map((answer: { text: string; correct: boolean }) => answer.text),
        })
        .subscribe((res) => {
          if (!res.success) {
            this.toastrService.error(res.message);
          } else {
            this.toastrService.success(
              this.translateService.instant('toast-messages.question-update'),
            );

            if (!this.quizForm.get('id')) {
              this.quizForm.addControl(
                'id',
                new FormControl(res.data.quiz_id, Validators.required),
              );
            } else {
              this.quizForm.get('id')?.setValue(res.data.quiz_id);
            }

            if (control.get('id')) {
              control.get('id')?.setValue(res.data.id);
            } else {
              (control as FormGroup).addControl('id', new FormControl(res.data.id));
            }

            control.markAsUntouched();
            control.markAsPristine();
          }
          this.courseFormService.isLoading = false;
        });
    } else {
      this.quizApiService
        .updateQuestion(control.value.id, {
          quiz_id: this.quizForm.value.id ? this.quizForm.value.id : undefined,
          position:
            !control.value.id && control.parent?.parent?.value.position
              ? control.parent?.parent?.value.position
              : undefined,
          multiple_choice: control.value.multiple ? 1 : 0,
          question: control.value.question,
          answers: control.value.answerList.map(
            (answer: { text: string; correct: boolean }) => answer.text,
          ),
          right_answers: control.value.answerList
            .filter((answer: { text: string; correct: boolean }) => answer.correct)
            .map((answer: { text: string; correct: boolean }) => answer.text),
        })
        .subscribe((res) => {
          if (!res.success) {
            this.toastrService.error(res.message);
          } else {
            this.toastrService.success(res.message);
          }

          this.courseFormService.isLoading = false;
        });
    }
  }

  public setEditMode(newState: boolean): void {
    this.editMode = newState;
  }

  public getFromGroupFromAbstractControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public removeFromAnswerList(control: AbstractControl, index: number): void {
    (control.get('answerList') as FormArray).removeAt(index);
    this.quizForm.updateValueAndValidity();
  }

  public deleteQuiz(id: number): void {
    if (id) {
      this.quizApiService.deleteQuiz(id, this.courseId, this.sectionId).subscribe((res) => {
        if (res && !res.success && res.message) {
          this.toastrService.error(res.message);
        } else {
          (this.quizForm.parent as FormArray).removeAt(
            (this.quizForm.parent?.value as Quiz[]).findIndex(
              (quiz) =>
                (quiz.type as unknown as string) === SectionElementType.QUIZ && quiz.id === id,
            ),
          );
          this.toastrService.success(res.message);
        }
      });
    } else {
      (this.quizForm.parent as FormArray).removeAt(this.index);
    }
  }

  public cancelRename() {
    this.quizForm.get('isEdit')?.setValue(false);
    const courseSection = this.courseFormService.currentCourse?.sections?.find(
      (section) => section.id === this.sectionId,
    );
    const courseQuiz = courseSection?.quiz.find(
      (quiz) => quiz.id === this.quizForm.get('id')?.value,
    );

    this.quizForm.get('title')?.setValue(courseQuiz?.title ? courseQuiz.title : '');
  }

  public updateQuiz() {
    if (this.quizForm.value.id) {
      if (this.quizForm.get('title')?.valid) {
        this.courseFormService.isLoading = true;
        this.quizApiService
          .updateQuiz({
            id: this.quizForm.get('id')?.value,
            title: this.quizForm.get('title')?.value,
            course_id: this.courseId,
            section_id: this.sectionId,
          })
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
              this.quizForm.get('isEdit')?.setValue(false);
              this.toastrService.success(
                this.translateService.instant('toast-messages.quize-update'),
              );
            }

            this.courseFormService.isLoading = false;
          });
      }
    } else {
      this.quizForm.get('isEdit')?.setValue(false);
    }
  }

  public get questionFormArray(): FormArray | null {
    return (this.quizForm.get('questions') as FormArray) ?? null;
  }
}
