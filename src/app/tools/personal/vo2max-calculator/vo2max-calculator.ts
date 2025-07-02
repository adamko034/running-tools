import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/components/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/components/green-box/green-box';
import { TimeFormField } from '../../../shared/components/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
@Component({
  selector: 'app-vo2max-calculator',
  imports: [ToolView, DistanceFormField, TimeFormField, GreenBox],
  templateUrl: './vo2max-calculator.html',
  styleUrl: './vo2max-calculator.scss',
})
export class Vo2maxCalculator {
  private store = inject(StoreService);
  private calculators = inject(CalculatorsFacade);

  vo2Max = computed(() => {
    const time = this.store.time();
    const distance = this.store.distance();

    return this.calculators.vo2Max(distance, time);
  });
}
