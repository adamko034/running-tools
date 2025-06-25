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

  public convertAndSetKmValue(kmValue: number) {
    if (this.unit === DistanceUnit.MI) {
      this.value = MathUtils.convertToMi(kmValue);
      return;
    }

    this.value = kmValue;
  }
}
