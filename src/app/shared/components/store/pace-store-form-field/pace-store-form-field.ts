import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pace } from '../../../../core/business/model/pace.model';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-pace-store-form-field',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './pace-store-form-field.html',
})
export class PaceStoreFormField {
  private store = inject(StoreService);
  pace = computed(() => this.store.pace());

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  onPaceChange(value: number, minOrSec: 'min' | 'sec') {
    // Always validate the input
    const minutes = minOrSec === 'min' ? value : this.pace().minutes;
    const seconds = minOrSec === 'sec' ? value : this.pace().seconds;
    this.validatePace(minutes, seconds);
    
    if (this.isValid()) {
      const newPace = Pace.of(minutes, seconds, this.pace().unit);
      this.store.updatePace(newPace);
    }
  }

  onInput(event: Event, field: 'min' | 'sec') {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Remove any decimal points, commas, or non-digit characters (except leading digits)
    value = value.replace(/[^\d]/g, '');
    
    // Convert to integer
    const numericValue = parseInt(value) || 0;
    
    // Cap seconds at 59
    const finalValue = field === 'sec' ? Math.min(numericValue, 59) : numericValue;
    
    // Update input value to show the clean integer
    input.value = finalValue.toString();
    
    // Validate and update store
    this.onPaceChange(finalValue, field);
  }

  private validatePace(minutes: number, seconds: number): boolean {
    // Check if all values are valid integers and not all zero
    const isValidMinutes = Number.isInteger(minutes) && minutes >= 0;
    const isValidSeconds = Number.isInteger(seconds) && seconds >= 0 && seconds <= 59;
    
    // Check if pace is not 0:0
    const isNotZero = !(minutes === 0 && seconds === 0);
    
    const valid = isValidMinutes && isValidSeconds && isNotZero;
    
    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');
    
    return valid;
  }
}
