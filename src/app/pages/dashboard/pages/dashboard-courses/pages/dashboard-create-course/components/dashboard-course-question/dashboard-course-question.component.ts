import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-dashboard-course-question',
  templateUrl: './dashboard-course-question.component.html',
  styleUrls: ['./dashboard-course-question.component.scss'],
})
export class DashboardCourseQuestionComponent {
  public readonly buttonTheme = ButtonTheme;

  @Input()
  public collapsed: boolean = false;

  @Input()
  public questionForm!: FormGroup;

  @Input()
  public quizForm!: FormGroup;

  @Input()
  public index!: number;

  @Output()
  private save: EventEmitter<void> = new EventEmitter<void>();

  public get getQuestionAnswerList(): FormArray {
    return this.questionForm.get('answerList') as FormArray;
  }

  public getFormGroupFromAbstractControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public handleCorrectChecked(checked: boolean, currentIndex: number): void {
    const controlList = this.getQuestionAnswerList.controls;
    if (!this.questionForm.get('multiple')?.value) {
      controlList.forEach((control, index) => {
        if (currentIndex !== index) {
          control.get('correct')?.setValue(false);
        } else {
          control.get('correct')?.setValue(true);
        }
      });
    } else {
      const currentControl = controlList.find((control, index) => currentIndex === index);
      const correctList = controlList.filter((control) => !!control.get('correct')?.value);
      if (!checked && correctList.length > 1) {
        currentControl?.get('correct')?.setValue(false);
      } else {
        currentControl?.get('correct')?.setValue(true);
      }
    }
    this.quizForm.updateValueAndValidity();
  }

  public removeFromAnswerList(index: number): void {
    this.getQuestionAnswerList.removeAt(index);
    this.quizForm.updateValueAndValidity();
  }

  public addAnswerForm(): void {
    this.getQuestionAnswerList.push(
      new FormGroup({
        text: new FormControl('', Validators.required),
        correct: new FormControl(false),
      }),
    );

    this.quizForm.updateValueAndValidity();
  }

  public buttonDisabled(): boolean {
    return (
      !this.questionForm.touched ||
      this.questionForm.pristine ||
      (this.questionForm.invalid &&
        this.getQuestionAnswerList.controls.filter((answer) => answer.value).length > 0)
    );
  }

  public saveQuestion(): void {
    this.save.emit();
  }

  public multipleChecked(): void {
    const controlList = this.getQuestionAnswerList.controls;

    controlList.forEach((control) => {
      control.get('correct')?.setValue(false);
    });

    controlList[0].get('correct')?.setValue(true);
  }
}
