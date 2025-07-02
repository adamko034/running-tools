import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../form-field/form-field';

@Component({
  selector: 'app-weight-store-form-field',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './weight-store-form-field.html',
  styleUrl: './weight-store-form-field.scss',
})
export class WeightStoreFormField {
  private store = inject(StoreService);
  weight = this.store.weight;

  setWeight(value: number) {
    this.weight().value = value;
    this.store.updateWeight(this.weight());
  }
}
