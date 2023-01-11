import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lessons, Questions } from '../../../../../../../shared/interfaces/courses/course-details';
import { ButtonTheme } from '../../../../../../../shared/enums/button-theme.enum';

interface QuizData {
  lesson: Lessons;
}

@Component({
  selector: 'us-course-quiz-modal',
  templateUrl: './course-quiz-modal.component.html',
  styleUrls: ['./course-quiz-modal.component.scss'],
})
export class CourseQuizModalComponent implements OnInit {
  public questionList: Questions[] = [];

  public quiz: number = 0;

  public readonly buttonTheme = ButtonTheme;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: QuizData,
    public dialog: MatDialogRef<CourseQuizModalComponent>,
  ) {}

  public ngOnInit(): void {
    this.questionList = this.data.lesson.questions;
  }

  public classForAnswers(answer: string, type: string) {
    switch (type) {
      case 'wrong':
        return this.questionList[this.quiz].your_answers.your_answer.includes(answer);
      case 'right':
        return this.questionList[this.quiz].your_answers.right_answers.includes(answer);
    }
    return true;
  }

  public backStep() {
    if (this.quiz >= 1) {
      this.quiz -= 1;
    }
  }

  public nextStep() {
    if (this.quiz < this.questionList.length - 1) {
      this.quiz += 1;
    } else {
      this.dialog.close();
    }
  }

  public get getQuizNext() {
    return this.quiz + 1 === this.questionList.length;
  }

  public get getQuizPrev() {
    return this.quiz > 0;
  }
}
