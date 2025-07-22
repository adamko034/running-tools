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
          'NAVIGATION.PERSONAL.BMI_CALCULATOR',
          'NAVIGATION.PERSONAL.BMI_CALCULATOR_DESC',
          'NAVIGATION.TRAINING.TITLE',
          'NAVIGATION.TRAINING.TRAINING_PACES_CALCULATOR',
          'NAVIGATION.TRAINING.TRAINING_PACES_CALCULATOR_DESC',
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
              link: 'tools/race/pace-calculator',
              description: translations['NAVIGATION.RACE.PACE_CALCULATOR_DESC'],
              icon: 'speed',
            },
            {
              text: translations['NAVIGATION.RACE.FINISH_TIME_PREDICTOR'],
              link: 'tools/race/finish-time-predictor',
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
              text: translations['NAVIGATION.PERSONAL.BMI_CALCULATOR'],
              link: 'tools/personal/bmi-calculator',
              description:
                translations['NAVIGATION.PERSONAL.BMI_CALCULATOR_DESC'],
              icon: 'monitor_weight',
            },
            {
              text: translations[
                'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR'
              ],
              link: 'tools/personal/burned-calories-estimator',
              description:
                translations[
                  'NAVIGATION.PERSONAL.CALORIES_BURNED_CALCULATOR_DESC'
                ],
              icon: 'local_fire_department',
            },
            {
              text: translations['NAVIGATION.PERSONAL.VO2MAX_CALCULATOR'],
              link: 'tools/personal/vo2max-calculator',
              description:
                translations['NAVIGATION.PERSONAL.VO2MAX_CALCULATOR_DESC'],
              icon: 'favorite',
            },
          ],
        },
        {
          title: translations['NAVIGATION.TRAINING.TITLE'],
          links: [
            {
              text: translations['NAVIGATION.TRAINING.TRAINING_PACES_CALCULATOR'],
              link: 'tools/personal/training-paces-calculator',
              description:
                translations['NAVIGATION.TRAINING.TRAINING_PACES_CALCULATOR_DESC'],
              icon: 'directions_run',
            },
          ],
        },
        {
          title: translations['NAVIGATION.UNITS.TITLE'],
          links: [
            {
              text: translations['NAVIGATION.UNITS.PACE_SPEED_CONVERTER'],
              link: 'tools/units/pace-to-speed',
              description:
                translations['NAVIGATION.UNITS.PACE_SPEED_CONVERTER_DESC'],
              icon: 'swap_horiz',
            },
            {
              text: translations['NAVIGATION.UNITS.DISTANCE_CONVERTER'],
              link: 'tools/units/kilometers-to-miles',
              description:
                translations['NAVIGATION.UNITS.DISTANCE_CONVERTER_DESC'],
              icon: 'straighten',
            },
            {
              text: translations['NAVIGATION.UNITS.WEIGHT_CONVERTER'],
              link: 'tools/units/kilograms-to-pounds',
              description:
                translations['NAVIGATION.UNITS.WEIGHT_CONVERTER_DESC'],
              icon: 'fitness_center',
            },
          ],
        },
      ])
    );
  }
}
