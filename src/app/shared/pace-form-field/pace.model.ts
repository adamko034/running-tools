import { Time } from '../time-form-field/time.model';

export class Pace {
  minutes = 0;
  seconds = 0;

  static default(): Pace {
    return new Pace();
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
}
