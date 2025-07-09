import { Distance } from '../business/model/distance.model';
import { Pace } from '../business/model/pace.model';
import { Time } from '../business/model/time.model';
import { Weight } from '../business/model/weight.model';
import { Units } from './units.enum';

export interface Store {
  units: Units;
  distance: Distance;
  time: Time;
  pace: Pace;
  weight: Weight;
  lang: string;
}
