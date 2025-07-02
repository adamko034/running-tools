import { MathUtils } from '../../utils/math.utils';
import { DistanceUnit } from './enums/distance-unit.enum';
import { BusinessModel } from './interfaces/business-model.interface';
import { Pace } from './pace.model';

export class Speed implements BusinessModel<Speed, DistanceUnit> {
  private constructor(
    public value: number,
    public units: DistanceUnit,
  ) {}
  static of(value: number, units: DistanceUnit) {
    return new Speed(value, units);
  }

  toPace(): Pace {
    const hoursPerUnit = 1 / this.value;
    const secondsPerUnit = hoursPerUnit * 3600;

    const minutes = Math.floor(secondsPerUnit / 60);
    const seconds = Math.round(secondsPerUnit % 60);
    return Pace.of(minutes, seconds, this.units);
  }

  format(): string {
    return this.units === DistanceUnit.KM
      ? `${this.value} km/h`
      : `${this.value} mph`;
  }

  unitsFormat(): string {
    return this.units === DistanceUnit.KM ? 'km/h' : 'mph';
  }

  convert(unit: DistanceUnit) {
    if (this.units === unit) {
      return;
    }

    this.units = unit;
    this.value = MathUtils.convertKmMi(this.value, unit);
  }

  valueOfUnit(unit: DistanceUnit): number {
    return this.units === unit
      ? this.value
      : MathUtils.convertKmMi(this.value, unit);
  }

  clone(overrides?: Partial<Speed> | undefined): Speed {
    return Speed.of(
      overrides?.value || this.value,
      overrides?.units || this.units,
    );
  }

  cloneAndConvert(unit: DistanceUnit): Speed {
    if (this.units !== unit) {
      const newValue = MathUtils.convertKmMi(this.value, unit);
      return Speed.of(newValue, unit);
    }

    return this.clone();
  }

  isTheSameAs(other: Speed): boolean {
    return this.value === other.value && this.units === other.units;
  }

  validate(): void {
    if (this.value <= 0) {
      this.value = 0.01;
    }
  }
}
