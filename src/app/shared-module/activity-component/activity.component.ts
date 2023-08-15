import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { SchedulerService } from '../scheduler-service/scheduler.service';
import { ActivityModel } from '../interfaces/activity-model';

interface Sport {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  constructor(private schedulerService: SchedulerService) {}

  ngOnInit(): void {}

  sports: Sport[] = [
    { value: 'Alergare Usoara', viewValue: 'Alergare Usoara' },
    { value: 'Karate', viewValue: 'Karate' },
    { value: 'Tenis', viewValue: 'Tenis' },
    { value: 'Inot', viewValue: 'Inot' },
    { value: 'Fotbal', viewValue: 'Fotbal' },
    { value: 'Handbal', viewValue: 'Handbal' },
    { value: 'Volei', viewValue: 'Volei' },
  ];

  @Input() label!: string;
  @Input() index!: number;
  type: string = '';
  start: Date = new Date(0);
  end: Date = new Date(0);

  activity = new ActivityModel();

  onActivityChange(event: Event) {
    this.activity.type = this.type;
    this.activity.start = this.start;
    this.activity.end = this.end;
    // console.log(this.type);
    // console.log(this.start);
    // console.log(this.end);
  }

  onTypeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.type = target.value;

    this.updateDate();
  }

  onStartChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const dummyDate = new Date();
    const [hours, minutes] = target.value.split(':');
    dummyDate.setHours(Number(hours));
    dummyDate.setMinutes(Number(minutes));
    this.start = dummyDate;

    this.updateDate();
  }

  onEndChange(event: Event) {
    const target = event.target as HTMLInputElement;

    const dummyDate = new Date();
    const [hours, minutes] = target.value.split(':');
    dummyDate.setHours(Number(hours));
    dummyDate.setMinutes(Number(minutes));
    this.end = dummyDate;

    this.updateDate();
  }

  updateDate() {
    this.activity.type = this.type;
    this.activity.start = this.start;
    this.activity.end = this.end;

    this.schedulerService.updateActivity(
      this.index,
      this.label === 'Dimineata' ? 0 : 1,
      this.activity
    );
  }
}
