import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { DayComponent } from './day-component/day.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivityComponent } from './activity-component/activity.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FooterComponent, DayComponent, ActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    FooterComponent,
    DayComponent,
    ActivityComponent
  ]
})
export class SharedModule { }
