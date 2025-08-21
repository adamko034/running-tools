import { Routes } from '@angular/router';

const commonRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: 'tools/race',
    children: [
      {
        path: 'pace-calculator',
        loadComponent: () =>
          import('./pages/tools/race/pace-calculator/pace-calculator').then(
            m => m.PaceCalculator
          ),
      },
      {
        path: 'finish-time-predictor',
        loadComponent: () =>
          import(
            './pages/tools/race/finish-time-predictor/finish-time-predictor'
          ).then(m => m.FinishTimePredictor),
      },
      {
        path: 'race-strategies-calculator',
        loadComponent: () =>
          import(
            './pages/tools/race/race-strategies-calculator/race-strategies-calculator'
          ).then(m => m.RaceStrategiesCalculator),
      },
    ],
  },
  {
    path: 'tools/personal',
    children: [
      {
        path: 'vo2max-calculator',
        loadComponent: () =>
          import(
            './pages/tools/personal/vo2max-calculator/vo2max-calculator'
          ).then(m => m.Vo2maxCalculator),
      },
      {
        path: 'burned-calories-estimator',
        loadComponent: () =>
          import(
            './pages/tools/personal/calories-burned-calculator/calories-burned-calculator'
          ).then(m => m.CaloriesBurnedCalculator),
      },
      {
        path: 'bmi-calculator',
        loadComponent: () =>
          import('./pages/tools/personal/bmi-calculator/bmi-calculator').then(
            m => m.BmiCalculator
          ),
      },
    ],
  },
  {
    path: 'tools/training',
    children: [
      {
        path: 'training-paces-calculator',
        loadComponent: () =>
          import(
            './pages/tools/training/training-paces-calculator/training-paces-calculator'
          ).then(m => m.TrainingPacesCalculator),
      },
    ],
  },
  {
    path: 'tools/units',
    children: [
      {
        path: 'pace-to-speed',
        loadComponent: () =>
          import('./pages/tools/units/pace-to-speed/pace-to-speed').then(
            m => m.PaceToSpeed
          ),
      },
      {
        path: 'kilometers-to-miles',
        loadComponent: () =>
          import(
            './pages/tools/units/distance-unit-converter/distance-unit-converter'
          ).then(m => m.DistanceUnitConverter),
      },
      {
        path: 'kilograms-to-pounds',
        loadComponent: () =>
          import(
            './pages/tools/units/weight-unit-converter/weight-unit-converter'
          ).then(m => m.WeightUnitConverter),
      },
    ],
  },
];

export const routes: Routes = [
  ...commonRoutes,
  // {
  //   path: ':locale',
  //   canActivate: [languageGuard],
  //   children: commonRoutes,
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
