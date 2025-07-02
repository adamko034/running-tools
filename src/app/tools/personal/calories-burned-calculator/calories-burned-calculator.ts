import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/components/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/components/green-box/green-box';
import { TimeFormField } from '../../../shared/components/time-form-field/time-form-field';
import { WeightFormField } from '../../../shared/components/weight-form-field/weight-form-field';
import { ToolView } from './../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-calories-burned-calculator',
  imports: [
    ToolView,
    DistanceFormField,
    WeightFormField,
    TimeFormField,
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
