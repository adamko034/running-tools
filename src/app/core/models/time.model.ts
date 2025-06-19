export class Time {
  constructor(
    public hours: number = 0,
    public minutes: number = 55,
    public seconds: number = 0,
  ) {}

  static default(): Time {
    return new Time();
  }

  static of(hours: number, minutes: number, seconds: number) {
    return new Time(hours, minutes, seconds);
  }

  validate() {
    if (this.seconds > 59) {
      this.minutes += 1;
      this.seconds = 0;
    }

    if (this.minutes > 59) {
      this.minutes = 0;
      this.hours += 1;
    }

    if (this.seconds < 0 && this.minutes > 0) {
      this.minutes -= 1;
      this.seconds = 59;
    }

    if (this.minutes < 0 && this.hours > 0) {
      this.hours -= 1;
      this.minutes = 59;
    }

    if (this.seconds < 0 && this.minutes == 0) {
      this.seconds = 1;
    }
  }

  public totalMinutes(): number {
    return this.hours * 60 + this.minutes + this.seconds / 60;
  }

  format(): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return this.hours > 0
      ? `${this.hours}:${pad(this.minutes)}:${pad(this.seconds)}`
      : `${this.minutes}:${pad(this.seconds)}`;
  }
}
