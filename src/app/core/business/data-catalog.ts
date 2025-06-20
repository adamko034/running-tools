export class DataCatalog {
  static milesFactor: number = 0.621371;
  static distances = {
    fourHundredM: {
      label: '400m',
      distance: 0.4,
    },
    oneK: {
      label: '1000m',
      distance: 1,
    },
    fiveK: {
      label: '5K',
      distance: 5,
    },
    tenK: {
      label: '10K',
      distance: 10,
    },
    halfMarathon: {
      label: 'half-marathon',
      distance: 21.097,
    },
    marathon: {
      label: 'marathon',
      distance: 42.195,
    },
  };
}
