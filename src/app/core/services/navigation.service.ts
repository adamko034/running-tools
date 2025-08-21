import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Navigation } from '../navigation/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  getNavigation(): Observable<Navigation[]> {
    return of([
      {
        title: 'Race Tools',
        links: [
          {
            text: 'Pace Calculator',
            link: 'tools/race/pace-calculator',
            description: 'Calculate pace from distance and time',
            icon: 'speed',
          },
          {
            text: 'Finish Time Predictor',
            link: 'tools/race/finish-time-predictor',
            description: 'Predict race finish times based on current performance',
            icon: 'flag',
          },
          {
            text: 'Race Strategies',
            link: 'tools/race/race-strategies-calculator',
            description: 'Generate optimal pacing strategies for any race distance',
            icon: 'timeline',
          },
        ],
      },
      {
        title: 'Training',
        links: [
          {
            text: 'My Training Paces',
            link: 'tools/training/training-paces-calculator',
            description: 'Get personalized training paces based on your recent run',
            icon: 'directions_run',
          },
        ],
      },
      {
        title: 'Personal Tools',
        links: [
          {
            text: 'BMI & Body Composition',
            link: 'tools/personal/bmi-calculator',
            description: 'Calculate your BMI and estimate body fat using advanced methods',
            icon: 'monitor_weight',
          },
          {
            text: 'Calories Burned',
            link: 'tools/personal/burned-calories-estimator',
            description: 'Calculate calories burned during your runs',
            icon: 'local_fire_department',
          },
          {
            text: 'VO₂ Max',
            link: 'tools/personal/vo2max-calculator',
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
            link: 'tools/units/pace-to-speed',
            description: 'Convert between pace and speed units',
            icon: 'swap_horiz',
          },
          {
            text: 'Distance Converter',
            link: 'tools/units/kilometers-to-miles',
            description: 'Convert between kilometers and miles',
            icon: 'straighten',
          },
          {
            text: 'Weight Converter',
            link: 'tools/units/kilograms-to-pounds',
            description: 'Convert between kilograms and pounds',
            icon: 'fitness_center',
          },
        ],
      },
    ]);
  }
}
