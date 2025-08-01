import { Pace } from '../../../../core/business/model/pace.model';

export interface RaceSegment {
  phase: string;
  distance: number;
  pace: Pace;
  description: string;
}
