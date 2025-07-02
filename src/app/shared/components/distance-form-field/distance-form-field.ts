import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DataCatalog } from '../../../core/business/catalog/data-catalog';
import { StoreService } from '../../../core/store/store.service';
import { SelectOnFocus } from '../../directives/select-on-focus';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-distance-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    MatIconModule,
    MatMenuModule,
    FormField,
  ],
  templateUrl: './distance-form-field.html',
  styleUrl: './distance-form-field.scss',
})
export class DistanceFormField {
  private store = inject(StoreService);
  distance = this.store.distance;

  distancesKeys = DataCatalog.distancesKeys;
  distances = DataCatalog.distances;

  setDistance(value: number) {
    this.distance().value = value;
    this.store.updateDistance(this.distance());
  }

  setRaceDistance(kmValue: number) {
    this.distance().convertAndSetKmValue(kmValue);
    this.store.updateDistance(this.distance());
  }
}
