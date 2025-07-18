import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { HeightUnit } from '../../../../core/business/model/enums/height-unit.enum';
import { Height } from '../../../../core/business/model/height.model';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-height-store-form-field',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './height-store-form-field.html',
})
export class HeightStoreFormField {
  private store = inject(StoreService);
  height = this.store.height;
  isMetric = computed(() => this.height().unit === HeightUnit.CM);

  public feet = 0;
  public inches = 0;

  constructor() {
    effect(() => {
      const feetAndInches = this.height().toFeetAndInches();
      this.feet = feetAndInches.feet;
      this.inches = feetAndInches.inches;
    });
  }

  onMetricHeightChange(value: number) {
    this.height().value = value;
    this.store.updateHeight(this.height());
  }

  onImperialHeightChange(value: number, unit: 'ft' | 'in') {
    const newFeet = unit === 'ft' ? value : this.feet;
    const newInches = unit === 'in' ? value : this.inches;
    const newHeight = Height.ofFeetAndInches(newFeet, newInches);

    newHeight.validate();
    this.store.updateHeight(newHeight);
  }
}
