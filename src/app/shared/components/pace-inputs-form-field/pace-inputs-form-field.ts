import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pace } from '../../../core/business/model/pace.model';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-pace-inputs-form-field',
  imports: [
    FormField,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './pace-inputs-form-field.html',
  styleUrl: './pace-inputs-form-field.scss',
})
export class PaceInputsFormField {
  @Input() pace!: Pace;

  @Output() paceChange = new EventEmitter<Pace>();

  onPaceChange(value: number, minOrSec: 'min' | 'sec') {
    const minutes = minOrSec === 'min' ? value : this.pace.minutes;
    const seconds = minOrSec === 'sec' ? value : this.pace.seconds;

    this.pace.minutes = minutes;
    this.pace.seconds = seconds;
    this.pace.validate();

    this.paceChange.emit(this.pace);
  }
}
