import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PaceStrategy } from '../../../../core/business/model/enums/pace-strategy.enum';
import { Pace } from '../../../../core/business/model/pace.model';
import { Time } from '../../../../core/business/model/time.model';
import { SeoService } from '../../../../core/services/seo.service';
import { StoreService } from '../../../../core/store/store.service';
import { LoggerDev } from '../../../../core/utils/logger-dev';
import { DistanceStoreFormField } from '../../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../../shared/components/store/time-store-form-field/time-store-form-field';
import { FancyResult } from '../../../../shared/components/ui/fancy-result/fancy-result';
import { FaqItemComponent } from '../../../../shared/components/ui/faq-item/faq-item';
import { FaqSectionComponent } from '../../../../shared/components/ui/faq-section/faq-section';
import { ToolView } from '../../../../shared/views/tool-view/tool-view';
import { PacingStrategy } from './pacing-strategy.model';
import { RaceSegment } from './race-segment.model';

@Component({
  selector: 'app-race-strategies-calculator',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    DistanceStoreFormField,
    TimeStoreFormField,
    FancyResult,
    FaqSectionComponent,
    FaqItemComponent,
    ToolView,
  ],
  templateUrl: './race-strategies-calculator.html',
  standalone: true,
})
export class RaceStrategiesCalculator {
  private seoService = inject(SeoService);
  private store = inject(StoreService);

  // Expose Math for template
  distance = this.store.distance;
  time = this.store.time;
  Math = Math;

  // Available pacing strategies
  strategies: PacingStrategy[] = [
    {
      name: 'Negative Split ⭐',
      key: PaceStrategy.NEGATIVE,
      description: 'Conservative start, build gradually - safest for beginners',
      segments: [
        {
          phase: 'Conservative Start',
          distancePercent: 0.3,
          paceAdjustmentPercent: 1.03,
          description: 'Start slower to save energy',
        },
        {
          phase: 'Build Middle',
          distancePercent: 0.4,
          paceAdjustmentPercent: 1.0,
          description: 'Gradually reach target pace',
        },
        {
          phase: 'Strong Finish',
          distancePercent: 0.3,
          paceAdjustmentPercent: 0.97,
          description: 'Finish faster than target',
        },
      ],
    },
    {
      name: 'Even Split',
      key: PaceStrategy.EVEN,
      description: 'Consistent pace throughout - ideal for experienced runners',
      segments: [
        {
          phase: 'Steady Start',
          distancePercent: 0.33,
          paceAdjustmentPercent: 1.0,
          description: 'Start at target pace',
        },
        {
          phase: 'Maintain Pace',
          distancePercent: 0.34,
          paceAdjustmentPercent: 1.0,
          description: 'Hold steady effort',
        },
        {
          phase: 'Final Push',
          distancePercent: 0.33,
          paceAdjustmentPercent: 1.0,
          description: 'Maintain to finish',
        },
      ],
    },
    {
      name: 'Positive Split',
      key: PaceStrategy.POSITIVE,
      description:
        'Fast start, hold on - risky but can work for shorter distances',
      segments: [
        {
          phase: 'Aggressive Start',
          distancePercent: 0.3,
          paceAdjustmentPercent: 0.97,
          description: 'Start faster than target',
        },
        {
          phase: 'Hold Effort',
          distancePercent: 0.4,
          paceAdjustmentPercent: 1.0,
          description: 'Try to maintain pace',
        },
        {
          phase: 'Survival Mode',
          distancePercent: 0.3,
          paceAdjustmentPercent: 1.03,
          description: 'Fight to maintain speed',
        },
      ],
    },
    {
      name: 'Surge Strategy',
      key: PaceStrategy.SURGE,
      description: 'Strategic mid-race acceleration - for tactical races',
      segments: [
        {
          phase: 'Controlled Start',
          distancePercent: 0.25,
          paceAdjustmentPercent: 1.02,
          description: 'Conservative opening',
        },
        {
          phase: 'Power Surge',
          distancePercent: 0.5,
          paceAdjustmentPercent: 0.96,
          description: 'Mid-race acceleration',
        },
        {
          phase: 'Smart Finish',
          distancePercent: 0.25,
          paceAdjustmentPercent: 1.01,
          description: 'Controlled finish',
        },
      ],
    },
  ];

  selectedPaceStrategy = this.store.paceStrategy;
  selectedStrategy = computed(() => {
    const key = this.store.paceStrategy();
    LoggerDev.log('component, reacting on strategy change from store', key);
    return this.strategies.filter(s => s.key === key)[0];
  });


  // Get pace color based on actual pace effort relative to target
  getPaceColorClass(segmentIndex: number): string {
    const segments = this.raceStrategy();
    if (segments.length === 0) return 'text-orange-600';

    const strategy = this.selectedStrategy();
    const strategySegment = strategy.segments[segmentIndex];

    if (!strategySegment) return 'text-orange-600';

    const paceAdjustment = strategySegment.paceAdjustmentPercent;

    // Green: Slower than target (conservative, easier effort)
    if (paceAdjustment > 1.01) {
      return 'text-green-600';
    }

    // Red: Faster than target (aggressive, harder effort)
    if (paceAdjustment < 0.99) {
      return 'text-red-800';
    }

    // Orange: At or near target pace
    return 'text-orange-500';
  }

  // Get timeline node background color
  getTimelineNodeClass(segmentIndex: number): string {
    const segments = this.raceStrategy();
    if (segments.length === 0) return 'bg-orange-500';

    const strategy = this.selectedStrategy();
    const strategySegment = strategy.segments[segmentIndex];

    if (!strategySegment) return 'bg-orange-500';

    const paceAdjustment = strategySegment.paceAdjustmentPercent;

    // Green: Slower than target (conservative, easier effort)
    if (paceAdjustment > 1.01) {
      return 'bg-green-500';
    }

    // Red: Faster than target (aggressive, harder effort)
    if (paceAdjustment < 0.99) {
      return 'bg-red-700';
    }

    // Orange: At or near target pace
    return 'bg-orange-400';
  }

  // Get timeline number border and text color
  getTimelineNumberClass(segmentIndex: number): string {
    const segments = this.raceStrategy();
    if (segments.length === 0) return 'border-orange-500 text-orange-600';

    const strategy = this.selectedStrategy();
    const strategySegment = strategy.segments[segmentIndex];

    if (!strategySegment) return 'border-orange-500 text-orange-600';

    const paceAdjustment = strategySegment.paceAdjustmentPercent;

    // Green: Slower than target (conservative, easier effort)
    if (paceAdjustment > 1.01) {
      return 'border-green-500 text-green-600';
    }

    // Red: Faster than target (aggressive, harder effort)
    if (paceAdjustment < 0.99) {
      return 'border-red-700 text-red-800';
    }

    // Orange: At or near target pace
    return 'border-orange-400 text-orange-500';
  }

  constructor() {
    // Set SEO meta tags for race strategies calculator
    this.seoService.updateRaceStrategiesCalculatorMeta();
  }

  // Computed race strategy
  raceStrategy = computed(() => {
    const distance = this.distance();
    const time = this.time();
    const strategy = this.selectedStrategy();

    if (time.totalSeconds() === 0 || distance.value === 0) {
      return [];
    }

    // Calculate average pace
    const avgPace = Pace.calculate(time, distance);
    const avgPaceSeconds = avgPace.totalSeconds();

    // Generate strategy using selected strategy
    return this.calculateOptimalSegments(
      distance.value,
      strategy.segments,
      avgPaceSeconds
    );
  });

  onStrategyChange(event: any) {
    LoggerDev.log('component on strategy change', event?.target?.value);
    const strategyKey = event?.target?.value;
    if (strategyKey) {
      this.store.updatePaceStrategy(strategyKey);
    }
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
    return Pace.of(minutes, seconds, this.distance().unit);
  }

  // Format distance for display
  formatDistance(distance: number): string {
    if (distance >= 1) {
      return `${distance.toFixed(1)}${this.distance().unit}`;
    } else {
      return `${(distance * 1000).toFixed(0)}m`;
    }
  }

  // Format distance range for display
  formatDistanceRange(segmentIndex: number): string {
    const segments = this.raceStrategy();
    if (segments.length === 0) return '';

    let start = 0;
    // Calculate start position by summing previous segments
    for (let i = 0; i < segmentIndex; i++) {
      start += segments[i].distance;
    }

    const end = start + segments[segmentIndex].distance;

    // Format start and end
    const formatSingle = (dist: number) => {
      if (dist === 0) return 'Start';
      if (dist >= 1) return `${dist.toFixed(1)}${this.distance().unit}`;
      return `${(dist * 1000).toFixed(0)}m`;
    };

    const startFormatted = formatSingle(start);
    const endFormatted =
      segmentIndex === segments.length - 1 ? 'Finish' : formatSingle(end);

    return `${startFormatted} → ${endFormatted}`;
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
