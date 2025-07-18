import { Component, computed, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { DataCatalog } from '../../../core/business/catalog/data-catalog';
import { FinishTime } from '../../../core/business/model/finish-time.model';
import { StoreService } from '../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { RaceTimeCard } from '../../../shared/components/ui/race-time-card/race-time-card';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-finish-time-predictor',
  imports: [
    ToolView,
    DistanceStoreFormField,
    TimeStoreFormField,
    MatCardModule,
    FancyResult,
    RaceTimeCard,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './finish-time-predictor.html',
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
        knownTime
      ),
      this.calculators.finishTime(
        DataCatalog.distances.oneK,
        knownDistance,
        knownTime
      ),
      this.calculators.finishTime(
        DataCatalog.distances.fiveK,
        knownDistance,
        knownTime
      ),
      this.calculators.finishTime(
        DataCatalog.distances.tenK,
        knownDistance,
        knownTime
      ),
      this.calculators.finishTime(
        DataCatalog.distances.halfMarathon,
        knownDistance,
        knownTime
      ),
      this.calculators.finishTime(
        DataCatalog.distances.marathon,
        knownDistance,
        knownTime
      ),
    ];
  });
}
