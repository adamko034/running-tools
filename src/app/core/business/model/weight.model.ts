import { MathUtils } from '../../utils/math.utils';
import { WeightUnit } from './enums/weight-unit.enum';
import { Cloneable } from './interfaces/clonable.interface';
import { Formatable } from './interfaces/formatable.interface';

export class Weight implements Cloneable<Weight>, Formatable {
  private constructor(
    public value: number,
    public unit: WeightUnit,
  ) {}

  static of(value: number, unit: WeightUnit) {
    return new Weight(value, unit);
  }

  get kgValue(): number {
    return this.unit === WeightUnit.KG
      ? this.value
      : MathUtils.convertKgLb(this.value, WeightUnit.KG);
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

  public cloneAndConvert(newUnit: WeightUnit) {
    const cloned = this.clone();
    cloned.convert(newUnit);
    return cloned;
  }

  public setValueAndConvert(newValue: number) {
    this.value = MathUtils.convertKgLb(newValue, this.unit);
  }

  public format(): string {
    return `${this.value} ${this.unit}`;
  }
}
