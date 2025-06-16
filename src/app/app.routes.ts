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
    ],
  },
];
