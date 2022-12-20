import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { Reviews, TrainerReview } from 'src/app/shared/interfaces/reviews/trainer-review';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';

interface SliceOptions {
  start: number;
  end: number | undefined;
  default: number;
}

@Component({
  selector: 'us-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss', './reviews.component.media.scss'],
})
export class ReviewsComponent implements OnInit {
  public slectedReview: number = 0;

  public readonly buttonTheme = ButtonTheme;

  public sliceOptions: SliceOptions = {
    start: 0,
    end: 260,
    default: 260,
  };

  @Input()
  public review: TrainerReview[];

  @Input()
  public set trainer(data: LessonTrainer) {
    this.trainerData = data;
  }

  @Input()
  public set trainers(data: LessonTrainer[]) {
    this.centerTrainers = data;
  }

  @Input()
  public showLoader: boolean = false;

  @Output()
  public editReviewEmitter: EventEmitter<TrainerReview> = new EventEmitter<TrainerReview>();

  @Output()
  public deleteReviewEmitter: EventEmitter<Reviews> = new EventEmitter<Reviews>();

  public trainerData: LessonTrainer;

  public centerTrainers: LessonTrainer[];

  public hideMore = false;

  public starSize: number = 0;

  private lang: string;

  public canEditReview: boolean = false;

  public currentUserId: number = -1;

  constructor(
    private readonly translateService: TranslateService,
    private globalService: GlobalService,
  ) {}

  public seeMore(index: number) {
    this.slectedReview = index;
    this.hideMore = !this.hideMore;
    this.sliceOptions.end = this.sliceOptions.end ? undefined : this.sliceOptions.default;
  }

  public ngOnInit(): void {
    if (window.innerWidth <= 767) {
      this.starSize = 18;
    } else {
      this.starSize = 10;
    }
    this.lang = this.translateService.currentLang;
    this.globalService.currentUserObservable.subscribe((res) => {
      if (res) this.currentUserId = res.id;
    });
  }

  // TODO: Envelope date function, if not needed, we will remove it later
  // public getRequestTime(time?: Date) {
  //   moment.updateLocale('en', {
  //     relativeTime: {
  //       future: '%s ago',
  //     },
  //   });
  //   const timeZone = moment(new Date()).format('Z');
  //   const minutesToAdd = moment().utcOffset(timeZone).utcOffset() * 2 + 60;
  //   const mm = moment(time).add(minutesToAdd, 'minutes');
  //   if (this.lang === 'hy') {
  //     moment.updateLocale('hy-am', {
  //       relativeTime: {
  //         future: '%s առաջ',
  //       },
  //     });
  //     return mm.locale('hy-am').fromNow();
  //   } else {
  //     return mm.fromNow();
  //   }
  // }

  public deleteRreview(review: Reviews): void {
    this.deleteReviewEmitter.emit(review);
  }

  public editReview(event: TrainerReview): void {
    this.editReviewEmitter.emit(event);
  }
}
