import { DistanceUnit } from '../models/distance-unit.enum';
import { Pace } from '../models/pace.model';
import { Time } from '../models/time.model';

export interface Store {
  distanceUnit: DistanceUnit;
  distance: number;
  time: Time;
  pace: Pace;
}
