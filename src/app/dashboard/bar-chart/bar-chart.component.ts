import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {

  @Input() caloriiPerZi: any[] = [];
  @Input() typeChart: 'kcal' | 'kcalDimS' = 'kcal';

  public barChartLabels: string[] = [];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [], label: '' },
  ];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.barChartLabels = [];
    this.barChartDatasets[0].data = [];

    const zileSaptamana = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'];

    if (this.typeChart === 'kcal') {
      this.barChartDatasets[0].label = 'KCal Arse pe Zi';
      for (const activitate of this.caloriiPerZi) {
        this.barChartLabels.push(zileSaptamana[activitate.day]);
        this.barChartDatasets[0].data.push(activitate.morningCal + activitate.eveningCal);
      }
    } else if (this.typeChart === 'kcalDimS') {
      this.barChartDatasets[0].label = 'KCal Dimineata';
      this.barChartDatasets[1] = { data: [], label: 'KCal Seara' };
      for (const activitate of this.caloriiPerZi) {
        this.barChartLabels.push(zileSaptamana[activitate.day]);
        this.barChartDatasets[0].data.push(activitate.morningCal);
        this.barChartDatasets[1].data.push(activitate.eveningCal);
      }
    }
  }
}
