import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from '../../shared/components/charts/chart.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    NgChartsModule,
    ChartModule,
    NgxSkeletonLoaderModule,
  ],
})
export class DashboardModule {}
