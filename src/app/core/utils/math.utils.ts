import { DistanceUnit } from '../models/distance-unit.enum';
import { WeightUnit } from '../models/weight-unit.enum';

export class MathUtils {
  private static readonly conversion = {
    factors: {
      kmtoMi: 0.621371,
      miToKm: 1.60934,
      kgToLb: 2.20462,
      lbToKg: 0.453592,
    },
  };

  static roundThousand(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  static convertToMi(km: number): number {
    return this.roundThousand(km * this.conversion.factors.kmtoMi);
  }

  static convertToKm(mi: number): number {
    return this.roundThousand(mi * this.conversion.factors.miToKm);
  }

  static convertKmMi(value: number, toUnit: DistanceUnit): number {
    return toUnit === DistanceUnit.KM
      ? this.convertToKm(value)
      : this.convertToMi(value);
  }

  static convertKgLb(value: number, toUnit: WeightUnit): number {
    return toUnit == WeightUnit.LB
      ? this.roundThousand(value * this.conversion.factors.kgToLb)
      : this.roundThousand(value * this.conversion.factors.lbToKg);
  }
}
