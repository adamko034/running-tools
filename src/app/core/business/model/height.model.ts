import { MathUtils } from '../../utils/math.utils';
import { HeightUnit } from './enums/height-unit.enum';
import { BusinessModel } from './interfaces/business-model.interface';
export class Height implements BusinessModel<Height, HeightUnit> {
  static readonly CONVERSION_FACTOR = 2.54;

  private constructor(
    public value: number,
    public unit: HeightUnit
  ) {}

  static of(value: number, unit: HeightUnit): Height {
    return new Height(value, unit);
  }

  static ofFeetAndInches(feet: number, inches: number) {
    const value = MathUtils.roundTen(feet * 12 + inches);
    return new Height(value, HeightUnit.IN);
  }

  clone(overrides?: Partial<Height> | undefined): Height {
    return Height.of(
      overrides?.value ?? this.value,
      overrides?.unit ?? this.unit
    );
  }

  cloneAndConvert(unit: HeightUnit): Height {
    const cloned = this.clone();
    cloned.convert(unit);
    return cloned;
  }

  convert(unit: HeightUnit): void {
    if (this.unit === unit) {
      return;
    }

    if (unit === HeightUnit.CM) {
      this.value = MathUtils.roundTen(this.value * Height.CONVERSION_FACTOR);
    } else if (unit === HeightUnit.IN) {
      this.value = MathUtils.roundTen(this.value / Height.CONVERSION_FACTOR);
    }

    this.unit = unit;
  }

  format(): string {
    return `${this.value} ${this.unit}`;
  }

  isTheSameAs(other: Height): boolean {
    return this.value === other.value && this.unit === other.unit;
  }

  toFeetAndInches(): { feet: number; inches: number } {
    if (this.unit === HeightUnit.CM) {
      return { feet: 0, inches: 0 };
    }

    const feet = Math.floor(this.value / 12);
    const inches = MathUtils.roundInteger(this.value % 12);
    return { feet, inches };
  }

  validate(): void {
    if (this.unit === HeightUnit.IN) {
      let { feet, inches } = this.toFeetAndInches();

      if (inches > 11) {
        inches = 0;
        feet += 1;

        this.value = MathUtils.roundTen(feet * 12 + inches);
      } else if (inches < 0) {
        inches = 11;
        feet = Math.max(0, feet - 1);

        this.value = MathUtils.roundTen(feet * 12 + inches);
      }
    }

    return;
  }
}
