import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SchedulerService } from 'src/app/shared-module/scheduler-service/scheduler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  caloriiPerOra: number[] = [];
  activitati: any[] = [];
  caloriiPerZi: any[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 2,
          chart: { cols: 2, rows: 2 },
          table: { cols: 2, rows: 2 },
        };
      }

      return {
        columns: 2,
        chart: { cols: 1, rows: 2 },
        table: { cols: 2, rows: 2 },
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private schedulerService: SchedulerService
  ) {}

  ngOnInit() {
    this.subscription = this.schedulerService.schedule.subscribe(
      (dailySchedule) => {
        this.caloriiPerOra = this.schedulerService.calculateCaloriesPerHour();
        this.activitati = this.schedulerService.calculateActivityCalories();
        this.caloriiPerZi = this.schedulerService.calculateCaloriesPerDay();
        // console.log(this.caloriiPerOra);
        // console.log(this.activitati);
        // console.log(this.caloriiPerZi);
        // console.log('');
      }
    );
    this.caloriiPerOra = this.schedulerService.calculateCaloriesPerHour();
    this.activitati = this.schedulerService.calculateActivityCalories();
    this.caloriiPerZi = this.schedulerService.calculateCaloriesPerDay();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
