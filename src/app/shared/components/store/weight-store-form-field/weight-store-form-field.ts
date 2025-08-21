import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-weight-store-form-field',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './weight-store-form-field.html',
})
export class WeightStoreFormField {
  private store = inject(StoreService);
  weight = this.store.weight;

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  setWeight(value: number) {
    // Always validate the input
    this.validateWeight(value);
    
    if (this.isValid()) {
      this.weight().value = value;
      this.store.updateWeight(this.weight());
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Replace comma with dot for decimal separator
    if (value.includes(',')) {
      value = value.replace(',', '.');
      input.value = value;
    }
    
    // Check if value ends with decimal point - don't update store yet
    if (value.endsWith('.')) {
      this.validateWeight(0); // Mark as invalid but don't update store
      return;
    }
    
    // Convert to number
    const numericValue = parseFloat(value) || 0;
    
    // Validate and update store
    this.setWeight(numericValue);
  }

  private validateWeight(value: number): boolean {
    // Check if value is a valid positive number and not zero
    const isValidNumber = !isNaN(value) && isFinite(value);
    const isPositive = value > 0;
    
    const valid = isValidNumber && isPositive;
    
    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');
    
    return valid;
  }
}
