import { MathUtils } from '../utils/math.utils';
import { Cloneable } from './clonable.interface';
import { WeightUnit } from './weight-unit.enum';

export class Weight implements Cloneable<Weight> {
  private constructor(
    public value: number,
    public unit: WeightUnit,
  ) {}
  static of(value: number, unit: WeightUnit) {
    return new Weight(value, unit);
  }

  clone(overrides?: Partial<Weight> | undefined): Weight {
    return Weight.of(
      overrides?.value || this.value,
      overrides?.unit || this.unit,
    );
  }

  public convert(newUnit: WeightUnit) {
    if (this.unit != newUnit) {
      this.value = MathUtils.convertKgLb(this.value, newUnit);
      this.unit = newUnit;
    }
  }
}
