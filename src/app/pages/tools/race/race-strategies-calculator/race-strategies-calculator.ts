import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DistanceUnit } from '../../../../core/business/model/enums/distance-unit.enum';
import { Pace } from '../../../../core/business/model/pace.model';
import { Time } from '../../../../core/business/model/time.model';
import { SeoService } from '../../../../core/services/seo.service';
import { StoreService } from '../../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../../shared/components/store/time-store-form-field/time-store-form-field';
import { FancyResult } from '../../../../shared/components/ui/fancy-result/fancy-result';
import { ToolView } from '../../../../shared/views/tool-view/tool-view';

interface RaceSegment {
  phase: string;
  distance: number;
  pace: Pace;
  description: string;
}

@Component({
  selector: 'app-race-strategies-calculator',
  imports: [
    CommonModule,
    DistanceStoreFormField,
    TimeStoreFormField,
    FancyResult,
    ToolView,
  ],
  templateUrl: './race-strategies-calculator.html',
  standalone: true,
})
export class RaceStrategiesCalculator {
  private seoService = inject(SeoService);
  public store = inject(StoreService);

  constructor() {
    // Set SEO meta tags for race strategies calculator
    this.seoService.updateRaceStrategiesCalculatorMeta();
  }

  // Computed race strategy
  raceStrategy = computed(() => {
    const distance = this.store.distance();
    const time = this.store.time();

    if (time.totalSeconds() === 0 || distance.value === 0) {
      return [];
    }

    // Calculate average pace
    const avgPace = Pace.calculate(time, distance);
    const avgPaceSeconds = avgPace.totalSeconds();

    // Generate strategy based on distance
    return this.generateStrategy(
      distance.value,
      `${distance.value}${distance.unit}`,
      avgPaceSeconds
    );
  });

  private generateStrategy(
    distanceKm: number,
    distanceLabel: string,
    avgPaceSeconds: number
  ): RaceSegment[] {
    // Research-based pacing strategies with percentage distributions
    let strategy: {
      phase: string;
      distancePercent: number;
      paceAdjustmentPercent: number;
      description: string;
    }[];

    if (distanceKm <= 6) {
      // 5K Strategy (Tucker et al., 2006 - optimal pacing for 5K)
      strategy = [
        {
          phase: 'Start Controlled',
          distancePercent: 0.2,
          paceAdjustmentPercent: 1.03,
          description: 'First 20% - settle into rhythm',
        },
        {
          phase: 'Build Middle',
          distancePercent: 0.65,
          paceAdjustmentPercent: 1.0,
          description: 'Main section - maintain target effort',
        },
        {
          phase: 'Finish Strong',
          distancePercent: 0.15,
          paceAdjustmentPercent: 0.95,
          description: 'Final push - empty the tank',
        },
      ];
    } else if (distanceKm <= 12) {
      // 10K Strategy (Santos-Lozano et al., 2014)
      strategy = [
        {
          phase: 'Start Conservative',
          distancePercent: 0.2,
          paceAdjustmentPercent: 1.025,
          description: 'First 20% - settle into race rhythm',
        },
        {
          phase: 'Steady Build',
          distancePercent: 0.6,
          paceAdjustmentPercent: 1.0,
          description: 'Main section - hold target pace',
        },
        {
          phase: 'Strong Finish',
          distancePercent: 0.2,
          paceAdjustmentPercent: 0.975,
          description: 'Final 20% - increase effort',
        },
      ];
    } else if (distanceKm <= 25) {
      // Half Marathon Strategy (Hanley, 2014 - analysis of elite half marathon pacing)
      strategy = [
        {
          phase: 'Conservative Start',
          distancePercent: 0.25,
          paceAdjustmentPercent: 1.02,
          description: 'First quarter - controlled start pace',
        },
        {
          phase: 'Steady Rhythm',
          distancePercent: 0.5,
          paceAdjustmentPercent: 1.0,
          description: 'Middle section - find your rhythm',
        },
        {
          phase: 'Controlled Push',
          distancePercent: 0.25,
          paceAdjustmentPercent: 0.985,
          description: 'Final quarter - controlled acceleration',
        },
      ];
    } else {
      // Marathon Strategy (Hanley, 2014; Deaner et al., 2015 - marathon pacing research)
      strategy = [
        {
          phase: 'Very Conservative',
          distancePercent: 0.25,
          paceAdjustmentPercent: 1.03,
          description: 'First quarter - save energy',
        },
        {
          phase: 'Steady Effort',
          distancePercent: 0.5,
          paceAdjustmentPercent: 1.0,
          description: 'Middle section - maintain effort',
        },
        {
          phase: 'Manage Fatigue',
          distancePercent: 0.25,
          paceAdjustmentPercent: 1.02,
          description: 'Final quarter - fight through fatigue',
        },
      ];
    }

    // Calculate segments ensuring total time equals target time
    return this.calculateOptimalSegments(distanceKm, strategy, avgPaceSeconds);
  }

  private calculateOptimalSegments(
    totalDistance: number,
    strategy: {
      phase: string;
      distancePercent: number;
      paceAdjustmentPercent: number;
      description: string;
    }[],
    targetAvgPaceSeconds: number
  ): RaceSegment[] {
    const targetTotalTime = targetAvgPaceSeconds * totalDistance;

    // Calculate initial time distribution based on pace adjustments
    let totalWeightedTime = 0;
    const segmentData = strategy.map(segment => {
      const distance = totalDistance * segment.distancePercent;
      const adjustedPace = targetAvgPaceSeconds * segment.paceAdjustmentPercent;
      const segmentTime = distance * adjustedPace;
      totalWeightedTime += segmentTime;

      return {
        ...segment,
        distance,
        initialTime: segmentTime,
        adjustedPace,
      };
    });

    // Scale to ensure total time equals target time
    const scaleFactor = targetTotalTime / totalWeightedTime;

    return segmentData.map(segment => ({
      phase: segment.phase,
      distance: segment.distance,
      pace: this.createPaceFromSeconds(
        (segment.initialTime * scaleFactor) / segment.distance
      ),
      description: segment.description,
    }));
  }

  private createPaceFromSeconds(totalSeconds: number): Pace {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return Pace.of(minutes, seconds, DistanceUnit.KM);
  }

  // Format distance for display
  formatDistance(distance: number): string {
    if (distance >= 1) {
      return `${distance.toFixed(1)}km`;
    } else {
      return `${(distance * 1000).toFixed(0)}m`;
    }
  }

  // Calculate total time for verification
  getTotalStrategyTime(): string {
    const segments = this.raceStrategy();
    if (segments.length === 0) return '';

    let totalSeconds = 0;
    segments.forEach(segment => {
      const segmentTime = segment.pace.totalSeconds() * segment.distance;
      totalSeconds += segmentTime;
    });

    return Time.ofSeconds(totalSeconds).format();
  }
}
