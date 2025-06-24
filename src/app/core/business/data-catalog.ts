import { DataCatalogDistance } from './data-catalog-distance.model';

export class DataCatalog {
  static readonly distances: Record<DistanceKey, DataCatalogDistance> = {
    fourHundredM: DataCatalogDistance.ofKm(0.4, '400m'),
    oneK: DataCatalogDistance.ofKm(1, '1000m'),
    fiveK: DataCatalogDistance.ofKm(5, '5K'),
    tenK: DataCatalogDistance.ofKm(10, '10K'),
    halfMarathon: DataCatalogDistance.ofKm(21.097, 'half-marathon'),
    marathon: DataCatalogDistance.ofKm(42.195, 'marathon'),
  };

  static readonly distancesKeys: DistanceKey[] = Object.keys(
    this.distances,
  ) as DistanceKey[];
}

type DistanceKey =
  | 'fourHundredM'
  | 'oneK'
  | 'fiveK'
  | 'tenK'
  | 'halfMarathon'
  | 'marathon';
