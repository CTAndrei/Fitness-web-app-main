import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SchedulerService } from 'src/app/shared-module/scheduler-service/scheduler.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  summaryDays: any;
  days = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'];
  objectKeys = Object.keys;
  subscription!: Subscription;
  totalTimeInHours = 0;
  totalCalories = 0;

  constructor(private DailyService: SchedulerService) {}

  ngOnInit(): void {
    this.subscription = this.DailyService.schedule.subscribe((res) => {
      this.summaryDays = res;
      console.log(this.summaryDays);
    });

    this.summaryDays = this.DailyService.getFullSchedule();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateTotalsHours() {
    const totals = this.DailyService.getTotals();
    console.log(totals.calories);
    this.totalTimeInHours = totals.time / 60;
    return this.totalTimeInHours;
  }

  calculateTotalCalories() {
    const totals = this.DailyService.getTotals();
    console.log(totals.calories);
    this.totalCalories = totals.calories;
    return this.totalCalories;
  }
}
