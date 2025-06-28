import { MathUtils } from '../../utils/math.utils';
import { DistanceUnit } from './enums/distance-unit.enum';
import { Cloneable } from './interfaces/clonable.interface';
import { Formatable } from './interfaces/formatable.interface';

export class Distance implements Cloneable<Distance>, Formatable {
  private constructor(
    public value: number,
    public unit: DistanceUnit,
  ) {}

  static of(value: number, unit: DistanceUnit) {
    return new Distance(value, unit);
  }

  static ofKm(value: number) {
    return this.of(value, DistanceUnit.KM);
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

  public format(): string {
    return `${this.value} ${this.unit}`;
  }

  public convert(unit: DistanceUnit) {
    if (unit !== this.unit) {
      this.unit = unit;
      this.value = MathUtils.convertKmMi(this.value, unit);
    }
  }
}
