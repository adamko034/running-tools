import { Pace } from './pace.model';
import { Time } from './time.model';

export interface FinishTime {
  translationKey: string;
  time: Time;
  pace: Pace;
}
