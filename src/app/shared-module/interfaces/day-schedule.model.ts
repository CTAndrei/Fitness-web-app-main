import { ActivityModel } from './activity-model';

export class DaySchedule {
  constructor(
    public morningActivity: ActivityModel,
    public eveningActivity: ActivityModel
  ) {}
}
