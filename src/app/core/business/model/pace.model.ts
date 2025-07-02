import { MathUtils } from '../../utils/math.utils';
import { Distance } from './distance.model';
import { DistanceUnit } from './enums/distance-unit.enum';
import { BusinessModel } from './interfaces/business-model.interface';
import { Speed } from './speed.model';
import { Time } from './time.model';

export class Pace implements BusinessModel<Pace, DistanceUnit> {
  private constructor(
    public minutes: number,
    public seconds: number,
    public unit: DistanceUnit,
  ) {}

  static calculate(time: Time, distance: Distance) {
    const totalMinutes = time.totalMinutes();
    const pace = totalMinutes / distance.value;
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);

    return Pace.of(minutes, seconds, distance.unit);
  }

  static of(minutes: number, seconds: number, unit: DistanceUnit) {
    return new Pace(minutes, seconds, unit);
  }

  static ofTotalMinutes(totalMinutes: number, unit: DistanceUnit): Pace {
    let minutes = Math.floor(totalMinutes);
    let seconds = Math.round((totalMinutes - minutes) * 60);

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    return Pace.of(minutes, seconds, unit);
  }

  clone(overrides?: Partial<Pace>): Pace {
    return Pace.of(
      overrides?.minutes || this.minutes,
      overrides?.seconds || this.seconds,
      overrides?.unit || this.unit,
    );
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

  toDistance(time: Time): Distance {
    const totalMinutes = time.totalMinutes();
    const totalPace = this.minutes + this.seconds / 60;

    const value = totalPace > 0 ? +(totalMinutes / totalPace).toFixed(2) : 0;
    return Distance.of(value, this.unit);
  }

  toTime(distance: Distance): Time {
    const totalSeconds = this.totalSeconds() * distance.value;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    return Time.of(hours, minutes, seconds);
  }

  format(): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${this.minutes}:${pad(this.seconds)}/${this.unit}`;
  }

  totalSeconds(): number {
    return this.minutes * 60 + this.seconds;
  }

  totalMinutes(): number {
    return MathUtils.roundTen(this.minutes + this.seconds / 60);
  }

  toSpeed(): Speed {
    return Speed.of(MathUtils.roundTen(3600 / this.totalSeconds()), this.unit);
  }

  isTheSameAs(other: Pace): boolean {
    return (
      this.totalSeconds() == other.totalSeconds() && this.unit == other.unit
    );
  }

  cloneAndConvert(unit: DistanceUnit): Pace {
    if (unit !== this.unit) {
      const newTotalMinutes = MathUtils.convertKmMi(
        this.totalMinutes(),
        this.unit,
      );
      return Pace.ofTotalMinutes(newTotalMinutes, unit);
    }

    return this.clone();
  }

  convert(unit: DistanceUnit): void {
    if (unit !== this.unit) {
      const newTotalMinutes = MathUtils.convertKmMi(
        this.totalMinutes(),
        this.unit,
      );
      const newPace = Pace.ofTotalMinutes(newTotalMinutes, unit);
      this.minutes = newPace.minutes;
      this.seconds = newPace.seconds;
    }
  }
}
