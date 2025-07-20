import { Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../core/services/seo.service';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { StoreService } from '../../../core/store/store.service';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
@Component({
  selector: 'app-vo2max-calculator',
  imports: [
    ToolView,
    DistanceStoreFormField,
    TimeStoreFormField,
    FancyResult,
    TranslateModule,
  ],
  templateUrl: './vo2max-calculator.html',
})
export class Vo2maxCalculator {
  private store = inject(StoreService);
  private calculators = inject(CalculatorsFacade);
  private seoService = inject(SeoService);

  constructor() {
    // Set SEO meta tags for VO2 max calculator
    this.seoService.updateVo2MaxCalculatorMeta();
  }

  vo2Max = computed(() => {
    const time = this.store.time();
    const distance = this.store.distance();

    return this.calculators.vo2Max(distance, time);
  });
}
