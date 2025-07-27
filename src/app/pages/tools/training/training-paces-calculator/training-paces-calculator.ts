import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Pace } from '../../../../core/business/model/pace.model';
import { SeoService } from '../../../../core/services/seo.service';
import { Store } from '../../../../core/store/store.model';
import { StoreService } from '../../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../../shared/components/store/time-store-form-field/time-store-form-field';
import { FancyResult } from '../../../../shared/components/ui/fancy-result/fancy-result';
import { FaqItemComponent } from '../../../../shared/components/ui/faq-item/faq-item';
import { FaqSectionComponent } from '../../../../shared/components/ui/faq-section/faq-section';
import { ToolView } from '../../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-training-paces-calculator',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DistanceStoreFormField,
    TimeStoreFormField,
    ToolView,
    FancyResult,
    FaqSectionComponent,
    FaqItemComponent,
    TranslateModule,
  ],
  templateUrl: './training-paces-calculator.html',
  standalone: true,
})
export class TrainingPacesCalculator {
  private storeService = inject(StoreService);
  private seoService = inject(SeoService);

  constructor() {
    // Set SEO meta tags for training paces calculator
    this.seoService.updateTrainingPacesCalculatorMeta();
  }

  trainingPaces = computed(() =>
    this.calculateTrainingPaces(this.storeService.store())
  );

  private calculateTrainingPaces(store: Store) {
    const { distance, time } = store;

    // Calculate current pace from recent run
    const currentPace = Pace.calculate(time, distance);
    const currentPaceSeconds = currentPace.totalSeconds();

    // Calculate training paces based on race effort (100% strength)
    // These percentages are based on the input being a maximum effort run

    // Aerobic Low Intensity (Zone 1-2) - Much slower than race pace with ranges
    const easyRunPaceMinSeconds = currentPaceSeconds * 1.55; // 55% slower (faster end)
    const easyRunPaceMaxSeconds = currentPaceSeconds * 1.7; // 70% slower (slower end)
    const baseRunPaceMinSeconds = currentPaceSeconds * 1.25; // 25% slower (faster end)
    const baseRunPaceMaxSeconds = currentPaceSeconds * 1.35; // 35% slower (slower end)
    const longRunPaceMinSeconds = currentPaceSeconds * 1.25; // 25% slower (faster end)
    const longRunPaceMaxSeconds = currentPaceSeconds * 1.35; // 35% slower (slower end)

    // High Intensity Aerobic (Zone 3-4) - Slower than race pace but still challenging
    const tempoPaceMinSeconds = currentPaceSeconds * 1.1; // 10% slower (faster end)
    const tempoPaceMaxSeconds = currentPaceSeconds * 1.2; // 20% slower (slower end)
    const thresholdPaceMinSeconds = currentPaceSeconds * 1.05; // 5% slower (faster end)
    const thresholdPaceMaxSeconds = currentPaceSeconds * 1.12; // 12% slower (slower end)
    const vo2maxPaceMinSeconds = currentPaceSeconds * 0.98; // 2% faster (faster end)
    const vo2maxPaceMaxSeconds = currentPaceSeconds * 1.05; // 5% slower (slower end)

    // Anaerobic (Zone 5) - Faster than race pace for short bursts
    const anaerobicIntervalPaceMinSeconds = currentPaceSeconds * 0.92; // 8% faster (faster end)
    const anaerobicIntervalPaceMaxSeconds = currentPaceSeconds * 0.98; // 2% faster (slower end)
    const sprintPaceMinSeconds = currentPaceSeconds * 0.85; // 15% faster (faster end)
    const sprintPaceMaxSeconds = currentPaceSeconds * 0.95; // 5% faster (slower end)

    return {
      current: currentPace,

      // Aerobic Low Intensity Group
      aerobicLowIntensity: {
        easyRun: {
          min: Pace.ofTotalMinutes(
            easyRunPaceMinSeconds / 60,
            currentPace.unit
          ),
          max: Pace.ofTotalMinutes(
            easyRunPaceMaxSeconds / 60,
            currentPace.unit
          ),
        },
        baseRun: {
          min: Pace.ofTotalMinutes(
            baseRunPaceMinSeconds / 60,
            currentPace.unit
          ),
          max: Pace.ofTotalMinutes(
            baseRunPaceMaxSeconds / 60,
            currentPace.unit
          ),
        },
        longRun: {
          min: Pace.ofTotalMinutes(
            longRunPaceMinSeconds / 60,
            currentPace.unit
          ),
          max: Pace.ofTotalMinutes(
            longRunPaceMaxSeconds / 60,
            currentPace.unit
          ),
        },
      },

      // High Intensity Aerobic Group
      highIntensityAerobic: {
        tempoRun: {
          min: Pace.ofTotalMinutes(tempoPaceMinSeconds / 60, currentPace.unit),
          max: Pace.ofTotalMinutes(tempoPaceMaxSeconds / 60, currentPace.unit),
        },
        thresholdRun: {
          min: Pace.ofTotalMinutes(
            thresholdPaceMinSeconds / 60,
            currentPace.unit
          ),
          max: Pace.ofTotalMinutes(
            thresholdPaceMaxSeconds / 60,
            currentPace.unit
          ),
        },
        vo2maxRun: {
          min: Pace.ofTotalMinutes(vo2maxPaceMinSeconds / 60, currentPace.unit),
          max: Pace.ofTotalMinutes(vo2maxPaceMaxSeconds / 60, currentPace.unit),
        },
      },

      // Anaerobic Group
      anaerobic: {
        anaerobicIntervals: {
          min: Pace.ofTotalMinutes(
            anaerobicIntervalPaceMinSeconds / 60,
            currentPace.unit
          ),
          max: Pace.ofTotalMinutes(
            anaerobicIntervalPaceMaxSeconds / 60,
            currentPace.unit
          ),
        },
        sprints: {
          min: Pace.ofTotalMinutes(sprintPaceMinSeconds / 60, currentPace.unit),
          max: Pace.ofTotalMinutes(sprintPaceMaxSeconds / 60, currentPace.unit),
        },
      },
    };
  }
}
