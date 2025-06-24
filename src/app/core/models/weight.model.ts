import { MathUtils } from '../utils/math.utils';
import { WeightUnit } from './weight-unit.enum';

export class Weight {
  private constructor(
    public value: number,
    public unit: WeightUnit,
  ) {}

  static of(value: number, unit: WeightUnit) {
    return new Weight(value, unit);
  }

  public convert(newUnit: WeightUnit) {
    if (this.unit != newUnit) {
      this.value = MathUtils.convertKgLb(this.value, newUnit);
      this.unit = newUnit;
    }
  }
}
