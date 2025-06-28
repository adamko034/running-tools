import { MathUtils } from '../utils/math.utils';
import { Cloneable } from './clonable.interface';
import { DistanceUnit } from './distance-unit.enum';

export class Distance implements Cloneable<Distance> {
  private constructor(
    public value: number,
    public unit: DistanceUnit,
  ) {}

  static of(value: number, unit: DistanceUnit) {
    return new Distance(value, unit);
  }

  public totalMeters(): number {
    return this.unit === DistanceUnit.KM
      ? this.value * 1000
      : this.value * 1609.344;
  }

  public convertAndSetKmValue(kmValue: number) {
    if (this.unit === DistanceUnit.MI) {
      this.value = MathUtils.convertToMi(kmValue);
      return;
    }

    this.value = kmValue;
  }

  public clone(overrides?: Partial<Distance>) {
    return Distance.of(
      overrides?.value || this.value,
      overrides?.unit || this.unit,
    );
  }
}
