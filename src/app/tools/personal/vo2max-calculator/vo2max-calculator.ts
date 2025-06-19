import { Component, effect, inject } from '@angular/core';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-vo2max-calculator',
  imports: [ToolView, DistanceFormField, TimeFormField],
  templateUrl: './vo2max-calculator.html',
  styleUrl: './vo2max-calculator.scss',
})
export class Vo2maxCalculator {
  vo2max: number = 0;

  private store = inject(StoreService);
  private time = this.store.time;
  private distance = this.store.distance;

  constructor() {
    effect(() => this.calculateVo2Max());
  }

  private calculateVo2Max() {
    const totalMinutes = this.time().totalMinutes();
    const velocity = (this.distance() * 1000) / totalMinutes;

    const vo2 = 0.182258 * velocity + 0.000104 * velocity * velocity - 4.6;

    const adj =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * totalMinutes) +
      0.2989558 * Math.exp(-0.1932605 * totalMinutes);

    const vo2max = vo2 / adj;

    this.vo2max = Math.round(vo2max * 10) / 10;
  }
}
