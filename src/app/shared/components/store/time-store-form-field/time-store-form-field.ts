import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Time } from '../../../../core/business/model/time.model';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-time-store-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    FormField,
    TranslateModule,
  ],
  templateUrl: './time-store-form-field.html',
})
export class TimeStoreFormField {
  private store = inject(StoreService);
  private time = this.store.time;

  public hours = this.time().hours;
  public minutes = this.time().minutes;
  public seconds = this.time().seconds;

  // Validation state
  isValid = signal(true);
  errorMessage = signal('');

  constructor() {
    effect(() => {
      const { hours, minutes, seconds } = this.time();
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    });
  }

  onTimeChange() {
    // Always validate the input
    this.validateTime();

    if (this.isValid()) {
      const newTime = Time.of(this.hours, this.minutes, this.seconds);
      newTime.validate();
      this.store.updateTime(newTime);
    }
  }

  onInput(event: Event, field: 'hours' | 'minutes' | 'seconds') {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove any decimal points, commas, or non-digit characters (except leading digits)
    value = value.replace(/[^\d]/g, '');

    // Convert to integer
    const numericValue = parseInt(value) || 0;

    // Update the corresponding field with range validation
    if (field === 'hours') {
      this.hours = numericValue;
    } else if (field === 'minutes') {
      this.minutes = Math.min(numericValue, 59); // Cap at 59
    } else if (field === 'seconds') {
      this.seconds = Math.min(numericValue, 59); // Cap at 59
    }

    // Update input value to show the clean integer
    input.value = (
      field === 'hours'
        ? this.hours
        : field === 'minutes'
          ? this.minutes
          : this.seconds
    ).toString();

    // Validate and update store
    this.onTimeChange();
  }

  private validateTime(): boolean {
    // Check if all values are valid integers and not all zero
    const isValidHours = Number.isInteger(this.hours) && this.hours >= 0;
    const isValidMinutes =
      Number.isInteger(this.minutes) && this.minutes >= 0 && this.minutes <= 59;
    const isValidSeconds =
      Number.isInteger(this.seconds) && this.seconds >= 0 && this.seconds <= 59;

    // Check if time is not 0:0:0
    const isNotZero = !(
      this.hours === 0 &&
      this.minutes === 0 &&
      this.seconds === 0
    );

    const valid = isValidHours && isValidMinutes && isValidSeconds && isNotZero;

    this.isValid.set(valid);
    this.errorMessage.set(valid ? '' : 'COMMON.VALIDATION.VALUE_INVALID');

    return valid;
  }
}
