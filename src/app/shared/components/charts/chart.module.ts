import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartPieComponent, ChartLineComponent],
  exports: [ChartPieComponent, ChartLineComponent],
  imports: [CommonModule, NgChartsModule],
})
export class ChartModule {}
