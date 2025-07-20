import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Distance } from '../../../core/business/model/distance.model';
import { DistanceUnit } from '../../../core/business/model/enums/distance-unit.enum';
import { SeoService } from '../../../core/services/seo.service';
import { StoreService } from '../../../core/store/store.service';
import { DistanceQuickSelectors } from '../../../shared/components/business/distance-quick-selectors/distance-quick-selectors';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { NumberFormField } from '../../../shared/components/ui/number-form-field/number-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-distance-unit-converter',
  imports: [
    ToolView,
    FancyResult,
    NumberFormField,
    DistanceQuickSelectors,
    TranslateModule,
  ],
  templateUrl: './distance-unit-converter.html',
})
export class DistanceUnitConverter {
  private store = inject(StoreService);
  private seoService = inject(SeoService);

  constructor() {
    // Set SEO meta tags for distance converter
    this.seoService.updateDistanceConverterMeta();
  }

  kmDistance = this.store.distance().clone();
  miDistance = this.kmDistance.cloneAndConvert(DistanceUnit.MI);
  selectedKmDistance = this.kmDistance.value;

  onKmDistanceChange(
    newValue: number,
    fromSelection: boolean | undefined = undefined
  ) {
    this.kmDistance.value = newValue;
    this.miDistance.setValueAndConvert(newValue);

    if (!fromSelection) {
      this.selectedKmDistance = 0;
    }
  }

  onKmDistanceSelected(selected: Distance) {
    this.onKmDistanceChange(selected.value, true);
  }

  onMiDistanceChange(
    newValue: number,
    fromSelection: boolean | undefined = undefined
  ) {
    this.miDistance.value = newValue;
    this.kmDistance.setValueAndConvert(newValue);

    if (!fromSelection) {
      this.selectedKmDistance = 0;
    }
  }

  onMiDistanceSelected(selected: Distance) {
    this.onMiDistanceChange(selected.value, true);
  }

  onQuickDistanceSelect(kmValue: number) {
    this.selectedKmDistance = kmValue;
    this.onKmDistanceChange(kmValue, true);
  }

  isSelected(kmValue: number): boolean {
    // Check if this specific distance was selected via quick selector
    return kmValue === this.kmDistance.value;
  }
}
