import { DistanceUnit } from './distance-unit.enum';

export class Speed {
  private constructor(
    public value: number,
    public units: DistanceUnit,
  ) {}

  static of(value: number, units: DistanceUnit) {
    return new Speed(value, units);
  }
}
