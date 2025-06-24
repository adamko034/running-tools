import { Distance } from './distance.model';
import { Time } from './time.model';

export class Pace {
  private constructor(
    public minutes: number,
    public seconds: number,
  ) {}

  static calculate(time: Time, distance: number) {
    const totalMinutes = time.totalMinutes();
    const pace = totalMinutes / distance;
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);

    return Pace.of(minutes, seconds);
  }

  static of(minutes: number, seconds: number) {
    return new Pace(minutes, seconds);
  }

  validate() {
    if (this.seconds > 59) {
      this.seconds = 0;
      this.minutes += 1;
    }

    if (this.seconds < 0 && this.minutes > 0) {
      this.minutes -= 1;
      this.seconds = 59;
    }

    if (this.seconds < 0 && this.minutes == 0) {
      this.seconds = 1;
    }
  }

  calculateDistance(time: Time): number {
    const totalMinutes = time.totalMinutes();
    const totalPace = this.minutes + this.seconds / 60;
    if (totalPace > 0) {
      return +(totalMinutes / totalPace).toFixed(2);
    }

    return 0;
  }

  calculateTime(distance: Distance): Time {
    const totalSeconds = this.totalSeconds() * distance.value;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    return Time.of(hours, minutes, seconds);
  }

  public format(unit: string): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${this.minutes}:${pad(this.seconds)}/${unit}`;
  }

  public totalSeconds(): number {
    return this.minutes * 60 + this.seconds;
  }
}
