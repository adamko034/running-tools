import { inject, Injectable } from '@angular/core';
import { Distance } from '../models/distance.model';
import { Time } from '../models/time.model';
import { Weight } from '../models/weight.model';
import { CaloriesBurnedService } from './calculators/calories-burned.service';
import { FinishTimeService } from './calculators/finish-time.service';
import { Vo2MaxService } from './calculators/vo2max.service';
import { DataCatalogDistance } from './catalog/data-catalog-distance.model';
import { FinishTime } from './model/finish-time.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorsFacade {
  private burnedCaloriesService = inject(CaloriesBurnedService);
  private vo2MaxService = inject(Vo2MaxService);
  private finishTimeService = inject(FinishTimeService);

  caloriesBurned(distance: Distance, time: Time, weight: Weight) {
    return this.burnedCaloriesService.calculcate(distance, time, weight);
  }

  vo2Max(distance: Distance, time: Time): number {
    return this.vo2MaxService.calculate(distance, time);
  }

  finishTime(
    targetDistance: DataCatalogDistance,
    knownDistance: Distance,
    knownTime: Time,
  ): FinishTime {
    return this.finishTimeService.calculate(
      targetDistance,
      knownDistance,
      knownTime,
    );
  }
}
