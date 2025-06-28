import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '../../core/store/store.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-weight-form-field',
  imports: [
    CommonModule,
    HorizontalLineWithText,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SelectOnFocus,
  ],
  templateUrl: './weight-form-field.html',
  styleUrl: './weight-form-field.scss',
})
export class WeightFormField {
  @Input() showHorizontalLine = true;

  private store = inject(StoreService);
  weight = this.store.weight;

  setWeight(value: number) {
    this.weight().value = value;
    this.store.updateWeight(this.weight());
  }
}
