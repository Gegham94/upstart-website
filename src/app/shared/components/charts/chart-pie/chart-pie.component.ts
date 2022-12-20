import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'us-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
  @Input()
  public data: number[] = [];

  @Input()
  public chartLabels: (string[] | string)[];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            // @ts-ignore
            sum += data;
          });
          return ((value * 100) / sum).toFixed(1) + '%';
        },
        color: '#fff',
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        labels: {
          boxWidth: 15,
        },
        fullSize: true,
        position: 'right',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  public pieChartLabels: (string[] | string)[];

  public pieChartDatasets = [
    {
      backgroundColor: ['#BC8BF3', '#FE7096', '#4CCBBB'],
      data: this.data,
    },
  ];

  public pieChartPlugins = [DatalabelsPlugin];

  constructor() {
    this.data = [300, 500];
  }

  public ngOnInit(): void {
    this.pieChartLabels = this.chartLabels;
    this.pieChartDatasets[0].data = this.data;
  }
}
