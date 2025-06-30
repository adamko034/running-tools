import { DistanceUnit } from './enums/distance-unit.enum';
import { Formatable } from './interfaces/formatable.interface';
import { Pace } from './pace.model';

export class Speed implements Formatable {
  private constructor(
    public value: number,
    public units: DistanceUnit,
  ) {}

  static of(value: number, units: DistanceUnit) {
    return new Speed(value, units);
  }

  public toPace(): Pace {
    const hoursPerUnit = 1 / this.value;
    const secondsPerUnit = hoursPerUnit * 3600;

    const minutes = Math.floor(secondsPerUnit / 60);
    const seconds = Math.round(secondsPerUnit % 60);
    return Pace.of(minutes, seconds, this.units);
  }

  public format(): string {
    return this.units === DistanceUnit.KM
      ? `${this.value} km/h`
      : `${this.value} mph`;
  }

  public unitsFormat(): string {
    return this.units === DistanceUnit.KM ? 'km/h' : 'mph';
  }
}
