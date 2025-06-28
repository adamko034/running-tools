import { Injectable } from '@angular/core';
import { Distance } from '../../models/distance.model';
import { Time } from '../../models/time.model';
import { DataCatalogDistance } from '../catalog/data-catalog-distance.model';

@Injectable({
  providedIn: 'root',
})
export class FinishTimeService {
  calculate(
    target: DataCatalogDistance,
    knownDistance: Distance,
    knownTime: Time,
  ) {
    const targetDistance = target.getValueOfUnit(knownDistance.unit);
    const time = this.predictFinishTime(
      targetDistance,
      knownDistance.value,
      knownTime,
    );

    return {
      label: target.label,
      pace: time.toPace(Distance.of(targetDistance, knownDistance.unit)),
      time,
    };
  }

  private predictFinishTime(
    targetDistance: number,
    knownDistance: number,
    knownTime: Time,
  ): Time {
    const totalSeconds = knownTime.totalSeconds();

    const exponent = 1.06;
    const targetTotalSeconds =
      totalSeconds * Math.pow(targetDistance / knownDistance, exponent);

    return Time.ofSeconds(targetTotalSeconds);
  }
}
