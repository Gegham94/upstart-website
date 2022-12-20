import { Component } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { Router } from '@angular/router';
import { StatisticService } from '../../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'us-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss', './home-main.component.media.scss'],
})
export class HomeMainComponent {
  public readonly buttonTheme = ButtonTheme;

  public statisticList?: { courses: number; students: number; trainers: number };

  constructor(private router: Router, private statistic: StatisticService) {
    this.getStatistics();
  }

  public goRegistrastion() {
    if (localStorage.getItem('auth')) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['/auth/registration']);
    }
  }

  public getStatistics() {
    this.statistic.getStatistic().subscribe((res) => {
      if (res.success) {
        this.statisticList = res.data;
      }
    });
  }
}
