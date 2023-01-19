import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerCourse } from 'src/app/shared/interfaces/courses/trainer-course';
import { Trainer } from 'src/app/shared/interfaces/trainer/trainer';
import { CoursesApiService } from 'src/app/shared/services/courses/courses-api.service';
import { TrainerService } from 'src/app/shared/services/trainer/trainer.service';
import { filter, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReviewService } from 'src/app/shared/services/reviews/review.service';
import { TrainerReview } from 'src/app/shared/interfaces/reviews/trainer-review';
import { TranslateService } from '@ngx-translate/core';

import { UserRole } from 'src/app/shared/enums/user-role';
import { LessonTrainer } from 'src/app/shared/interfaces/courses/course-details';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { CurrentUserInfoInterface } from '../../../shared/interfaces/current-user.interface';
import { GlobalService } from '../../../shared/services/global.service';
type TabsType = {
  id: number;
  title: string;
  clicked: boolean;
};
@Component({
  selector: 'us-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss', './trainer.component.media.scss'],
})
export class TrainerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainBlock')
  public mainBlock: ElementRef;

  public readonly title: string = 'trainer_profile.profile';

  public trainerData?: Trainer;

  public switched = true;

  public trainerReview: TrainerReview[];

  public courses: TrainerCourse[];

  public userInfo?: CurrentUserInfoInterface | null;

  public showCoverSide: boolean;

  public showBtn: boolean;

  private destroyed$ = new Subject<boolean>();

  private trainerId: number;

  public centerTrainers: LessonTrainer[];

  public loader: boolean = true;

  public tabs!: TabsType[];

  constructor(
    private trainerService: TrainerService,
    private courseService: CoursesApiService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router,
    private readonly globalService: GlobalService,
    private readonly translatedTitleService: TranslatedTitleService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.globalService.currentUserObservable
      .pipe(
        takeUntil(this.destroyed$),
        filter((res) => res !== null),
      )
      .subscribe((data) => {
        this.userInfo = data;
      });
    this.getTrainerId();
    this.getTrainerById(this.trainerId);
    this.getCourseByTrainerId(this.trainerId);
    this.getTrainerReviewByTrainerId(this.trainerId);
  }

  public ngAfterViewInit(): void {
    const mainBlock = this.mainBlock?.nativeElement as HTMLElement;
    if (mainBlock?.offsetHeight <= 240) {
      this.showCoverSide = true;
      this.showBtn = true;
    }
    this.cdr.detectChanges();
  }

  public switch(event: TabsType): void {
    this.tabs.forEach((elem) => {
      if (event.id === elem.id) {
        elem.clicked = true;
      } else {
        elem.clicked = false;
      }
    });
  }

  public getTrainerId(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe((param) => {
      this.trainerId = param['id'];
    });
  }

  public getTrainerById(id: number): void {
    this.trainerService
      .getTrainerById(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (res) => {
          this.trainerData = res.data;
          this.loader = false;
          this.centerTrainers = this.trainerData.trainers;
          this.addTabs();
          if (this.trainerData.role_id !== this.userRoles.TRAINING_CENTER) {
            this.tabs = this.tabs.filter((tab) => tab.id !== this.userRoles.TRAINING_CENTER);
          }
          this.activatedRoute.queryParams.subscribe((queryRes) => {
            if (queryRes['review']) {
              this.tabs.every((tab) => (tab.clicked = false));
              const foundedTab = this.tabs.find((foundTab) => foundTab.id === 2);
              if (foundedTab) foundedTab.clicked = true;
            }
          });
        },
        () => {
          this.router.navigate(['not-found']);
          this.loader = false;
        },
      );
  }

  public getCourseByTrainerId(id: number) {
    this.courseService
      .getCoursesByTrainerId(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.courses = res.data;
      });
  }

  public getTrainerReviewByTrainerId(id: number): void {
    this.reviewService
      .getTrainerReviews(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.trainerReview = res.data;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  private addTabs(): void {
    this.tabs = [
      {
        id: 1,
        title: this.translateService.instant('trainer_profile.courses'),
        clicked: true,
      },
      {
        id: 2,
        title: this.translateService.instant('trainer_profile.reviews'),
        clicked: false,
      },
      {
        id: 4,
        title: this.translateService.instant('trainer_profile.trainers'),
        clicked: false,
      },
    ];
  }

  public get userRoles(): typeof UserRole {
    return UserRole;
  }
}
