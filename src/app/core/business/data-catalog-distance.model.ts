import { DistanceUnit } from '../models/distance-unit.enum';
import { MathUtils } from '../utils/math.utils';

export class DataCatalogDistance {
  private constructor(
    public km: number,
    public mi: number,
    public label: string,
  ) {}

  static ofKm(km: number, label: string) {
    return new DataCatalogDistance(km, MathUtils.convertToMi(km), label);
  }

  public getValueOfUnit(unit: DistanceUnit): number {
    return unit === DistanceUnit.KM ? this.km : this.mi;
  }
}
