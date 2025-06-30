import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pace } from '../../core/business/model/pace.model';
import { StoreService } from '../../core/store/store.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-pace-form-field',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './pace-form-field.html',
  styleUrl: './pace-form-field.scss',
})
export class PaceFormField {
  private store = inject(StoreService);
  pace = computed(() => this.store.pace());

  onPaceChange(value: number, minOrSec: 'min' | 'sec') {
    const newPace = Pace.of(
      minOrSec === 'min' ? value : this.pace().minutes,
      minOrSec === 'sec' ? value : this.pace().seconds,
      this.pace().unit,
    );
    this.store.updatePace(newPace);
  }
}
