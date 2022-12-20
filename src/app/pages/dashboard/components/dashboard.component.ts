import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { Subject, takeUntil } from 'rxjs';
import {
  PaymentAmountMonthly,
  TrainerDashboard,
  TrainerDashboardReviews,
} from '../../../shared/interfaces/trainer/trainer';

@Component({
  selector: 'us-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public title = 'dashboard.trainer.trainer_dashboard';

  private subscribe$: Subject<boolean> = new Subject<boolean>();

  public dashboardData?: TrainerDashboard;

  public paymentAmountMonthly?: PaymentAmountMonthly;

  public reviews?: TrainerDashboardReviews;

  public coursesPaidLabels: (string[] | string)[] = [];

  public coursesData: number[] = [];

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    public trainerService: TrainerService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.trainerService
      .getTrainerDashboard()
      .pipe(takeUntil(this.subscribe$))
      .subscribe((res) => {
        this.dashboardData = res.data;
        this.paymentAmountMonthly = res.data.payment_amount_monthly;
        this.reviews = res.data.reviews;
        this.coursesPaidLabels = res.data.courses_paid.courses;
        this.coursesData = res.data.courses_paid.data;
      });
  }

  public ngOnDestroy(): void {
    this.subscribe$.next(true);
    this.subscribe$.complete();
  }
}
