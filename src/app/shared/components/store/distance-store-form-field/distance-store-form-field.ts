import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DataCatalog } from '../../../../core/business/catalog/data-catalog';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-distance-store-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    MatIconModule,
    MatMenuModule,
    FormField,
  ],
  templateUrl: './distance-store-form-field.html',
})
export class DistanceStoreFormField {
  private store = inject(StoreService);
  distance = this.store.distance;

  distancesKeys = DataCatalog.distancesKeys;
  distances = DataCatalog.distances;

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  setDistance(value: number) {
    // Always validate the input
    this.validateDistance(value);

    if (this.isValid()) {
      const newDistance = this.distance().clone();
      newDistance.value = value;
      this.store.updateDistance(newDistance);
    }
  }

  setRaceDistance(kmValue: number) {
    // Reset validation state when using preset distances (they're always valid)
    this.isValid.set(true);
    this.errorMessage.set('');

    this.distance().convertAndSetKmValue(kmValue);
    this.store.updateDistance(this.distance());
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Replace comma with dot for decimal separator
    if (value.includes(',')) {
      value = value.replace(',', '.');
      input.value = value;
    }

    // Validate the input value
    const numericValue = parseFloat(value) || 0;
    this.validateDistance(numericValue);

    // Only update store if valid
    if (this.isValid()) {
      this.setDistance(numericValue);
    }
  }

  private validateDistance(value: number): boolean {
    // Handle empty input (value would be 0 from parseFloat)
    if (value === 0) {
      this.isValid.set(false);
      this.errorMessage.set('Value is invalid');
      return false;
    }

    // Check if value is a valid number and greater than 0
    const isValidNumber = !isNaN(value) && isFinite(value);
    const isPositive = value > 0;

    const valid = isValidNumber && isPositive;

    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');

    return valid;
  }
}
