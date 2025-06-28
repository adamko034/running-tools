import { Injectable } from '@angular/core';
import { DistanceUnit } from '../../models/distance-unit.enum';
import { Distance } from '../../models/distance.model';
import { Speed } from '../../models/speed.model';
import { Time } from '../../models/time.model';
import { Weight } from '../../models/weight.model';
import { MathUtils } from '../../utils/math.utils';

@Injectable({
  providedIn: 'root',
})
export class CaloriesBurnedService {
  calculcate(distance: Distance, time: Time, weight: Weight): number {
    const speed = time.toSpeed(distance);
    const met = this.getMETForSpeed(speed);

    console.log(speed, met, distance.unit, weight.unit);

    return MathUtils.roundInteger(met * weight.value * time.totalHours());
  }

  private getMETForSpeed(speed: Speed): number {
    if (speed.units === DistanceUnit.MI) {
      if (speed.value < 5.0) return 6.0; // slow jog
      if (speed.value < 6.0) return 8.3;
      if (speed.value < 7.0) return 9.8;
      if (speed.value < 8.0) return 11.0;
      if (speed.value < 9.0) return 11.8;
      if (speed.value < 10.0) return 12.8;
      return 15.0;
    } else {
      if (speed.value < 8.0) return 7.0;
      if (speed.value < 9.7) return 8.3;
      if (speed.value < 11.3) return 9.8;
      if (speed.value < 12.9) return 11.0;
      if (speed.value < 14.5) return 11.8;
      if (speed.value < 16.1) return 12.8;
      return 15.0;
    }
  }
}
