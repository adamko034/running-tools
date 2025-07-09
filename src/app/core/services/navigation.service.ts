import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, switchMap, startWith } from 'rxjs';
import { Navigation } from '../navigation/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private translateService: TranslateService) {}

  getNavigation(): Observable<Navigation[]> {
    // Use onLangChange to respond to language changes, start with current language
    return this.translateService.onLangChange.pipe(
      startWith({ lang: this.translateService.currentLang }),
      switchMap(() =>
        this.translateService.get([
          'NAV.RACE_TOOLS',
          'NAV.PERSONAL_PERFORMANCE',
          'NAV.UNIT_CONVERTERS',
          'TOOLS.PACE_CALCULATOR',
          'TOOLS.PACE_CALCULATOR_DESC',
          'TOOLS.FINISH_TIME_PREDICTOR',
          'TOOLS.FINISH_TIME_PREDICTOR_DESC',
          'TOOLS.CALORIES_BURNED_CALCULATOR',
          'TOOLS.CALORIES_BURNED_CALCULATOR_DESC',
          'TOOLS.VO2MAX_CALCULATOR',
          'TOOLS.VO2MAX_CALCULATOR_DESC',
          'TOOLS.PACE_SPEED_CONVERTER',
          'TOOLS.PACE_SPEED_CONVERTER_DESC',
          'TOOLS.DISTANCE_CONVERTER',
          'TOOLS.DISTANCE_CONVERTER_DESC',
          'TOOLS.WEIGHT_CONVERTER',
          'TOOLS.WEIGHT_CONVERTER_DESC',
        ])
      ),
      map((translations: any) => [
        {
          title: translations['NAV.RACE_TOOLS'],
          links: [
            {
              text: translations['TOOLS.PACE_CALCULATOR'],
              link: 'race/pace-calculator',
              description: translations['TOOLS.PACE_CALCULATOR_DESC'],
              icon: 'speed',
            },
            {
              text: translations['TOOLS.FINISH_TIME_PREDICTOR'],
              link: 'race/finish-time-predictor',
              description: translations['TOOLS.FINISH_TIME_PREDICTOR_DESC'],
              icon: 'flag',
            },
          ],
        },
        {
          title: translations['NAV.PERSONAL_PERFORMANCE'],
          links: [
            {
              text: translations['TOOLS.CALORIES_BURNED_CALCULATOR'],
              link: 'personal/burned-calories-estimator',
              description:
                translations['TOOLS.CALORIES_BURNED_CALCULATOR_DESC'],
              icon: 'local_fire_department',
            },
            {
              text: translations['TOOLS.VO2MAX_CALCULATOR'],
              link: 'personal/vo2max-calculator',
              description: translations['TOOLS.VO2MAX_CALCULATOR_DESC'],
              icon: 'favorite',
            },
          ],
        },
        {
          title: translations['NAV.UNIT_CONVERTERS'],
          links: [
            {
              text: translations['TOOLS.PACE_SPEED_CONVERTER'],
              link: 'units/pace-to-speed',
              description: translations['TOOLS.PACE_SPEED_CONVERTER_DESC'],
              icon: 'swap_horiz',
            },
            {
              text: translations['TOOLS.DISTANCE_CONVERTER'],
              link: 'units/kilometers-to-miles',
              description: translations['TOOLS.DISTANCE_CONVERTER_DESC'],
              icon: 'straighten',
            },
            {
              text: translations['TOOLS.WEIGHT_CONVERTER'],
              link: 'units/kilograms-to-pounds',
              description: translations['TOOLS.WEIGHT_CONVERTER_DESC'],
              icon: 'fitness_center',
            },
          ],
        },
      ])
    );
  }

  // Static fallback method for immediate use (keeps existing DataCatalog functionality)
  static getStaticNavigation(): Navigation[] {
    return [
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
            description:
              'Predict race finish times based on current performance',
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
}
