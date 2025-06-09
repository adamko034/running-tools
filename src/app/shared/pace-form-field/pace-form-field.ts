import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectOnFocus } from '../directives/select-on-focus';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';
import { Pace } from './pace.model';

@Component({
  selector: 'app-pace-form-field',
  imports: [
    HorizontalLineWithText,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
  ],
  templateUrl: './pace-form-field.html',
  styleUrl: './pace-form-field.scss',
})
export class PaceFormField {
  @Input() value: Pace = Pace.default();
  @Input() showHorizontalLine = true;

  @Output() paceChange = new EventEmitter<Pace>();

  onPaceChange() {
    this.paceChange.emit(this.value);
  }
}
