import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-age-store-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    FormField,
    TranslateModule,
  ],
  templateUrl: './age-store-form-field.html',
})
export class AgeStoreFormField {
  private store = inject(StoreService);
  age = this.store.age;

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  setAge(value: number) {
    // Always validate the input
    this.validateAge(value);
    
    if (this.isValid()) {
      this.store.updateAge(value);
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Remove any decimal points, commas, or non-digit characters
    value = value.replace(/[^\d]/g, '');
    
    // Convert to integer
    const numericValue = parseInt(value) || 0;
    
    // Update input value to show the clean integer
    input.value = numericValue.toString();
    
    // Validate and update store
    this.setAge(numericValue);
  }

  private validateAge(value: number): boolean {
    // Check if value is a valid positive integer and not zero
    const isValidInteger = Number.isInteger(value) && value > 0;
    
    const valid = isValidInteger;
    
    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'COMMON.VALIDATION.VALUE_INVALID');
    
    return valid;
  }
}
