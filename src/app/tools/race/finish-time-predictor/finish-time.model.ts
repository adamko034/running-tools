import { Pace } from '../../../core/models/pace.model';
import { Time } from '../../../core/models/time.model';

export interface FinishTime {
  label: string;
  time: Time;
  pace: Pace;
}
