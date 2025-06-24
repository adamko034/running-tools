import { Distance } from '../models/distance.model';
import { Pace } from '../models/pace.model';
import { Time } from '../models/time.model';
import { Weight } from '../models/weight.model';
import { Units } from './units.model';

export interface Store {
  units: Units;
  distance: Distance;
  time: Time;
  pace: Pace;
  weight: Weight;
}
