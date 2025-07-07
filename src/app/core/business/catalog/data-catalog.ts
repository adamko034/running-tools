import { Navigation } from '../../navigation/navigation.model';
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
  static calorieFactor = 0.0175; // average for running

  static readonly distancesKeys: DistanceKey[] = Object.keys(
    this.distances
  ) as DistanceKey[];

  static readonly navigation: Navigation[] = [
    {
      title: 'Race Tools',
      links: [
        {
          text: 'Pace Calculator',
          link: 'race/pace-calculator',
          description: 'Calculate pace from distance and time',
          icon: 'speed',
        },
        {
          text: 'Finish Time Predictor',
          link: 'race/finish-time-predictor',
          description: 'Predict race finish times based on current performance',
          icon: 'flag',
        },
      ],
    },
    {
      title: 'Personal Performance',
      links: [
        {
          text: 'Calories Burned Calculator',
          link: 'personal/burned-calories-estimator',
          description: 'Calculate calories burned during your runs',
          icon: 'local_fire_department',
        },
        {
          text: 'VO₂ Max Calculator',
          link: 'personal/vo2max-calculator',
          description: 'Estimate your maximum oxygen uptake',
          icon: 'favorite',
        },
      ],
    },
    {
      title: 'Unit Converters',
      links: [
        {
          text: 'Pace / Speed Converter',
          link: 'units/pace-to-speed',
          description: 'Convert between pace and speed units',
          icon: 'swap_horiz',
        },
        {
          text: 'Distance Converter',
          link: 'units/kilometers-to-miles',
          description: 'Convert between kilometers and miles',
          icon: 'straighten',
        },
        {
          text: 'Weight Converter',
          link: 'units/kilograms-to-pounds',
          description: 'Convert between kilograms and pounds',
          icon: 'fitness_center',
        },
      ],
    },
  ];
}

type DistanceKey =
  | 'fourHundredM'
  | 'oneK'
  | 'fiveK'
  | 'tenK'
  | 'halfMarathon'
  | 'marathon';
