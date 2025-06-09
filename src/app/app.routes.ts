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
];
