import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Pace } from '../../../../core/business/model/pace.model';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-pace-pure-form-field',
  imports: [
    FormField,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
  templateUrl: './pace-pure-form-field.html',
})
export class PacePureFormField {
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
