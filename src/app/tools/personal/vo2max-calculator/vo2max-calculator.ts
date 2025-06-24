import { Component, computed, inject } from '@angular/core';
import { Time } from '../../../core/models/time.model';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/green-box/green-box';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-vo2max-calculator',
  imports: [ToolView, DistanceFormField, TimeFormField, GreenBox],
  templateUrl: './vo2max-calculator.html',
  styleUrl: './vo2max-calculator.scss',
})
export class Vo2maxCalculator {
  private store = inject(StoreService);

  vo2Max = computed(() => {
    const time = this.store.time();
    const distance = this.store.distance();

    return this.calculateVo2Max(time, distance.value);
  });

  private calculateVo2Max(time: Time, distance: number) {
    const totalMinutes = time.totalMinutes();
    const velocity = (distance * 1000) / totalMinutes;

    const vo2 = 0.182258 * velocity + 0.000104 * velocity * velocity - 4.6;

    const adj =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * totalMinutes) +
      0.2989558 * Math.exp(-0.1932605 * totalMinutes);

    const vo2max = vo2 / adj;
    return Math.round(vo2max * 10) / 10;
  }
}
