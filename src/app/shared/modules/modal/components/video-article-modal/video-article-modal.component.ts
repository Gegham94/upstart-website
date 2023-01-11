import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lessons, Questions, Resources } from '../../../../interfaces/courses/course-details';
import { GoToClassService } from 'src/app/shared/services/go-to-class/go-to-class.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

type ModalData = {
  quiz_id: number;
  id: number;
  preview: boolean;
  lesson: Lessons;
  resources: Resources[];
  course_id: number;
};

type QuestionsType = {
  id: number;
  answer: string[];
};

type FinalRequestType = {
  quiz_id: number;
  questions: QuestionsType[];
};

type GroupNameType = {
  questionId: number;
  title: string;
  group: FormGroup;
};
@Component({
  selector: 'us-video-article-modal',
  templateUrl: './video-article-modal.component.html',
  styleUrls: ['./video-article-modal.component.scss'],
})
export class VideoArticleModalComponent implements OnInit {
  public videoUrl: SafeResourceUrl = '';

  public allQuestions: Questions[] = [];

  public startQuiz: boolean = false;

  public question?: Questions;

  public modalData: ModalData;

  public step = 0;

  public questionId: number = 0;

  public choosenAnswers: string[] = [];

  private choosenObject: QuestionsType;

  private final: QuestionsType[] = [];

  public answerForm: FormGroup;

  public forms: GroupNameType[] = [];

  public isOpenNextButton: boolean = false;

  public successQuiz: boolean = false;

  public successQuizMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ModalData,
    private sanitizer: DomSanitizer,
    private goToClassService: GoToClassService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<VideoArticleModalComponent>,
  ) {
    this.modalData = this.data;
    if (this.modalData.id !== -1) this.createDynamicForm();
  }

  public ngOnInit(): void {
    if (this.modalData.id !== -1) this.allQuestions = this.data.lesson.questions;
    if (this.data.lesson) {
      let embedUrl = this.embedVideo(this.modalData.lesson.video_url);
      this.videoUrl = this.getSafeUrl(embedUrl);
    }
  }

  public embedVideo(url: string) {
    let youtubeRegExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let yt = url.match(youtubeRegExp);
    if (yt) return '//www.youtube.com/embed/' + yt[1];
    return '';
  }

  public getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public startQuizAction(): void {
    this.startQuiz = true;
    this.setDialogSize();
    this.getQuestionByStep(0);
    this.getFormByStep(0);
  }

  private getQuestionByStep(step: number): void {
    this.question = this.allQuestions[step];
  }

  public stepAction(event: boolean): void {
    if (event) {
      this.step++;
      this.getQuestionByStep(this.step);
      this.final.push(this.choosenObject);
      this.choosenAnswers = [];
      this.getFormByStep(this.step);
      this.isOpenNextButton = false;
      this.answerForm.updateValueAndValidity();
    } else {
      this.step--;
      this.getQuestionByStep(this.step);
      this.getFormByStep(this.step);
      this.answerForm.updateValueAndValidity();
    }
    if (this.step < 0) {
      this.step = 0;
      this.startQuiz = false;
      this.setDialogSize();
    }
  }

  private setDialogSize(): void {
    const modal = document.getElementsByClassName('quiz-modal-section')[0];
    if (!modal.classList.contains('start-action')) {
      modal.classList.add('start-action');
      modal.setAttribute('style', 'width: 600px; min-height: 428px');
    } else {
      modal.classList.remove('start-action');
      modal.removeAttribute('style');
    }
  }

  public finishQuiz(): void {
    const formsData = [...this.forms] as GroupNameType[];
    let requestObject: QuestionsType[] = [];
    let choosenAnswers: string[] = [];
    formsData.forEach((elem) => {
      for (let [key, value] of Object.entries(elem.group.getRawValue())) {
        if (key === 'radio') {
          const obj = {
            id: elem.questionId,
            answer: [value],
          } as QuestionsType;
          requestObject.push(obj);
        } else if (key !== 'radio' && value) {
          choosenAnswers.push(key);
          const obj = {
            id: elem.questionId,
            answer: choosenAnswers,
          } as QuestionsType;
          requestObject.push(obj);
        }
      }
      requestObject = this.getUniqueListBy(requestObject);
    });
    const sendBody = {
      quiz_id: this.modalData.quiz_id,
      questions: requestObject,
    } as FinalRequestType;
    this.fetchQuizes(sendBody);
  }

  private getUniqueListBy(array: QuestionsType[]) {
    return [...new Map(array.map((item) => [item.id, item])).values()];
  }

  private fetchQuizes(data: FinalRequestType): void {
    this.goToClassService.passQuize(data).subscribe(
      (res) => {
        this.toastrService.success(this.translateService.instant('global.pass_quiz'));
        this.successQuiz = true;
        this.successQuizMessage = res.message;
      },
      (error) => {
        this.toastrService.error(error);
      },
    );
  }

  private createDynamicForm(): void {
    let quizForm = 0;
    this.modalData.lesson.questions.forEach((elem) => {
      quizForm++;
      let formGroup = new FormGroup({});
      if (elem.multiple_choice === 0) {
        elem.answers.forEach(() => {
          formGroup.addControl(`radio`, new FormControl('', Validators.required));
        });
        this.forms.push({
          questionId: elem.question_id,
          title: `answerForm${quizForm}`,
          group: formGroup,
        });
      } else {
        const formGroupCheckbox = new FormGroup({});
        elem.answers.forEach((answer) => {
          formGroupCheckbox.addControl(answer, new FormControl());
        });
        this.forms.push({
          questionId: elem.question_id,
          title: `answerForm${quizForm}`,
          group: formGroupCheckbox,
        });
      }
    });
  }

  private getFormByStep(step: number): void {
    if (step <= 0) step = 0;
    this.answerForm = this.forms[step].group;
    this.valueChanges();
  }

  private valueChanges(): void {
    this.answerForm.valueChanges.subscribe((res) => {
      Object.values(res).forEach((val) => {
        if (val === true || val) {
          this.isOpenNextButton = true;
        } else if (val === false) {
          this.isOpenNextButton = false;
        }
      });
    });
  }

  public closeDialog(lesson_id?: number): void {
    this.dialogRef.close(lesson_id);
  }

  public passTheLesson(): void {
    const obj = {
      course_id: this.modalData.course_id,
      lesson_id: this.modalData.lesson.id,
    };
    this.goToClassService.passLesson(obj).subscribe(
      (res) => {
        this.toastrService.success(res.message);
        this.closeDialog(this.modalData.quiz_id);
      },
      (error) => {
        this.toastrService.error(error);
        this.closeDialog();
      },
    );
  }
}
