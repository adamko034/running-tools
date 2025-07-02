import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { WeightStoreFormField } from '../../../shared/components/store/weight-store-form-field/weight-store-form-field';
import { GreenBox } from '../../../shared/components/ui/green-box/green-box';

import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { ToolView } from './../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-calories-burned-calculator',
  imports: [
    ToolView,
    DistanceStoreFormField,
    WeightStoreFormField,
    TimeStoreFormField,
    GreenBox,
  ],
  templateUrl: './calories-burned-calculator.html',
  styleUrl: './calories-burned-calculator.scss',
})
export class CaloriesBurnedCalculator {
  private store = inject(StoreService);
  private calculators = inject(CalculatorsFacade);

  summary = computed(() => {
    const distance = this.store.distance();
    const time = this.store.time();
    const weight = this.store.weight();

    const calories = this.calculators.caloriesBurned(distance, time, weight);
    return `You burned approximately ${calories.toFixed(0)} kcal.`;
  });
}
