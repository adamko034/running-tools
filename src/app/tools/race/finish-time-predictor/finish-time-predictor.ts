import { Component, computed, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataCatalog } from '../../../core/business/data-catalog';
import { DataCatalogDistance } from '../../../core/business/data-catalog-distance.model';
import { DistanceUnit } from '../../../core/models/distance-unit.enum';
import { Time } from '../../../core/models/time.model';
import { StoreService } from '../../../core/store/store.service';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/green-box/green-box';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
import { FinishTime } from './finish-time.model';

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

  public distanceUnit = this.store.distanceUnit;
  public raceTimes: Signal<FinishTime[]> = computed(() => {
    const knownTime = this.store.time();
    const knownDistance = this.store.distance();
    const unit = this.store.distanceUnit();

    return [
      this.createRaceTime(
        DataCatalog.distances.fourHundredM,
        knownTime,
        knownDistance,
        unit,
      ),
      this.createRaceTime(
        DataCatalog.distances.oneK,
        knownTime,
        knownDistance,
        unit,
      ),
      this.createRaceTime(
        DataCatalog.distances.fiveK,
        knownTime,
        knownDistance,
        unit,
      ),
      this.createRaceTime(
        DataCatalog.distances.tenK,
        knownTime,
        knownDistance,
        unit,
      ),
      this.createRaceTime(
        DataCatalog.distances.halfMarathon,
        knownTime,
        knownDistance,
        unit,
      ),
      this.createRaceTime(
        DataCatalog.distances.marathon,
        knownTime,
        knownDistance,
        unit,
      ),
    ];
  });

  private createRaceTime(
    target: DataCatalogDistance,
    knownTime: Time,
    knownDistance: number,
    unit: DistanceUnit,
  ): FinishTime {
    const targetDistance =
      unit === DistanceUnit.KM
        ? target.distance
        : target.distance * DataCatalog.milesFactor;
    const time = this.predictFinishTime(
      knownTime,
      knownDistance,
      targetDistance,
    );

    return {
      label: target.label,
      pace: time.pace(target.distance),
      time,
    };
  }

  private predictFinishTime(
    knownTime: Time,
    knownDistance: number,
    targetDistance: number,
  ): Time {
    const totalSeconds = knownTime.totalSeconds();

    const exponent = 1.06;
    const targetTotalSeconds =
      totalSeconds * Math.pow(targetDistance / knownDistance, exponent);

    return Time.ofSeconds(targetTotalSeconds);
  }
}
