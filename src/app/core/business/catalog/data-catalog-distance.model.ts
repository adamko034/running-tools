import { Distance } from '../model/distance.model';

export class DataCatalogDistance {
  private constructor(
    public distance: Distance,
    public translationKey: string
  ) {}

  static ofKm(km: number, translationKeySuffix: string) {
    return new DataCatalogDistance(
      Distance.ofKm(km),
      'COMMON.DISTANCES.' + translationKeySuffix
    );
  }
}
