import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Speed } from '../../../../core/business/model/speed.model';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-speed-pure-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './speed-pure-form-field.html',
})
export class SpeedPureFormField {
  @Input() speed!: Speed;

  @Output() speedChange = new EventEmitter<Speed>();

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  setSpeed(value: number) {
    // Always validate the input
    this.validateSpeed(value);
    
    if (this.isValid()) {
      this.speed.value = value;
      this.speedChange.emit(this.speed);
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
      this.validateSpeed(0); // Mark as invalid but don't update store
      return;
    }
    
    // Convert to number
    const numericValue = parseFloat(value) || 0;
    
    // Validate and emit change
    this.setSpeed(numericValue);
  }

  private validateSpeed(value: number): boolean {
    // Check if value is a valid positive number and not zero
    const isValidNumber = !isNaN(value) && isFinite(value);
    const isPositive = value > 0;
    
    const valid = isValidNumber && isPositive;
    
    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'Value is invalid');
    
    return valid;
  }
}
