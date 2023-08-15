import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnChanges {

  @Input() activitati: any[] = [];
  @Input() chartType: 'ore' | 'kcal' = 'ore';

  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [], label: '' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartLabels = [];
    this.doughnutChartDatasets[0].data = [];

    for (const activitate of this.activitati) {
      if (activitate.time !== 0) {
        this.doughnutChartLabels.push(activitate.type);
        this.doughnutChartDatasets[0].data.push(
          this.chartType === 'ore' ? activitate.time : activitate.calories
        );
      }
    }
    this.doughnutChartDatasets[0].label = this.chartType === 'ore' ? 'Ore' : 'KCal';
  }
}
