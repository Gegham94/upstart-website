import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsModalComponent } from './component/reviews-modal/reviews-modal.component';
import { ReviewService } from 'src/app/shared/services/reviews/review.service';
import { ActivatedRoute } from '@angular/router';
import { Reviews, TrainerReview } from 'src/app/shared/interfaces/reviews/trainer-review';
import { GlobalService } from '../../../../shared/services/global.service';
import { AuthAttantionComponent } from '../../../../shared/modules/modal/components/auth-attantion/auth-attantion.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/shared/modules/modal/components/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { IsPreviewService } from 'src/app/shared/services/is-preview/is-preview.service';

@Component({
  selector: 'us-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.scss', './course-reviews.component.media.scss'],
})
export class CourseReviewsComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public courseId: number;

  public review: TrainerReview[] = [];

  @Input()
  public hasFullAccess: boolean = false;

  @Input()
  public courseOwnerId?: number;

  @Output()
  public reviewCountEmitter$: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public rateAdded: EventEmitter<void> = new EventEmitter<void>();

  public reviewTwoItem: TrainerReview[] = [];

  public seeAllReview: boolean = false;

  public currentUserId: number = 0;

  public isUserHasReview: boolean = false;

  public isCurrentUserHaveReview: boolean = false;

  public reviewLoader: boolean = false;

  public isPreview: boolean = false;

  constructor(
    public dialog: MatDialog,
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private isPreviewService: IsPreviewService,
  ) {}

  public openDialog() {
    if (!this.globalService.isAuthenticated) {
      this.dialog.open(AuthAttantionComponent, {
        panelClass: 'attention-dialog',
        maxWidth: '600px',
      });
    } else {
      const dialog = this.dialog.open(ReviewsModalComponent, {
        panelClass: 'add-reviews',
        data: {
          title: this.translateService.instant('reviews.leave-review'),
          courseId: this.courseId,
          reviews: this.review,
        },
      });

      dialog.afterClosed().subscribe((res: string) => {
        if (res === 'get') {
          this.getReviewsByCourseId(this.courseId);
          this.rateAdded.emit();
        }
      });
    }
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.courseId = param['id'];
      this.getReviewsByCourseId(this.courseId);
    });
    this.isPreview = this.isPreviewService.isPreview();
  }

  public getReviewsByCourseId(id: number): void {
    this.reviewLoader = true;
    this.globalService.currentUserObservable.subscribe((user) => {
      if (user) this.currentUserId = user.id;
    });
    this.reviewService.getCourseReviews(id).subscribe((res) => {
      if (Array.isArray(res.data) && res.success) {
        this.review = res.data ? res.data : [];
        this.reviewTwoItem = res.data ? res.data : [];
        this.reviewTwoItem = this.reviewTwoItem.slice(0, 2);
        this.reviewCountEmitter$.emit(this.review.length);
        this.checkUserHasReview();
        this.reviewLoader = false;
      } else {
        this.review = [];
      }
    });
  }

  private checkUserHasReview(): void {
    if (this.review.find((rew) => rew.user_id === this.currentUserId)) {
      this.isUserHasReview = true;
    } else {
      this.isUserHasReview = false;
    }
  }

  public editReview(event: TrainerReview): void {
    this.review[0] = event;
    this.openDialog();
  }

  public deleteReviewDialog(event: Reviews) {
    const confirm = this.dialog.open(ConfirmModalComponent, {
      panelClass: 'confirm-dialog',
      width: '500px',
      height: 'max-content',
    });
    confirm.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteRreview(event);
      } else {
        this.reviewLoader = false;
      }
      this.rateAdded.emit();
    });
  }

  public deleteRreview(review: Reviews): void {
    this.reviewLoader = true;
    if (review && review.id)
      this.reviewService.deleteReview(review.id).subscribe(
        (res) => {
          if (res.success) {
            this.reviewLoader = false;
            this.getReviewsByCourseId(review.course_id);
            this.toastr.success(res.message);
          } else {
            this.toastr.error(this.translateService.instant('toast-messages.request-error'));
          }
        },
        () => {
          this.toastr.error(this.translateService.instant('toast-messages.request-error'));
        },
      );
  }
}
