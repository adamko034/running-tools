import { Injectable } from '@angular/core';
import { DataCatalogDistance } from '../catalog/data-catalog-distance.model';
import { Distance } from '../model/distance.model';
import { Time } from '../model/time.model';

@Injectable({
  providedIn: 'root',
})
export class FinishTimeService {
  calculate(
    target: DataCatalogDistance,
    knownDistance: Distance,
    knownTime: Time,
  ) {
    target.distance.convert(knownDistance.unit);
    const time = this.predictFinishTime(
      target.distance.value,
      knownDistance.value,
      knownTime,
    );

    return {
      label: target.label,
      pace: time.toPace(target.distance),
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
