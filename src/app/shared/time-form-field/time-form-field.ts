import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';
import { Time } from './time.model';

@Component({
  selector: 'app-time-form-field',
  imports: [
    HorizontalLineWithText,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './time-form-field.html',
  styleUrl: './time-form-field.scss',
})
export class TimeFormField {
  @Input() value = Time.default();
  @Input() showHorizontalLine = true;

  @Output() timeChange = new EventEmitter<Time>();

  onTimeChange() {
    this.timeChange.emit(this.value);
  }
}
