import { Component, computed, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { DataCatalog } from '../../../core/business/catalog/data-catalog';
import { FinishTime } from '../../../core/business/model/finish-time.model';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/green-box/green-box';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-finish-time-predictor',
  imports: [
    ToolView,
    DistanceFormField,
    TimeFormField,
    MatCardModule,
    GreenBox,
  ],
  templateUrl: './finish-time-predictor.html',
  styleUrl: './finish-time-predictor.scss',
  standalone: true,
})
export class FinishTimePredictor {
  private store = inject(StoreService);
  private calculators = inject(CalculatorsFacade);

  public raceTimes: Signal<FinishTime[]> = computed(() => {
    const knownTime = this.store.time();
    const knownDistance = this.store.distance();

    return [
      this.calculators.finishTime(
        DataCatalog.distances.fourHundredM,
        knownDistance,
        knownTime,
      ),
      this.calculators.finishTime(
        DataCatalog.distances.oneK,
        knownDistance,
        knownTime,
      ),
      this.calculators.finishTime(
        DataCatalog.distances.fiveK,
        knownDistance,
        knownTime,
      ),
      this.calculators.finishTime(
        DataCatalog.distances.tenK,
        knownDistance,
        knownTime,
      ),
      this.calculators.finishTime(
        DataCatalog.distances.halfMarathon,
        knownDistance,
        knownTime,
      ),
      this.calculators.finishTime(
        DataCatalog.distances.marathon,
        knownDistance,
        knownTime,
      ),
    ];
  });
}
