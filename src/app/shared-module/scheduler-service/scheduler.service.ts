import { Injectable, OnInit } from '@angular/core';
import { DaySchedule } from '../interfaces/day-schedule.model';
import { ActivityModel } from '../interfaces/activity-model';
import { Subject } from 'rxjs';
import { ActivityCalories } from '../interfaces/activity-calories.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  private CALORIES_ARRAY: ActivityCalories[] = [
    new ActivityCalories('Alergare Usoara', 8),
    new ActivityCalories('Inot', 8),
    new ActivityCalories('Karate', 6),
    new ActivityCalories('Tenis', 9),
    new ActivityCalories('Fotbal', 8),
    new ActivityCalories('Handbal', 10),
    new ActivityCalories('Volei', 5),
  ];

  private dailySchedule: DaySchedule[] = [];
  schedule = new Subject<DaySchedule[]>();

  constructor() {
    if (!this.fetchFromLocalStorage()) {
      for (let index = 0; index < 5; index++) {
        this.dailySchedule.push(
          new DaySchedule(new ActivityModel(), new ActivityModel())
        );
      }
    }
    this.schedule.next(this.dailySchedule);
  }

  getScheduleByIndex(index: number): DaySchedule {
    return this.dailySchedule[index];
  }

  getFullSchedule() {
    return this.dailySchedule;
  }

  setDaySchedule(daySchedule: DaySchedule, index: number) {
    this.dailySchedule[index] = daySchedule;
    this.schedule.next(this.dailySchedule);

    // this.saveToLocalStorage();
    // this.fetchFromLocalStorage();
  }

  updateActivity(dayIndex: number, dayPeriod: number, data: ActivityModel) {
    if (dayPeriod === 0) {
      this.dailySchedule[dayIndex].morningActivity = data;
    } else {
      this.dailySchedule[dayIndex].eveningActivity = data;
    }

    this.schedule.next(this.dailySchedule);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('dailySchedule', JSON.stringify(this.dailySchedule));
    // console.log(JSON.stringify(this.dailySchedule));
  }

  fetchFromLocalStorage() {
    const fetchedData: string | null = localStorage.getItem('dailySchedule');
    if (fetchedData) {
      this.dailySchedule = JSON.parse(fetchedData) as DaySchedule[];
      this.schedule.next(this.dailySchedule);
      // console.log(this.dailySchedule);
      return true;
    }
    return false;
  }

  private calculateActivityMinutesPerHour(
    hour: number,
    startHour: number,
    endHour: number,
    activityStart: Date,
    activityEnd: Date
  ) {
    let minutesInThisHour = 60;

    if (startHour === endHour) {
      minutesInThisHour = activityEnd.getMinutes() - activityStart.getMinutes();
    } else {
      if (hour === startHour) {
        minutesInThisHour = 60 - activityStart.getMinutes();
      }

      if (hour === endHour) {
        minutesInThisHour = activityEnd.getMinutes();
      }
    }

    return minutesInThisHour;
  }

  calculateCaloriesPerHour() {
    const caloriesPerHour: number[] = new Array(24).fill(0);

    // Loop through all activities and calculate calories spent per hour
    this.dailySchedule.forEach((day) => {
      const values: ActivityModel[] = Object.values(day);
      for (const activity of values) {
        const activityData = this.CALORIES_ARRAY.find(
          (item) => item.type === activity.type
        );

        if (activityData) {
          const caloriesPerMinute = activityData.caloriesPerMinute;
          const activityStart = new Date(activity.start);
          const activityEnd = new Date(activity.end);
          const startHour = activityStart.getHours();
          const endHour = activityEnd.getHours();

          // Calculate calories spent per hour
          for (let hour = startHour; hour <= endHour; hour++) {
            let minutesInThisHour = this.calculateActivityMinutesPerHour(
              hour,
              startHour,
              endHour,
              activityStart,
              activityEnd
            );

            const caloriesInThisHour = minutesInThisHour * caloriesPerMinute;
            caloriesPerHour[hour] += caloriesInThisHour;
          }
        }
      }
    });

    return caloriesPerHour;
  }

  private calculateActivityTime() {
    const timePerActivity: { type: string; time: number }[] = [];
    this.CALORIES_ARRAY.forEach((activity) => {
      timePerActivity.push({
        type: activity.type,
        time: 0,
      });
    });

    timePerActivity.forEach((activity) => {
      this.dailySchedule.forEach((day) => {
        const values: ActivityModel[] = Object.values(day);
        for (const checkedActivity of values) {
          if (checkedActivity.type === activity.type) {
            const activityStart = new Date(checkedActivity.start);
            const activityEnd = new Date(checkedActivity.end);
            const startHour = activityStart.getHours();
            const endHour = activityEnd.getHours();

            // Calculate calories spent per hour
            for (let hour = startHour; hour <= endHour; hour++) {
              let minutesInThisHour = this.calculateActivityMinutesPerHour(
                hour,
                startHour,
                endHour,
                activityStart,
                activityEnd
              );

              activity.time += minutesInThisHour;
            }
          }
        }
      });
    });

    return timePerActivity;
  }

  calculateActivityCalories() {
    const caloriesPerActivity: {
      type: String;
      time: number;
      calories: number;
    }[] = [];
    const timePerActivity = this.calculateActivityTime();

    timePerActivity.forEach((activity) => {
      const objectToUpdate = this.CALORIES_ARRAY.find(
        (obj) => obj.type === activity.type
      );
      const calories = objectToUpdate!.caloriesPerMinute * activity.time;

      caloriesPerActivity.push({
        type: activity.type,
        time: activity.time,
        calories: calories,
      });
    });

    return caloriesPerActivity;
  }

  calculateCaloriesPerDay() {
    const dailyCalories: {
      // day: string;
      day: number;
      morningCal: number;
      eveningCal: number;
    }[] = [];

    let i = 0;
    this.dailySchedule.forEach((day) => {
      const activityLengthM =
        (new Date(day.morningActivity.end).getTime() -
          new Date(day.morningActivity.start).getTime()) /
        60000;
      const activityTypeM = day.morningActivity.type;

      const currentActivityM = this.CALORIES_ARRAY.find(
        (activity) => activity.type === activityTypeM
      );

      const caloriesSpentM =
        currentActivityM?.caloriesPerMinute! * activityLengthM;

      const activityLengthE =
        (new Date(day.eveningActivity.end).getTime() -
          new Date(day.eveningActivity.start).getTime()) /
        60000;
      const activityTypeE = day.eveningActivity.type;

      const currentActivityE = this.CALORIES_ARRAY.find(
        (activity) => activity.type === activityTypeM
      );

      const caloriesSpentE =
        currentActivityE?.caloriesPerMinute! * activityLengthE;

      dailyCalories.push({
        day: i++,
        morningCal: caloriesSpentM,
        eveningCal: caloriesSpentE,
      });
    });

    return dailyCalories;
  }

  // setDailyScheduleTest() {
  //   for (let index = 0; index < 5; index++) {
  //     const start = new Date(0);
  //     start.setHours(9, 45);
  //     // console.log(start);

  //     const end = new Date(0);
  //     end.setHours(10, 30);
  //     // console.log(end);

  //     const start2 = new Date(0);
  //     start2.setHours(18, 15);
  //     // console.log(start2);

  //     const end2 = new Date(0);
  //     end2.setHours(19, 0);
  //     // console.log(end2);

  //     this.setDaySchedule(
  //       new DaySchedule(
  //         new ActivityModel(start, end, 'Fotbal'),
  //         new ActivityModel(start2, end2, 'Inot')
  //       ),
  //       index
  //     );
  //   }
  //   this.schedule.next(this.dailySchedule);
  //   console.log(this.dailySchedule);
  // }

  getTotals() {
    const totalsPerActivity = this.calculateActivityCalories();
    const totals: { time: number; calories: number } = { time: 0, calories: 0 };

    totalsPerActivity.forEach((activity) => {
      totals.time += activity.time;
      totals.calories += activity.calories;
    });

    return totals;
  }
}
