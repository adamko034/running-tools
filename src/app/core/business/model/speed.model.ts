import { DistanceUnit } from './enums/distance-unit.enum';
import { Formatable } from './interfaces/formatable.interface';

export class Speed implements Formatable {
  private constructor(
    public value: number,
    public units: DistanceUnit,
  ) {}

  static of(value: number, units: DistanceUnit) {
    return new Speed(value, units);
  }

  public format(): string {
    return 'TO DO';
  }
}
