import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { Navigation } from '../navigation/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private translateService: TranslateService) {}

  getNavigation(): Observable<Navigation[]> {
    return this.translateService.onLangChange.pipe(
      startWith({ lang: this.translateService.currentLang }),
      switchMap(() =>
        this.translateService.get([
          'NAVIGATION.RACE.TITLE',
          'NAVIGATION.RACE.PACE_CALCULATOR',
          'NAVIGATION.RACE.PACE_CALCULATOR_DESC',
          'NAVIGATION.RACE.FINISH_TIME_PREDICTOR',
          'NAVIGATION.RACE.FINISH_TIME_PREDICTOR_DESC',
          'NAVIGATION.PERSONAL.TITLE',
          'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR',
          'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR_DESC',
          'NAVIGATION.PERSONAL.VO2MAX_CALCULATOR',
          'NAVIGATION.PERSONAL.VO2MAX_CALCULATOR_DESC',
          'NAVIGATION.PERSONAL.PACE_SPEED_CONVERTER',
          'NAVIGATION.PERSONAL.PACE_SPEED_CONVERTER_DESC',
          'NAVIGATION.UNITS.TITLE',
          'NAVIGATION.UNITS.DISTANCE_CONVERTER',
          'NAVIGATION.UNITS.DISTANCE_CONVERTER_DESC',
          'NAVIGATION.UNITS.WEIGHT_CONVERTER',
          'NAVIGATION.UNITS.WEIGHT_CONVERTER_DESC',
          'NAVIGATION.UNITS.PACE_SPEED_CONVERTER',
          'NAVIGATION.UNITS.PACE_SPEED_CONVERTER_DESC',
        ])
      ),
      map((translations: any) => [
        {
          title: translations['NAVIGATION.RACE.TITLE'],
          links: [
            {
              text: translations['NAVIGATION.RACE.PACE_CALCULATOR'],
              link: 'race/pace-calculator',
              description: translations['NAVIGATION.RACE.PACE_CALCULATOR_DESC'],
              icon: 'speed',
            },
            {
              text: translations['NAVIGATION.RACE.FINISH_TIME_PREDICTOR'],
              link: 'race/finish-time-predictor',
              description:
                translations['NAVIGATION.RACE.FINISH_TIME_PREDICTOR_DESC'],
              icon: 'flag',
            },
          ],
        },
        {
          title: translations['NAVIGATION.PERSONAL.TITLE'],
          links: [
            {
              text: translations[
                'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR'
              ],
              link: 'personal/burned-calories-estimator',
              description:
                translations[
                  'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR_DESC'
                ],
              icon: 'local_fire_department',
            },
            {
              text: translations['NAVIGATION.PERSONAL.VO2MAX_CALCULATOR'],
              link: 'personal/vo2max-calculator',
              description:
                translations['NAVIGATION.PERSONAL.VO2MAX_CALCULATOR_DESC'],
              icon: 'favorite',
            },
          ],
        },
        {
          title: translations['NAVIGATION.UNITS.TITLE'],
          links: [
            {
              text: translations['NAVIGATION.UNITS.PACE_SPEED_CONVERTER'],
              link: 'units/pace-to-speed',
              description:
                translations['NAVIGATION.UNITS.PACE_SPEED_CONVERTER_DESC'],
              icon: 'swap_horiz',
            },
            {
              text: translations['NAVIGATION.UNITS.DISTANCE_CONVERTER'],
              link: 'units/kilometers-to-miles',
              description:
                translations['NAVIGATION.UNITS.DISTANCE_CONVERTER_DESC'],
              icon: 'straighten',
            },
            {
              text: translations['NAVIGATION.UNITS.WEIGHT_CONVERTER'],
              link: 'units/kilograms-to-pounds',
              description:
                translations['NAVIGATION.UNITS.WEIGHT_CONVERTER_DESC'],
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
