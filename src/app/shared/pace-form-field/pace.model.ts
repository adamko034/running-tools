import { Time } from '../time-form-field/time.model';

export class Pace {
  minutes = 0;
  seconds = 0;

  static default(): Pace {
    return new Pace();
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

  calculate(time: Time, distance: number) {
    const totalMinutes = time.totalMinutes();

    if (distance > 0 && totalMinutes > 0) {
      const pace = totalMinutes / distance;
      this.minutes = Math.floor(pace);
      this.seconds = Math.round((pace - this.minutes) * 60);
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

  calculateTime(distance: number): Time {
    const totalSeconds = this.totalSeconds() * distance;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    return Time.of(hours, minutes, seconds);
  }

  public format(unit: string): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${this.minutes}:${pad(this.seconds)}/${unit}`;
  }

  private totalSeconds(): number {
    return this.minutes * 60 + this.seconds;
  }
}
