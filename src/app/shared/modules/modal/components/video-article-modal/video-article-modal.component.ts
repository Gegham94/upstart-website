import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lessons, Questions, Resources } from '../../../../interfaces/courses/course-details';
import { GoToClassService } from 'src/app/shared/services/go-to-class/go-to-class.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DialogRef } from '@angular/cdk/dialog';

type ModalData = {
  quiz_id: number;
  id: number;
  lesson: Lessons;
  resources: Resources[];
};

type QuestionsType = {
  id: number;
  answer: string[];
};

type FinalRequestType = {
  quiz_id: number;
  questions: QuestionsType[];
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

  public question: Questions;

  public modalData: ModalData;

  public step = 0;

  public questionId: number = 0;

  public choosenAnswers: string[] = [];

  private choosenObject: QuestionsType;

  private final: QuestionsType[] = [];

  public answerForm: FormGroup = new FormGroup({
    answer_radio: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ModalData,
    private sanitizer: DomSanitizer,
    private goToClassService: GoToClassService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private dialogRef: DialogRef,
  ) {
    this.modalData = this.data;
    if (this.modalData.id !== -1) this.createFormControl();
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
    } else {
      this.step--;
      this.getQuestionByStep(this.step);
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

  public chooseAnAnswer(): void {
    this.choosenObject = {
      id: this.question.question_id,
      answer: [this.answerForm.controls['answer_radio'].value],
    };
  }

  public chooseCheckbox(event: Event, answer: string): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.choosenAnswers.push(answer);
    } else {
      this.choosenAnswers = this.choosenAnswers.filter((answers) => answers !== answer);
    }
    this.choosenObject = {
      id: this.question.question_id,
      answer: this.choosenAnswers,
    };
  }

  public finishQuiz(): void {
    this.final.push(this.choosenObject);
    this.final = this.getUniqueListBy();
    this.choosenAnswers = [];
    const obj = {
      quiz_id: this.modalData.quiz_id,
      questions: this.final,
    } as FinalRequestType;
    this.fetchQuizes(obj);
  }

  private getUniqueListBy() {
    return [...new Map(this.final.map((item) => [item.id, item])).values()];
  }

  private fetchQuizes(data: FinalRequestType): void {
    this.goToClassService.passQuize(data).subscribe(
      () => {
        this.toastrService.success(this.translateService.instant('global.pass_quiz'));
        this.dialogRef.close();
      },
      (error) => {
        this.toastrService.error(error);
      },
    );
  }

  private createFormControl(): void {
    this.modalData.lesson.questions.forEach((question) => {
      question.answers.forEach((elem) => {
        this.answerForm.addControl(elem, new FormControl());
      });
    });
  }
}
