export class Time {
  constructor(
    private hours: number = 0,
    private minutes: number = 55,
    private seconds: number = 0,
  ) {}

  static default(): Time {
    return new Time();
  }

  static of(hours: number, minutes: number, seconds: number) {
    return new Time(hours, minutes, seconds);
  }

  totalMinutes(): number {
    return this.hours * 60 + this.minutes + this.seconds / 60;
  }

  format(): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return this.hours > 0
      ? `${this.hours}:${pad(this.minutes)}:${pad(this.seconds)}`
      : `${this.minutes}:${pad(this.seconds)}`;
  }
}
