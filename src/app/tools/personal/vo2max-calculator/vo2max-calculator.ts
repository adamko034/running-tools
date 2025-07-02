import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { GreenBox } from '../../../shared/components/ui/green-box/green-box';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
@Component({
  selector: 'app-vo2max-calculator',
  imports: [ToolView, DistanceStoreFormField, TimeStoreFormField, GreenBox],
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
