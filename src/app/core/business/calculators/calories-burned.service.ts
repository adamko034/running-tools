import { Injectable } from '@angular/core';
import { MathUtils } from '../../utils/math.utils';
import { DataCatalog } from '../catalog/data-catalog';
import { Distance } from '../model/distance.model';
import { DistanceUnit } from '../model/enums/distance-unit.enum';
import { Time } from '../model/time.model';
import { Weight } from '../model/weight.model';

@Injectable({
  providedIn: 'root',
})
export class CaloriesBurnedService {
  calculcate(distance: Distance, time: Time, weight: Weight): number {
    const speed = time.toSpeed(distance);
    const met = this.getMETForSpeed(speed.valueOfUnit(DistanceUnit.KM));
    const weightKg = weight.kgValue;

    return MathUtils.roundInteger(
      met * DataCatalog.calorieFactor * weightKg * time.totalMinutes(),
    );
  }

  private getMETForSpeed(speed: number): number {
    if (speed < 8.0) return 7.0;
    if (speed < 9.7) return 8.3;
    if (speed < 11.3) return 9.8;
    if (speed < 12.9) return 11.0;
    if (speed < 14.5) return 11.8;
    if (speed < 16.1) return 12.8;
    return 15.0;
  }
}
