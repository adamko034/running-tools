import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/green-box/green-box';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
import { WeightFormField } from '../../../shared/weight-form-field/weight-form-field';

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
