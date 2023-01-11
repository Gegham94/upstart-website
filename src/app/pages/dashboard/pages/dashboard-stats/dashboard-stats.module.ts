import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardStatsRoutingModule } from './dashboard-stats-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'src/app/shared/directives/click-outside/click-outside.module';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    DashboardStatsRoutingModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    ClickOutsideModule,
  ],
})
export class DashboardStatsModule {}
