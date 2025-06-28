import { Pace } from './pace.model';
import { Time } from './time.model';

export interface FinishTime {
  label: string;
  time: Time;
  pace: Pace;
}
