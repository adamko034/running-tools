import { Component, computed, inject } from '@angular/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { SeoService } from '../../../core/services/seo.service';
import { StoreService } from '../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { WeightStoreFormField } from '../../../shared/components/store/weight-store-form-field/weight-store-form-field';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { FaqSectionComponent } from '../../../shared/components/ui/faq-section/faq-section';
import { FaqItemComponent } from '../../../shared/components/ui/faq-item/faq-item';

import { TranslateModule } from '@ngx-translate/core';
import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { ToolView } from './../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-calories-burned-calculator',
  imports: [
    ToolView,
    DistanceStoreFormField,
    WeightStoreFormField,
    TimeStoreFormField,
    FancyResult,
    FaqSectionComponent,
    FaqItemComponent,
    TranslateModule,
  ],
  templateUrl: './calories-burned-calculator.html',
})
export class CaloriesBurnedCalculator {
  private store = inject(StoreService);
  private calculators = inject(CalculatorsFacade);
  private seoService = inject(SeoService);

  constructor() {
    // Set SEO meta tags for calories burned calculator
    this.seoService.updateCaloriesBurnedMeta();
  }

  calories = computed(() => {
    const distance = this.store.distance();
    const time = this.store.time();
    const weight = this.store.weight();

    const calories = this.calculators.caloriesBurned(distance, time, weight);
    return calories.toFixed(0);
  });
}
