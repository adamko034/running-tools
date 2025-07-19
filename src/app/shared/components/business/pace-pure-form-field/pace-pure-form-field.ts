import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Pace } from '../../../../core/business/model/pace.model';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-pace-pure-form-field',
  imports: [
    FormField,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
    TranslateModule,
  ],
  templateUrl: './pace-pure-form-field.html',
})
export class PacePureFormField {
  @Input() pace!: Pace;

  @Output() paceChange = new EventEmitter<Pace>();

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  onPaceChange(value: number, minOrSec: 'min' | 'sec') {
    const minutes = minOrSec === 'min' ? value : this.pace.minutes;
    const seconds = minOrSec === 'sec' ? value : this.pace.seconds;
    
    // Always validate the input
    this.validatePace(minutes, seconds);
    
    if (this.isValid()) {
      this.pace.minutes = minutes;
      this.pace.seconds = seconds;
      this.pace.validate();
      this.paceChange.emit(this.pace);
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
    
    // Validate and emit change
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
    this.errorMessage.set(valid ? '' : 'COMMON.VALIDATION.VALUE_INVALID');
    
    return valid;
  }
}
