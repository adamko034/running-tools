import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'race',
    children: [
      {
        path: 'pace-calculator',
        loadComponent: () =>
          import('./tools/race/pace-calculator/pace-calculator').then(
            m => m.PaceCalculator
          ),
      },
      {
        path: 'finish-time-predictor',
        loadComponent: () =>
          import(
            './tools/race/finish-time-predictor/finish-time-predictor'
          ).then(m => m.FinishTimePredictor),
      },
    ],
  },
  {
    path: 'personal',
    children: [
      {
        path: 'vo2max-calculator',
        loadComponent: () =>
          import('./tools/personal/vo2max-calculator/vo2max-calculator').then(
            m => m.Vo2maxCalculator
          ),
      },
      {
        path: 'burned-calories-estimator',
        loadComponent: () =>
          import(
            './tools/personal/calories-burned-calculator/calories-burned-calculator'
          ).then(m => m.CaloriesBurnedCalculator),
      },
    ],
  },
  {
    path: 'units',
    children: [
      {
        path: 'pace-to-speed',
        loadComponent: () =>
          import('./tools/units/pace-to-speed/pace-to-speed').then(
            m => m.PaceToSpeed
          ),
      },
      {
        path: 'kilometers-to-miles',
        loadComponent: () =>
          import(
            './tools/units/distance-unit-converter/distance-unit-converter'
          ).then(m => m.DistanceUnitConverter),
      },
      {
        path: 'kilograms-to-pounds',
        loadComponent: () =>
          import(
            './tools/units/weight-unit-converter/weight-unit-converter'
          ).then(m => m.WeightUnitConverter),
      },
    ],
  },
];
