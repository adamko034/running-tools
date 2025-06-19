import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DistanceUnit } from '../../core/models/distance-unit.enum';
import { StoreService } from '../../core/store/store.service';

@Component({
  selector: 'app-unit-selector',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './unit-selector.html',
  styleUrl: './unit-selector.scss',
})
export class UnitSelector {
  private store = inject(StoreService);
  unit = this.store.distanceUnit;

  onUnitChange(newValue: DistanceUnit) {
    this.store.updateDistanceUnit(newValue);
  }
}
