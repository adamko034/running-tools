export class Time {
  hours: number = 0;
  minutes: number = 55;
  seconds: number = 0;

  static default(): Time {
    return new Time();
  }

  totalMinutes(): number {
    return this.hours * 60 + this.minutes + this.seconds / 60;
  }
}
