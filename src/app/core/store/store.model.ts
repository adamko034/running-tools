import { DistanceUnit } from '../models/distance-unit.enum';
import { Distance } from '../models/distance.model';
import { Pace } from '../models/pace.model';
import { Time } from '../models/time.model';

export interface Store {
  distanceUnit: DistanceUnit;
  distance: Distance;
  time: Time;
  pace: Pace;
}
