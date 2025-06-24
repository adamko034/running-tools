import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'race/pace-calculator',
  //   loadComponent: () =>
  //     import('./tools/race/pace-calculator/pace-calculator').then(
  //       (m) => m.PaceCalculator,
  //     ),
  // },
  {
    path: 'race',
    children: [
      {
        path: 'pace-calculator',
        loadComponent: () =>
          import('./tools/race/pace-calculator/pace-calculator').then(
            (m) => m.PaceCalculator,
          ),
      },
      {
        path: 'finish-time-predictor',
        loadComponent: () =>
          import(
            './tools/race/finish-time-predictor/finish-time-predictor'
          ).then((m) => m.FinishTimePredictor),
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
            (m) => m.Vo2maxCalculator,
          ),
      },
      {
        path: 'burned-calories-estimator',
        loadComponent: () =>
          import(
            './tools/personal/calories-burned-calculator/calories-burned-calculator'
          ).then((m) => m.CaloriesBurnedCalculator),
      },
    ],
  },
];
