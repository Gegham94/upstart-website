import { Component, Inject, OnDestroy } from '@angular/core';
import { ButtonTheme } from '../../../../../../shared/enums/button-theme.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../../../../../shared/services/reviews/review.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResponseError } from '../../../../../../shared/interfaces/settings.interface';
import { TrainerReview } from '../../../../../../shared/interfaces/reviews/trainer-review';
import { GlobalService } from 'src/app/shared/services/global.service';
import { TranslateService } from '@ngx-translate/core';

interface DialogData {
  title: string;
  courseId: number;
  reviews: TrainerReview[];
}
@Component({
  selector: 'us-reviews-modal',
  templateUrl: './reviews-modal.component.html',
  styleUrls: ['./reviews-modal.component.scss'],
})
export class ReviewsModalComponent implements OnDestroy {
  public readonly buttonTheme = ButtonTheme;

  public starRate: number;

  public title: string;

  public loader: boolean = false;

  public reviewContent: string;

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public currentUserId: number = -1;

  public selectedReviewId: number = -1;

  constructor(
    private reviewService: ReviewService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<ReviewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private globalService: GlobalService,
    private translateService: TranslateService,
  ) {
    this.getCurrentUserId();
    if (this.selectedReviewId !== -1) {
      this.reviewContent = data.reviews[0]?.message;
      this.starRate = data.reviews[0]?.rate;
    }
  }

  public ratingStars(rate: number) {
    this.starRate = rate;
  }

  public saveReview() {
    this.loader = true;
    const body = {
      course_id: this.data.courseId,
      rate: this.starRate,
      message: this.reviewContent,
    };
    this.reviewService
      .addReviews(body)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: ResponseError) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.dialog.close('get');
          } else {
            this.toastr.error(res.message);
          }
          this.loader = false;
        },
        () => {
          this.toastr.error(this.translateService.instant('toast-messages.request-error'));
          this.loader = false;
        },
      );
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public getCurrentUserId(): void {
    this.globalService.currentUserObservable.subscribe((res) => {
      if (res) this.findReviewByUserId(res.id);
    });
  }

  public findReviewByUserId(id: number): void {
    const review = this.data.reviews.find((reviewData) => reviewData.user_id === id);
    if (review) this.selectedReviewId = review.id;
  }
}
