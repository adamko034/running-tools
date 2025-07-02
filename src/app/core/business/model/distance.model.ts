import { MathUtils } from '../../utils/math.utils';
import { DistanceUnit } from './enums/distance-unit.enum';
import { BusinessModel } from './interfaces/business-model.interface';

export class Distance implements BusinessModel<Distance, DistanceUnit> {
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

  public setValueAndConvert(newValue: number) {
    this.value = MathUtils.convertKmMi(newValue, this.unit);
  }

  clone(overrides?: Partial<Distance>) {
    return Distance.of(
      overrides?.value || this.value,
      overrides?.unit || this.unit,
    );
  }

  format(): string {
    return `${this.value} ${this.unit}`;
  }

  convert(unit: DistanceUnit) {
    if (unit !== this.unit) {
      this.unit = unit;
      this.value = MathUtils.convertKmMi(this.value, unit);
    }
  }

  cloneAndConvert(unit: DistanceUnit): Distance {
    if (unit !== this.unit) {
      const newValue = MathUtils.convertKmMi(this.value, unit);
      return this.clone({ value: newValue, unit });
    }

    return this;
  }

  isTheSameAs(other: Distance): boolean {
    return other.value == this.value && other.unit === this.unit;
  }

  validate() {
    if (this.value <= 0) {
      this.value = 0.01;
    }
  }
}
