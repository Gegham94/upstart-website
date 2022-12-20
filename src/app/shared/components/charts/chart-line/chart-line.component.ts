import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'us-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent implements OnInit {
  @Input()
  public labels: string[] = [];

  @Input()
  public data: number[] = [];

  // line
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  };

  public ngOnInit(): void {
    this.lineChartData.labels = this.labels;
    this.lineChartData.datasets.push({
      data: this.data,
      fill: true,
      tension: 0.5,
      borderColor: '#6b63dd',
      backgroundColor: 'rgba(240, 240, 255, .8)',
    });
  }
}
