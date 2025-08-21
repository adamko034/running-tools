import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const feetAndInches = this.height().toFeetAndInches();
      this.feet = feetAndInches.feet;
      this.inches = feetAndInches.inches;
    });
  }

  onMetricHeightChange(value: number) {
    // Always validate the input
    this.validateMetricHeight(value);

    if (this.isValid()) {
      this.height().value = value;
      this.store.updateHeight(this.height());
    }
  }

  onImperialHeightChange(value: number, unit: 'ft' | 'in') {
    const newFeet = unit === 'ft' ? value : this.feet;
    const newInches = unit === 'in' ? value : this.inches;

    // Always validate the input
    this.validateImperialHeight(newFeet, newInches);

    if (this.isValid()) {
      const newHeight = Height.ofFeetAndInches(newFeet, newInches);
      newHeight.validate();
      this.store.updateHeight(newHeight);
    }
  }

  onMetricInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Check if value ends with decimal point - don't update store yet
    if (value.endsWith('.') || value.endsWith(',')) {
      this.validateMetricHeight(0); // Mark as invalid but don't update store
      return;
    }

    // Replace comma with dot for decimal separator
    if (value.includes(',')) {
      value = value.replace(',', '.');
      input.value = value;
    }

    // Convert to number
    const numericValue = parseFloat(value) || 0;

    // Validate and update store
    this.onMetricHeightChange(numericValue);
  }

  onImperialInput(event: Event, unit: 'ft' | 'in') {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove any decimal points, commas, or non-digit characters (imperial is integer-only)
    value = value.replace(/[^\d]/g, '');

    // Convert to integer
    const numericValue = parseInt(value) || 0;

    // Update the corresponding field
    if (unit === 'ft') {
      this.feet = numericValue;
    } else {
      this.inches = numericValue; // Cap inches at 11
    }

    // Update input value to show the clean integer
    input.value = (unit === 'ft' ? this.feet : this.inches).toString();

    // Validate and update store
    this.onImperialHeightChange(numericValue, unit);
  }

  private validateMetricHeight(value: number): boolean {
    // Check if value is a valid positive number
    const isValidNumber = !isNaN(value) && isFinite(value);
    const isPositive = value > 0;

    const valid = isValidNumber && isPositive;

    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');

    return valid;
  }

  private validateImperialHeight(feet: number, inches: number): boolean {
    // Check if values are valid positive integers
    const isValidFeet = Number.isInteger(feet) && feet >= 0;
    const isValidInches =
      Number.isInteger(inches) && inches >= 0 && inches <= 11;

    // Check if at least one value is positive (not both zero)
    const isPositive = feet > 0 || inches > 0;

    const valid = isValidFeet && isValidInches && isPositive;

    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');

    return valid;
  }
}
