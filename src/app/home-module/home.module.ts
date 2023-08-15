import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { SharedModule } from '../shared-module/shared.module';
import { SummaryComponent } from './summary-component/summary.component';
import { MatTabNav, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DashComponent } from '../dashboard/dash/dash.component';
import { BarChartComponent } from '../dashboard/bar-chart/bar-chart.component';
import { CardComponent } from '../dashboard/card/card.component';
import { DoughnutChartComponent } from '../dashboard/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from '../dashboard/line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    SummaryComponent,
     TabComponent,
     DashComponent,
     BarChartComponent,
     CardComponent,
     DoughnutChartComponent,
     LineChartComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    FormsModule,  
    MatSelectModule, 
    MatInputModule,
    NgChartsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class HomeModule { }
