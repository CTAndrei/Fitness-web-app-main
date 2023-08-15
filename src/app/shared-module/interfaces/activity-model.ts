export class ActivityModel {
    constructor(
        public start: Date = new Date(0),
        public end: Date = new Date(0),
        public type: string = ''
      ) {}
}
