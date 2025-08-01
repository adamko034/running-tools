import { PaceStrategy } from '../../../../core/business/model/enums/pace-strategy.enum';

export interface PacingStrategy {
  name: string;
  key: PaceStrategy;
  description: string;
  segments: {
    phase: string;
    distancePercent: number;
    paceAdjustmentPercent: number;
    description: string;
  }[];
}
