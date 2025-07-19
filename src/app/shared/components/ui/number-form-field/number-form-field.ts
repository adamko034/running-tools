import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-number-form-field',
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './number-form-field.html',
})
export class NumberFormField {
  @Input() horizontalLineText = '';
  @Input() value = 0;
  @Input() suffix = '';
  @Input() min = 0;
  @Input() step = 0.1;
  @Input() name = '';

  @Output() valueChange = new EventEmitter<number>();

  onChange(newValue: number) {
    this.valueChange.emit(newValue);
  }

  getPlaceholder(): string {
    if (this.step >= 1) {
      return '0';
    }
    return '0.0';
  }
}
