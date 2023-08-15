import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {

  @Input() caloriiPerOra: number[] = [];

  public lineChartLabels: string[] = [];
  public lineChartDatasets: ChartConfiguration<'line'>['data']['datasets'] = [
    { data: [], label: '' },
  ];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lineChartDatasets[0].data = [];
    this.lineChartLabels = [];

    const oreZi = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    this.lineChartDatasets[0].label = 'KCal';
    for (const ora of this.caloriiPerOra) {
      this.lineChartLabels = oreZi;
      this.lineChartDatasets[0].data.push(ora);
      this.lineChartDatasets[0].fill = true;
      this.lineChartDatasets[0].tension = 0.5;
      this.lineChartDatasets[0].borderColor = 'black';
      this.lineChartDatasets[0].backgroundColor = 'rgba(255,0,0,0.3)';
    }
  }
}
