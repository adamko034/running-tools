import { MathUtils } from '../../utils/math.utils';
import { Distance } from './distance.model';
import { BusinessModel } from './interfaces/business-model.interface';
import { Pace } from './pace.model';
import { Speed } from './speed.model';

export class Time implements BusinessModel<Time, undefined> {
  constructor(
    public hours: number,
    public minutes: number,
    public seconds: number,
  ) {}
  static of(hours: number, minutes: number, seconds: number) {
    return new Time(hours, minutes, seconds);
  }

  static ofSeconds(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);

    return Time.of(h, m, s);
  }

  clone(overrides?: Partial<Time> | undefined): Time {
    return Time.of(
      overrides?.hours || this.hours,
      overrides?.minutes || this.minutes,
      overrides?.seconds || this.seconds,
    );
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

  public totalSeconds(): number {
    return this.hours * 60 * 60 + this.minutes * 60 + this.seconds;
  }

  public totalHours(): number {
    return this.totalMinutes() / 60;
  }

  public format(): string {
    const pad = (v: number) => String(v).padStart(2, '0');
    return this.hours > 0
      ? `${this.hours}:${pad(this.minutes)}:${pad(this.seconds)}`
      : `${this.minutes}:${pad(this.seconds)}`;
  }

  public toSpeed(distance: Distance): Speed {
    const hours = this.totalSeconds() / 3600;
    const speed = hours === 0 ? 0 : distance.value / hours;

    return Speed.of(MathUtils.roundThousand(speed), distance.unit);
  }

  public toPace(distance: Distance): Pace {
    return Pace.calculate(this, distance);
  }

  cloneAndConvert(): Time {
    return this.clone();
  }

  convert(): void {
    return;
  }

  isTheSameAs(other: Time): boolean {
    return this.totalSeconds() === other.totalSeconds();
  }
}
