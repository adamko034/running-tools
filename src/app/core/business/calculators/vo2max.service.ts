import { Injectable } from '@angular/core';
import { Distance } from '../../models/distance.model';
import { Time } from '../../models/time.model';
import { MathUtils } from '../../utils/math.utils';

@Injectable({
  providedIn: 'root',
})
export class Vo2MaxService {
  calculate(distance: Distance, time: Time): number {
    const totalMinutes = time.totalMinutes();
    const velocity = distance.totalMeters() / totalMinutes;

    const vo2 = 0.182258 * velocity + 0.000104 * velocity * velocity - 4.6;

    const adj =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * totalMinutes) +
      0.2989558 * Math.exp(-0.1932605 * totalMinutes);

    return MathUtils.roundTen(vo2 / adj);
  }
}
