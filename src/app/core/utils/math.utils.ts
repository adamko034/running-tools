import { DistanceUnit } from '../business/model/enums/distance-unit.enum';
import { WeightUnit } from '../business/model/enums/weight-unit.enum';

export class MathUtils {
  private static readonly conversion = {
    factors: {
      kmtoMi: 0.621371,
      miToKm: 1.60934,
      kgToLb: 2.20462,
      lbToKg: 0.453592,
    },
  };

  static roundTen(value: number): number {
    return Math.round(value * 10) / 10;
  }

  static roundThousand(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  static roundHundred(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static roundInteger(value: number): number {
    return Math.round(value);
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
      ? this.roundTen(value * this.conversion.factors.kgToLb)
      : this.roundTen(value * this.conversion.factors.lbToKg);
  }
}
