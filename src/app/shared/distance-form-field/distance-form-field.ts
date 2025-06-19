import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { StoreService } from '../../core/store/store.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-distance-form-field',
  imports: [
    HorizontalLineWithText,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './distance-form-field.html',
  styleUrl: './distance-form-field.scss',
})
export class DistanceFormField {
  @Input() showHorizontalLine = true;

  private store = inject(StoreService);
  unit = this.store.distanceUnit;
  distance = this.store.distance();

  setDistance(kmValue: number) {
    const currentUnit = this.unit();
    const converted =
      currentUnit === 'mi' ? this.convertKmToMi(kmValue) : kmValue;
    this.distance = Math.round(converted * 1000) / 1000;
    this.updateStore();
  }

  updateStore() {
    this.store.updateDistance(this.distance);
  }

  private convertKmToMi(km: number): number {
    return km * 0.621371;
  }
}
