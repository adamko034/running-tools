import { inject, Injectable } from '@angular/core';
import { BmiService } from './calculators/bmi.service';
import { CaloriesBurnedService } from './calculators/calories-burned.service';
import { FinishTimeService } from './calculators/finish-time.service';
import { Vo2MaxService } from './calculators/vo2max.service';
import { DataCatalogDistance } from './catalog/data-catalog-distance.model';
import { Distance } from './model/distance.model';
import { BmiCategory } from './model/enums/bmi-category.enum';
import { FatCategory } from './model/enums/fat-category.enum';
import { IbwCategory } from './model/enums/ibw-category.enum';
import { Sex } from './model/enums/sex.enum';
import { FinishTime } from './model/finish-time.model';
import { Height } from './model/height.model';
import { Time } from './model/time.model';
import { Weight } from './model/weight.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorsFacade {
  private burnedCaloriesService = inject(CaloriesBurnedService);
  private vo2MaxService = inject(Vo2MaxService);
  private finishTimeService = inject(FinishTimeService);
  private bmiService = inject(BmiService);

  caloriesBurned(distance: Distance, time: Time, weight: Weight) {
    return this.burnedCaloriesService.calculcate(distance, time, weight);
  }

  vo2Max(distance: Distance, time: Time): number {
    return this.vo2MaxService.calculate(distance, time);
  }

  finishTime(
    targetDistance: DataCatalogDistance,
    knownDistance: Distance,
    knownTime: Time
  ): FinishTime {
    return this.finishTimeService.calculate(
      targetDistance,
      knownDistance,
      knownTime
    );
  }

  bmi(height: Height, weight: Weight): number {
    return this.bmiService.bmi(height, weight);
  }

  bmiCategory(bmi: number): BmiCategory {
    return this.bmiService.bmiCategory(bmi);
  }

  bmiHa(height: Height, weight: Weight): number {
    return this.bmiService.bmiHa(height, weight);
  }

  fatPercentage(height: Height, weight: Weight, age: number, sex: Sex): number {
    return this.bmiService.fatPercentage(height, weight, age, sex);
  }

  fatCategory(fatPercentage: number, sex: Sex): FatCategory {
    return this.bmiService.fatCategory(fatPercentage, sex);
  }

  bmr(height: Height, weight: Weight, age: number, sex: Sex): number {
    return this.bmiService.bmr(height, weight, age, sex);
  }

  ibw(
    height: Height,
    weight: Weight,
    sex: Sex
  ): { ibw: Weight; category: IbwCategory } {
    return this.bmiService.ibw(height, weight, sex);
  }
}
