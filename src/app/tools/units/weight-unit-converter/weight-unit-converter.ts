import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../core/services/seo.service';
import { WeightUnit } from '../../../core/business/model/enums/weight-unit.enum';
import { StoreService } from '../../../core/store/store.service';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { FaqSectionComponent } from '../../../shared/components/ui/faq-section/faq-section';
import { FaqItemComponent } from '../../../shared/components/ui/faq-item/faq-item';
import { NumberFormField } from '../../../shared/components/ui/number-form-field/number-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-weight-unit-converter',
  imports: [ToolView, NumberFormField, FancyResult, FaqSectionComponent, FaqItemComponent, TranslateModule],
  templateUrl: './weight-unit-converter.html',
})
export class WeightUnitConverter {
  private store = inject(StoreService);
  private seoService = inject(SeoService);

  constructor() {
    // Set SEO meta tags for weight converter
    this.seoService.updateWeightConverterMeta();
  }

  private weight = this.store.weight();

  kgWeight = this.weight.cloneAndConvert(WeightUnit.KG);
  lbWeight = this.weight.cloneAndConvert(WeightUnit.LB);

  onKilogramsChange(newValue: number) {
    this.kgWeight.value = newValue;
    this.lbWeight.setValueAndConvert(newValue);
  }

  onPoundsChange(newValue: number) {
    this.kgWeight.setValueAndConvert(newValue);
    this.lbWeight.value = newValue;
  }
}
