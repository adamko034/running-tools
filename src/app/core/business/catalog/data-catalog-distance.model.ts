import { Distance } from '../model/distance.model';

export class DataCatalogDistance {
  private constructor(
    public distance: Distance,
    public label: string,
  ) {}

  static ofKm(km: number, label: string) {
    return new DataCatalogDistance(Distance.ofKm(km), label);
  }
}
