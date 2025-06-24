import { MathUtils } from '../utils/math.utils';
import { DistanceUnit } from './distance-unit.enum';

export class Distance {
  private constructor(
    public value: number,
    public unit: DistanceUnit,
  ) {}

  static ofValueUnit(value: number, unit: DistanceUnit) {
    return new Distance(value, unit);
  }

  public convert(newUnit: DistanceUnit) {
    if (newUnit != this.unit) {
      this.value = MathUtils.convertKmMi(this.value, newUnit);
      this.unit = newUnit;
    }
  }
}
